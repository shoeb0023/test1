# JavaScript Event Loop, Microtask Queue & Callback Queue

## 1. Concurrency Model & Architecture
JavaScript is single-threaded and has a single Call Stack. To handle non-blocking asynchronous operations (network requests, timers, user interactions), it offloads operations to the runtime host environment (browser Web APIs or Node.js libuv).

```
┌─────────────────────────────────────────────────────────────┐
│                         CALL STACK                          │
│                      (executing code)                       │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Call Stack empties)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      MICROTASK QUEUE                        │
│   (Promise.then, queueMicrotask, process.nextTick)          │
│   * EMPTIED COMPLETELY BEFORE NEXT MACROTASK RUNS *         │
└──────────────────────────────┬──────────────────────────────┘
                               │ (When microtasks empty)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                MACROTASK / CALLBACK QUEUE                   │
│           (setTimeout, setInterval, setImmediate, I/O)      │
│   * ONE TASK PROCESSED PER EVENT LOOP TICK *                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Microtasks vs Macrotasks

| Feature | Microtask | Macrotask (Callback) |
|:---|:---|:---|
| **Sources** | `Promise.then/catch/finally`, `queueMicrotask()`, `MutationObserver` | `setTimeout`, `setInterval`, `setImmediate` (Node), I/O events |
| **Priority** | High (Priority drain) | Standard |
| **Execution Policy** | Runs until empty, including nested microtasks queued during execution | Exactly one macrotask per tick before checking microtasks again |

---

## 3. Microtask Starvation
Because the runtime completely flushes the microtask queue before rendering or picking the next macrotask, an infinite recursive microtask loop will freeze the entire UI/event loop:

```javascript
// DANGER: Will starve the event loop!
function starve() {
  Promise.resolve().then(starve);
}
```
