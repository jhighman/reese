// 🌀 Generative Circles
// Click anywhere to generate a new pattern

function setup() {
  createCanvas(400, 400);
  generateArt();
}

function draw() {
  // Static artwork - no animation needed
}

function mousePressed() {
  generateArt();
}

function generateArt() {
  colorMode(HSB);
  background(random(200, 260), 30, 15);
  
  let baseHue = random(360);
  
  // Draw layered circles
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let maxSize = random(50, 200);
    
    // Concentric circles
    for (let size = maxSize; size > 10; size -= 15) {
      let hue = (baseHue + map(size, 10, maxSize, 0, 60)) % 360;
      stroke(hue, 60, 90, 0.5);
      strokeWeight(2);
      noFill();
      ellipse(x, y, size);
    }
  }
  
  // Add some accent dots
  for (let i = 0; i < 100; i++) {
    fill((baseHue + 180) % 360, 80, 100);
    noStroke();
    ellipse(random(width), random(height), random(2, 8));
  }
}
