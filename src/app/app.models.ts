export class Vehicle {
  plate: string; 
  vehicleType: string = "";
  bed: any;

  constructor(plate) {
    this.plate = plate;
  }

  get isStolen() {
    return this.plate == "1111111"; 
  }

  get isTruck() {
    return this.vehicleType === "truck";
  }

  get isBedDirty() {
    return false;
  }

  get isBedDown() {
    return false;
  }

}

export class VehicleLog {
  vehicle: any;
  washed: boolean;
  total: number;
}

export class Car extends Vehicle {

  constructor(plate) {
    super(plate)
    this.vehicleType = "car";
  }
  
}

export class Truck extends Vehicle {

  bed;
  
  constructor(plate, bed: BedInfo) {
    super(plate)
    this.vehicleType = "truck";
    this.bed = bed;
  }

  get isBedDown() {
    return this.bed.down
  }

  get isBedDirty() {
    return this.bed.dirty;
  }

}

interface BedInfo {
    dirty: boolean,
    down: boolean,
}