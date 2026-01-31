# 31-Day JavaScript Mastery Series & Interview Handbook

A comprehensive, production-grade 31-day JavaScript deep-dive covering language internals, custom polyfills, asynchronous architecture, design patterns, and algorithmic problem-solving.

---

## January 2026 Commit Calendar & Curriculum

| Day | Date | Type | Commit Message & Description |
|:---|:---|:---|:---|
| **Day 1** | Jan 1, 2026 | `feat` | `feat: implement custom polyfill for Array.prototype.map` — Robust sparse array, index callback, and `thisArg` handling. |
| **Day 2** | Jan 2, 2026 | `feat` | `feat: implement custom polyfill for Array.prototype.filter` — Filtering with predicate validation and sparse slot preservation. |
| **Day 3** | Jan 3, 2026 | `feat` | `feat: implement custom polyfill for Array.prototype.reduce` — Empty array handling, accumulator initialization, sparse index support. |
| **Day 4** | Jan 4, 2026 | `docs` | `docs: add explanations and visual flow for JavaScript Execution Context and Call Stack` — Memory creation, execution phase, and call stack diagrams. |
| **Day 5** | Jan 5, 2026 | `feat` | `feat: write implementation examples demonstrating Hoisting (var vs let/const)` — Temporal Dead Zone (TDZ) and function declaration rules. |
| **Day 6** | Jan 6, 2026 | `feat` | `feat: implement Closures with practical data privacy use cases (module pattern)` — Bank ledger module with encapsulated state. |
| **Day 7** | Jan 7, 2026 | `refactor` | `refactor: optimize closure-based memoization utility function` — LRU cache eviction, variadic serializers, and performance stats. |
| **Day 8** | Jan 8, 2026 | `docs` | `docs: contrast Scope Chain and Lexical Scoping with code snippets` — Static scoping rules, outer lexical links, and variable shadowing. |
| **Day 9** | Jan 9, 2026 | `feat` | `feat: implement custom debounce function with leading and trailing options` — Includes `.cancel()`, `.flush()`, and `.pending()` APIs. |
| **Day 10** | Jan 10, 2026 | `feat` | `feat: implement custom throttle function using timestamp and setTimeout approaches` — Dual leading/trailing execution guarantees. |
| **Day 11** | Jan 11, 2026 | `docs` | `docs: document how the Event Loop, Microtask Queue, and Callback Queue work` — Event loop phases, macrotask vs microtask starvation. |
| **Day 12** | Jan 12, 2026 | `feat` | `feat: code examples tracing asynchronous execution order (Promise vs setTimeout)` — Step-by-step tracing puzzles and verification. |
| **Day 13** | Jan 13, 2026 | `feat` | `feat: implement custom polyfill for Promise (resolving, rejecting, chaining)` — Promises/A+ core with asynchronous microtask resolution. |
| **Day 14** | Jan 14, 2026 | `feat` | `feat: implement Promise.all, Promise.race, and Promise.allSettled from scratch` — Combinators with short-circuiting and settlement tracking. |
| **Day 15** | Jan 15, 2026 | `docs` | `docs: add deep-dive notes on async/await vs Generators` — Generator coroutines, bi-directional yielding, and custom async runners. |
| **Day 16** | Jan 16, 2026 | `feat` | `feat: implement custom deep clone (deepCopy) utility handling circular references` — WeakMap cycle tracking for Maps, Sets, Dates, and Regexes. |
| **Day 17** | Jan 17, 2026 | `feat` | `feat: implement object flattening function for deeply nested JSON objects` — Dot and bracket notation flattening with inverse unflattening. |
| **Day 18** | Jan 18, 2026 | `docs` | `docs: explain Prototypal Inheritance and the Prototype Chain with code examples` — `__proto__`, `prototype`, and `Object.create()` delegation. |
| **Day 19** | Jan 19, 2026 | `feat` | `feat: implement custom polyfill for the JavaScript 'call', 'apply', and 'bind' methods` — Symbol property binding and `new` constructor compatibility. |
| **Day 20** | Jan 20, 2026 | `feat` | `feat: implement classical vs prototypal inheritance structures using ES6 classes` — ES5 prototype chaining side-by-side with ES6 class `extends`. |
| **Day 21** | Jan 21, 2026 | `docs` | `docs: document 'this' keyword behavior across global, object, arrow functions, and event listeners` — Default, implicit, explicit, and lexical `this`. |
| **Day 22** | Jan 22, 2026 | `feat` | `feat: implement a pub/sub (Event Emitter) design pattern in JavaScript` — `on`, `once`, `off`, `emit`, and unsubscribe handles. |
| **Day 23** | Jan 23, 2026 | `feat` | `feat: build a currying utility function with placeholder support` — Dynamic arity, currying, and `curry._` placeholder resolution. |
| **Day 24** | Jan 24, 2026 | `feat` | `feat: implement function composition and piping helper utilities` — Right-to-left `compose`, left-to-right `pipe`, and async pipeline. |
| **Day 25** | Jan 25, 2026 | `docs` | `docs: break down Garbage Collection mechanisms (Mark-and-Sweep, memory leaks)` — V8 Young vs Old space, Cheney scavenge, and leak patterns. |
| **Day 26** | Jan 26, 2026 | `feat` | `feat: implement a simple Proxy and Reflect API data-binding mechanism` — Reactive store, dependency tracking, and automatic effect dispatch. |
| **Day 27** | Jan 27, 2026 | `feat` | `feat: implement custom lazy loading utility for heavy operations` — Thunk evaluation and lazy accessor self-overwriting properties. |
| **Day 28** | Jan 28, 2026 | `docs` | `docs: outline structural differences between WeakMap, WeakSet, Map, and Set` — Garbage collection implications and non-enumerable mechanics. |
| **Day 29** | Jan 29, 2026 | `feat` | `feat: solve common JS array/string algorithmic puzzle questions (e.g., sliding window)` — Longest Substring, Two Sum, Kadane's Max Subarray. |
| **Day 30** | Jan 30, 2026 | `refactor` | `refactor: clean up utility folder structure and organize modules` — Centralized `src/`, modular package domains, and test runner. |
| **Day 31** | Jan 31, 2026 | `docs` | `docs: add comprehensive README with architectural notes and interview cheat sheet` — Master handbook and top 30 interview Q&As. |

