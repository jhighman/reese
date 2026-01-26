// 🐍 Mouse Follow Trail
// Move the mouse around to create a trailing effect

let trail = [];
const TRAIL_LENGTH = 50;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20, 20, 40);
  
  // Add current mouse position to trail
  trail.push({x: mouseX, y: mouseY});
  
  // Keep trail at fixed length
  if (trail.length > TRAIL_LENGTH) {
    trail.shift();
  }
  
  // Draw the trail
  colorMode(HSB);
  noStroke();
  
  for (let i = 0; i < trail.length; i++) {
    let size = map(i, 0, trail.length, 5, 40);
    let hue = map(i, 0, trail.length, 200, 320);
    let alpha = map(i, 0, trail.length, 0.3, 1);
    
    fill(hue, 80, 100, alpha);
    ellipse(trail[i].x, trail[i].y, size, size);
  }
}
