# Functions

Reusable blocks of code.

## What's a Function?

A function is a named block of code that does something. You define it once, then call it whenever you need it.

```javascript
// Define it
function sayHello() {
  console.log("Hello!");
}

// Call it
sayHello();  // prints "Hello!"
sayHello();  // prints "Hello!" again
```

## Why Functions?

1. **Reuse** — write once, use many times
2. **Organize** — break big problems into small pieces
3. **Name things** — `drawTree()` is clearer than 50 lines of tree code

## Parameters

Functions can take inputs:

```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Reese");  // "Hello, Reese!"
greet("Dad");    // "Hello, Dad!"
```

Multiple parameters:

```javascript
function add(a, b) {
  console.log(a + b);
}

add(5, 3);  // 8
```

## Return Values

Functions can give back a result:

```javascript
function add(a, b) {
  return a + b;
}

let sum = add(5, 3);  // sum is 8
```

Without `return`, functions return `undefined`.

## In p5.js

p5.js has built-in functions you already use:

```javascript
function setup() {
  // runs once at start
}

function draw() {
  // runs every frame
}

function mousePressed() {
  // runs when mouse clicks
}
```

## Writing Your Own

```javascript
function drawStar(x, y, size) {
  // draw a star at (x, y) with given size
  push();
  translate(x, y);
  // ... star drawing code ...
  pop();
}

function draw() {
  background(0);
  drawStar(100, 100, 50);
  drawStar(300, 200, 30);
  drawStar(200, 300, 70);
}
```

## Good Function Design

- **Do one thing** — `drawStar()` draws a star, that's it
- **Clear name** — name describes what it does
- **Reasonable size** — if it's huge, break it up

---

*Next: [conditionals.md](conditionals.md)*
