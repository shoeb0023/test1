# V8 Garbage Collection & JavaScript Memory Leaks

## 1. V8 Memory Architecture
V8 allocates memory into two main generation spaces:
1. **Young Generation (New Space)**:
   - Objects are initially allocated here.
   - Extremely fast allocation and garbage collection using the **Scavenge algorithm (Cheney's copying algorithm)**.
   - Split into two semi-spaces: `From-space` and `To-space`.
   - Objects surviving two scavenges are promoted to the Old Space.
2. **Old Generation (Old Space)**:
   - Holds long-lived objects.
   - Collected using the **Mark-Sweep-Compact** algorithm.

---

## 2. Mark-and-Sweep Algorithm
1. **Marking**: Starts from root nodes (Global object, active Call Stack local variables, DOM roots) and recursively traverses all references, marking reachable objects as active.
2. **Sweeping**: Scans the heap and reclaims memory from unmarked (unreachable) objects.
3. **Compacting**: Shifts surviving objects together to eliminate heap memory fragmentation.

---

## 3. Common Memory Leaks in JavaScript

### Leak 1: Accidental Global Variables
```javascript
function leak() {
  leakedData = new Array(1000000); // Missing var/let/const attaches to window/global
}
```

### Leak 2: Forgotten Timers / Callbacks
```javascript
const heavyObject = { data: 'heavy' };
setInterval(() => {
  // Retains heavyObject in closure scope indefinitely
  console.log(heavyObject.data);
}, 1000);
```

### Leak 3: Detached DOM Trees
Holding references to removed DOM elements in JavaScript memory prevents GC from clearing the DOM node and all its children.

### Leak 4: Closures Retaining Unused Scope Variables
```javascript
let unusedClosure = function() {
  const hugeData = new Array(1000000);
  return function() {
    // Even if unused, outer lexical environment may hold hugeData
  };
};
```
