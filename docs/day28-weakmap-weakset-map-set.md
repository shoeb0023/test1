# WeakMap, WeakSet, Map, and Set in JavaScript

## 1. Structural Comparison Matrix

| Characteristic | `Map` | `WeakMap` | `Set` | `WeakSet` |
|:---|:---|:---|:---|:---|
| **Key/Value Types** | Any primitive or object | **Keys must be objects** (or registered symbols) | Any primitive or object | **Values must be objects** |
| **Garbage Collection** | Prevents GC of keys/values | **Weak references to keys** (does not prevent GC) | Prevents GC of values | **Weak references to values** |
| **Iterable?** | Yes (`.keys()`, `.values()`, `for..of`) | **NO** (non-enumerable) | Yes | **NO** |
| **`.size` property?** | Yes | **NO** | Yes | **NO** |
| **`.clear()` method?** | Yes | **NO** | Yes | **NO** |

---

## 2. Why Weak Collections Cannot Be Iterated
Because keys in `WeakMap` and values in `WeakSet` are weakly held, they can be collected by the JavaScript engine's garbage collector non-deterministically at any moment. Exposing iteration or size would create non-deterministic race conditions based on when the engine's GC executes.

---

## 3. Practical Real-World Use Cases

### WeakMap: Storing DOM Element Metadata
```javascript
const clickCounts = new WeakMap();

function trackButtonClick(button) {
  const count = clickCounts.get(button) || 0;
  clickCounts.set(button, count + 1);
}
// When 'button' is removed from the DOM and has no references,
// its entry in clickCounts is automatically garbage-collected!
```

### WeakSet: Tagging / Circular Reference Checking
```javascript
const visitedObjects = new WeakSet();

function markVisited(obj) {
  if (visitedObjects.has(obj)) {
    throw new Error('Circular structure detected');
  }
  visitedObjects.add(obj);
}
```
