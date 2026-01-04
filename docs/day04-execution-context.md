# JavaScript Execution Context and Call Stack

## 1. What is an Execution Context (EC)?
Every time JavaScript code runs, it does so within an **Execution Context**. An Execution Context is the conceptual environment in which JavaScript evaluates and executes code.

There are three primary types of Execution Contexts:
1. **Global Execution Context (GEC)**: Created by default upon script initialization. In browsers, it attaches to `window`; in Node.js, to `global`. Only one GEC exists.
2. **Function Execution Context (FEC)**: Created whenever a function is *invoked* (not when declared).
3. **Eval Execution Context**: Created when code is executed inside `eval()`.

---

## 2. The Two Phases of Execution Context Creation

```
┌─────────────────────────────────────────────────────────────┐
│                   EXECUTION CONTEXT CREATION                │
├──────────────────────────────┬──────────────────────────────┤
│ 1. MEMORY CREATION PHASE     │ 2. CODE EXECUTION PHASE      │
│  - Hoists variable declarations│  - Executes code line by line│
│    (var initialized as undef) │  - Evaluates values & assigns│
│  - Stores function bodies in │  - Invokes functions         │
│    full                      │  - Handles context switches  │
│  - Sets up scope chain       │                              │
└──────────────────────────────┴──────────────────────────────┘
```

### Phase 1: Memory Creation Phase (Creation Phase)
- The JS engine scans the code before executing a single line.
- Allocates memory for variables and functions.
- `var` variables are allocated and initialized to `undefined`.
- `let` and `const` variables are allocated in uninitialized state (Temporal Dead Zone - TDZ).
- Function declarations are placed in memory with their complete definition.

### Phase 2: Code Execution Phase
- Code is executed synchronously line-by-line.
- Variable assignments are evaluated.
- Function calls create new Function Execution Contexts pushed onto the Call Stack.

---

## 3. Call Stack Flow (LIFO - Last In, First Out)

```
  Function calls:
  a() -> calls b() -> calls c()

  Call Stack:
  ┌──────────────┐
  │   c() FEC    │  <-- Top of stack (executing)
  ├──────────────┤
  │   b() FEC    │
  ├──────────────┤
  │   a() FEC    │
  ├──────────────┤
  │     GEC      │  <-- Base of stack (Global)
  └──────────────┘
```

When `c()` finishes, its context is popped off the stack, control returns to `b()`, then `a()`, and finally back to `GEC`.

---

## 4. Stack Overflow
When recursion lacks an exit condition, contexts are pushed onto the Call Stack indefinitely until memory is exhausted:
```javascript
function infinite() {
  infinite(); // RangeError: Maximum call stack size exceeded
}
```