---

## Directory Architecture

```
test1/
├── docs/                                # Technical Architectural Deep-Dives
│   ├── day04-execution-context.md       # Execution contexts & call stack flow
│   ├── day08-scope-chain.md             # Lexical scope & scope chains
│   ├── day11-event-loop.md              # Event loop, microtask & macrotask queues
│   ├── day15-async-generators.md        # Async/await vs Generator coroutines
│   ├── day18-prototypal-inheritance.md  # Prototype delegation & __proto__
│   ├── day21-this-keyword.md            # The 4 rules of 'this' binding
│   ├── day25-garbage-collection.md      # V8 Garbage collection & memory leaks
│   └── day28-weakmap-weakset-map-set.md # WeakMap, WeakSet, Map, and Set comparison
├── src/                                 # Production Modules
│   ├── index.js                         # Master Barrel Export
│   ├── polyfills/                       # Standard Built-in Polyfills
│   │   ├── map.js                       # Array.prototype.map
│   │   ├── filter.js                    # Array.prototype.filter
│   │   ├── reduce.js                    # Array.prototype.reduce
│   │   ├── call-apply-bind.js           # Function.prototype call/apply/bind
│   │   └── promise.js                   # Promises/A+ Custom Promise
│   ├── async/                           # Asynchronous Patterns & Helpers
│   │   ├── debounce.js                  # Debounce with leading/trailing
│   │   ├── throttle.js                  # Throttle with timestamp/timer
│   │   ├── execution-order.js           # Async execution tracing puzzles
│   │   └── promise-combinators.js       # Promise.all, race, allSettled
│   ├── patterns/                        # Design & Architectural Patterns
│   │   ├── closure-privacy.js           # Revealing Module Pattern
│   │   ├── inheritance.js               # ES5 vs ES6 Inheritance
│   │   ├── event-emitter.js             # Pub/Sub Event Emitter
│   │   └── reactive.js                  # Proxy & Reflect Reactive Store
│   ├── utils/                           # General Utilities
│   │   ├── hoisting.js                  # Hoisting demonstrations
│   │   ├── memoize.js                   # Memoize with LRU Cache
│   │   ├── deep-clone.js                # Deep clone with circular ref support
│   │   ├── flatten.js                   # Object flatten & unflatten
│   │   ├── curry.js                     # Currying with placeholders
│   │   ├── compose-pipe.js              # Function composition & piping
│   │   └── lazy.js                      # Lazy property & thunk evaluation
│   └── puzzles/                         # Algorithmic Problem Solving
│       └── algorithms.js                # Sliding window, Two Sum, Kadane's
├── scripts/
│   ├── test_runner.js                   # Automated test suite
│   └── generate_and_commit.js           # Git backdating generation script
└── commit_january_2026.ps1              # Windows PowerShell commit script
```

