// 🌀 Hypnotic Spiral
// Just watch it spin!

let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  colorMode(HSB);
  noFill();
  strokeWeight(2);
  
  for (let i = 0; i < 200; i++) {
    let hue = (i * 2 + frameCount) % 360;
    stroke(hue, 80, 100);
    
    let r = i * 2;
    let a = angle + i * 0.1;
    let x = cos(a) * r;
    let y = sin(a) * r;
    
    ellipse(x, y, 10, 10);
  }
  
  angle += 0.02;
}
