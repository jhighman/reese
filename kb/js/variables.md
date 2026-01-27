# Variables

Storing values so you can use them later.

## What's a Variable?

A variable is a name that holds a value. Like a labeled box.

```javascript
let score = 0;        // a number
let name = "Reese";   // text (a "string")
let isPlaying = true; // true or false (a "boolean")
```

## Declaring Variables

Three ways to create variables:

```javascript
let x = 10;      // can be changed later
const y = 20;    // cannot be changed (constant)
var z = 30;      // old way, avoid this
```

**Use `let`** for things that change.  
**Use `const`** for things that shouldn't.

## Naming Rules

- Start with a letter, `_`, or `$`
- Can contain letters, numbers, `_`, `$`
- Case sensitive (`score` ≠ `Score`)
- No spaces

### Good Names
```javascript
let circleX = 100;
let playerSpeed = 5;
let isGameOver = false;
```

### Bad Names
```javascript
let x1 = 100;      // what is x1?
let thing = 5;     // too vague
let a = false;     // meaningless
```

## Types of Values

| Type | Example | What it's for |
|------|---------|---------------|
| Number | `42`, `3.14` | Math, positions, sizes |
| String | `"hello"`, `'world'` | Text |
| Boolean | `true`, `false` | Yes/no decisions |
| Array | `[1, 2, 3]` | Lists |
| Object | `{x: 10, y: 20}` | Grouped data |

## Changing Variables

```javascript
let score = 0;
score = 10;        // now it's 10
score = score + 1; // now it's 11
score += 5;        // shorthand: now it's 16
```

## In p5.js

```javascript
let x, y;  // declare at the top

function setup() {
  x = width / 2;   // set in setup
  y = height / 2;
}

function draw() {
  x += 1;          // change in draw
  circle(x, y, 50);
}
```

---

*Next: [functions.md](functions.md)*