---

## Running Tests & Verifying Solutions

To run the entire suite of unit tests verifying all polyfills, utilities, and puzzles:

```bash
node scripts/test_runner.js
```

---

## High-Yield JavaScript Interview Cheat Sheet

### 1. What is the difference between `==` and `===`?
- `==` (Abstract Equality) performs type coercion via the `ToPrimitive` algorithm before comparing.
- `===` (Strict Equality) checks both value and type without coercion.

### 2. What is the Temporal Dead Zone (TDZ)?
The period between entering the scope where a `let` or `const` variable is declared and the actual line where it is initialized. Accessing the variable in the TDZ throws a `ReferenceError`.

### 3. How does JavaScript handle asynchronous code?
JavaScript uses an **Event Loop**. Synchronous code runs on the Call Stack. Asynchronous callbacks are registered with the runtime host and placed in either the **Microtask Queue** (`Promise`, `queueMicrotask`) or the **Macrotask Queue** (`setTimeout`, I/O). Microtasks are completely drained before the next macrotask executes.

### 4. What is a Closure and what are its primary use cases?
A closure is a function bundled together with references to its surrounding lexical state. Even after the outer function finishes executing, the inner function retains access to outer variables. Key use cases: **Data Privacy / Encapsulation**, **Currying**, **Memoization**, and **Event Listeners**.

### 5. What are the four rules of `this` binding?
1. **Default Binding**: Global object (`window` / `global`) or `undefined` in strict mode.
2. **Implicit Binding**: The object preceding the dot at call site (`user.getName()`).
3. **Explicit Binding**: Manually set using `.call()`, `.apply()`, or `.bind()`.
4. **`new` Binding**: Binds to the newly created instance inside a constructor function.
*(Note: Arrow functions do not follow these rules; they inherit `this` lexically from their enclosing scope).*

### 6. What is the difference between `call`, `apply`, and `bind`?
- `call(thisArg, arg1, arg2, ...)`: Invokes immediately with comma-separated arguments.
- `apply(thisArg, [args])`: Invokes immediately with an array of arguments.
- `bind(thisArg, ...args)`: Returns a new function with `this` and initial arguments bound permanently.

### 7. How does Prototypal Inheritance work?
Every JavaScript object has an internal `[[Prototype]]` link. When a property or method is accessed on an object, JavaScript searches the object itself first. If missing, it traverses up the prototype chain until it either finds the property or reaches `null` at the top of `Object.prototype`.

### 8. Explain the difference between Debounce and Throttle.
- **Debounce**: Delays execution until a specified delay has elapsed since the *last* time the function was invoked. (Ideal for search input autocomplete).
- **Throttle**: Ensures the function is called at most once within every specified time interval. (Ideal for scroll or resize handlers).

### 9. What is a WeakMap and why would you use it over a Map?
`WeakMap` holds **weak references** to its keys, which must be objects. If an object key has no other references in memory, it can be garbage-collected even if it exists in the `WeakMap`. It is ideal for storing private metadata on DOM nodes or external objects without causing memory leaks.
