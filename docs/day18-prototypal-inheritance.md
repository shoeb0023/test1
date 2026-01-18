# Prototypal Inheritance and the Prototype Chain

## 1. Prototype Delegation in JavaScript
Unlike class-based languages (like Java or C++) that instantiate distinct instances from blueprints, JavaScript objects are linked directly to other objects through an internal link (`[[Prototype]]`). When accessing a property on an object, JavaScript checks if the property exists on the object itself. If not, it searches the object's prototype, traversing up the **prototype chain**.

```
  myArray -> Array.prototype -> Object.prototype -> null
```

---

## 2. `__proto__` vs `prototype`
- `prototype`: A property present on constructor functions (e.g., `Person.prototype`) used to establish the `[[Prototype]]` of instances created with `new Person()`.
- `__proto__`: The legacy accessor (or `Object.getPrototypeOf(obj)`) exposing an object's internal `[[Prototype]]`.

---

## 3. Pure Prototypal Inheritance with `Object.create()`

```javascript
const animal = {
  makeSound() {
    return this.sound || 'Silence';
  },
  eat() {
    return 'Eating...';
  }
};

// Create dog delegating directly to animal
const dog = Object.create(animal);
dog.sound = 'Woof!';

console.log(dog.makeSound()); // 'Woof!' (found on dog)
console.log(dog.eat());       // 'Eating...' (delegated to animal)
console.log(dog.hasOwnProperty('sound')); // true
console.log(dog.hasOwnProperty('eat'));   // false
```

---

## 4. Property Shadowing
If an object defines a property with the same name as a property further up its prototype chain, the object's own property "shadows" (hides) the prototype property.
