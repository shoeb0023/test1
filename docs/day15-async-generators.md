# Deep Dive: async/await vs Generator Functions

## 1. Generators as Coroutines
A **generator function** (`function*`) produces a `Generator` object that conforms to both the **Iterable** and **Iterator** protocols. It can pause execution via `yield` and resume via `.next()`, passing data bi-directionally.

```javascript
function* counter() {
  const step = yield 1; // pause and return 1; resumes with step argument
  yield 1 + (step || 1);
}

const gen = counter();
console.log(gen.next());       // { value: 1, done: false }
console.log(gen.next(10));     // { value: 11, done: false }
```

---

## 2. Async/Await is Syntactic Sugar for Generator + Promise Runner
Under the hood, `async/await` is equivalent to a generator driven by a promise runner (like the famous `co` library):

```javascript
// Custom async runner simulating async/await using generators
function asyncRunner(generatorFn) {
  return function(...args) {
    const gen = generatorFn.apply(this, args);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let result;
        try {
          result = gen[key](arg);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = result;
        if (done) {
          return resolve(value);
        }

        return Promise.resolve(value).then(
          (val) => step('next', val),
          (err) => step('throw', err)
        );
      }

      step('next');
    });
  };
}
```

---

## 3. Comparison Summary

| Feature | `async / await` | `function* / yield` |
|:---|:---|:---|
| **Return Type** | Always returns a `Promise` | Returns a `Generator` Iterator |
| **Control Flow** | Asynchronous resolution only | Synchronous or asynchronous pause/resume |
| **Re-entrancy** | Resumed automatically by Microtask queue | Resumed manually via `.next()` |
| **State Streaming** | Single final resolution value | Stream of values over time (lazy pull) |
