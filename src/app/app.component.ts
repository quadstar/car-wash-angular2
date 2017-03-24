import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {Vehicle, Car, Truck, VehicleLog} from './app.models';
import {logs} from './wash-service-log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Ian\'s Car Wash';
  vehicle;
  total: number;
  message: string;
  vehicleLogs: Array<VehicleLog> = [];
  done: boolean = false;
  washed: boolean;

  constructor() {
    this.init();
  }

  init() {
    this.done = false;
    this.getVehicleLogs();
    this.vehicle = new Vehicle("");
    this.total = 0;
  }

  getVehicleLogs(): void {
    // mock api call
    this.vehicleLogs = logs;
  }

  changeVehicleType(): void {
    this.vehicle = this.vehicle.vehicleType === "car" ? 
      new Car(this.vehicle.plate) :
      new Truck(this.vehicle.plate, {down: false, dirty: false});

      this.calcTotal();
  }

  calcTotal(): void {
    this.total = this.vehicle.isTruck ? 10 : 5;
    if(this.vehicle.isBedDirty) this.total += 2;

    //check if reoccuring customer.
    if(this.isReturnCustomer(this.vehicle)) this.total = this.total / 2;

  }

  checkout() {
    this.message = "";
    if(this.vehicle.plate === "") return this.message += "Please enter license plate #"; 
    if(this.vehicle.vehicleType === "") return this.message += "Please select a vehicle type";

    this.calcTotal();

    var log = new VehicleLog();
    log.vehicle = this.vehicle;
    log.total = this.total;
    this.washed = log.washed = this.validateWash();

    this.vehicleLogs.push(log);

    this.done = true;
  }

  validateWash(): boolean {
    if(this.vehicle.plate === "1111111" || this.vehicle.isBedDown) return false;
    return true;
  }

  isReturnCustomer(vehicle: Vehicle): boolean {
    for (var i = 0; i < this.vehicleLogs.length; i++) {
      if(this.vehicleLogs[i].vehicle.plate === vehicle.plate) return true;
    }
    return false;
  }

}


