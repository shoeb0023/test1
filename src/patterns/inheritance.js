/**
 * Classical vs Prototypal Inheritance with ES5 and ES6 Classes
 */

// 1. ES5 Pseudo-Classical Pattern
function VehicleES5(make, model) {
  this.make = make;
  this.model = model;
}

VehicleES5.prototype.getDetails = function() {
  return this.make + ' ' + this.model;
};

function CarES5(make, model, doors) {
  VehicleES5.call(this, make, model);
  this.doors = doors;
}

CarES5.prototype = Object.create(VehicleES5.prototype);
CarES5.prototype.constructor = CarES5;

CarES5.prototype.getDetails = function() {
  return VehicleES5.prototype.getDetails.call(this) + ' with ' + this.doors + ' doors';
};

// 2. ES6 Modern Class Pattern
class VehicleES6 {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  getDetails() {
    return `${this.make} ${this.model}`;
  }
}

class CarES6 extends VehicleES6 {
  #vin; // Private field

  constructor(make, model, doors, vin) {
    super(make, model);
    this.doors = doors;
    this.#vin = vin;
  }

  getDetails() {
    return `${super.getDetails()} with ${this.doors} doors`;
  }

  getVin() {
    return this.#vin;
  }
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing ES5 vs ES6 Inheritance ---');

  const es5Car = new CarES5('Toyota', 'Corolla', 4);
  console.assert(es5Car.getDetails() === 'Toyota Corolla with 4 doors', 'ES5 inheritance failed');
  console.assert(es5Car instanceof VehicleES5, 'ES5 instanceof failed');

  const es6Car = new CarES6('Tesla', 'Model 3', 4, 'VIN12345');
  console.assert(es6Car.getDetails() === 'Tesla Model 3 with 4 doors', 'ES6 inheritance failed');
  console.assert(es6Car instanceof VehicleES6, 'ES6 instanceof failed');
  console.assert(es6Car.getVin() === 'VIN12345', 'ES6 private field failed');

  console.log('✓ All Inheritance structure tests passed!');
}

module.exports = { VehicleES5, CarES5, VehicleES6, CarES6 };
