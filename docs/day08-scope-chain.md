# Scope Chain vs Lexical Scoping in JavaScript

## 1. Lexical Scoping (Static Scoping)
**Lexical scope** means that the accessibility of variables is determined strictly by the physical location of variables and blocks of code within the source code during write-time (compilation), **not** by where or how functions are called at runtime.

```javascript
const globalVar = 'Global';

function outer() {
  const outerVar = 'Outer';

  function inner() {
    // Lexically enclosed inside outer and global
    console.log(outerVar);  // Resolves to 'Outer'
    console.log(globalVar); // Resolves to 'Global'
  }

  return inner;
}

const myFn = outer();
myFn(); // Still resolves outerVar even though executed in global scope!
```

---

## 2. The Scope Chain
When JavaScript needs to resolve an identifier (variable lookup), it searches the current Lexical Environment Record. If not found, it traverses upward along the **outer reference** link to parent lexical environments until it reaches the Global Environment. If not found in the Global scope, it throws a `ReferenceError`.

```
  [ inner() Lexical Environment ]
       │  outer reference
       ▼
  [ outer() Lexical Environment ]
       │  outer reference
       ▼
  [ Global Lexical Environment ]
       │
       ▼
  (null / End of Chain -> ReferenceError)
```

---

## 3. Variable Shadowing
When an inner scope defines a variable with the same identifier as an outer scope, the inner variable **shadows** the outer one:

```javascript
let x = 10;

function demo() {
  let x = 20; // Shadows global x
  if (true) {
    let x = 30; // Shadows function-scoped x
    console.log(x); // 30
  }
  console.log(x); // 20
}

demo();
console.log(x); // 10
```

---

## 4. Key Takeaways
- **Lexical Scope**: WHERE function is written.
- **Scope Chain**: The PATH taken to look up variables from inner to outer.
- Functions capture their surrounding lexical environment at declaration time.
