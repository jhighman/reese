// 🎨 Interactive Drawing
// Click and drag to draw with rainbow colors
// Press any key to clear the canvas

function setup() {
  createCanvas(400, 400);
  background(30, 30, 50);
}

function draw() {
  if (mouseIsPressed) {
    // Rainbow colors based on position
    let hue = map(mouseX + mouseY, 0, width + height, 0, 360);
    colorMode(HSB);
    stroke(hue, 80, 100);
    strokeWeight(map(abs(mouseX - pmouseX) + abs(mouseY - pmouseY), 0, 50, 2, 20));
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function keyPressed() {
  background(30, 30, 50);
}
