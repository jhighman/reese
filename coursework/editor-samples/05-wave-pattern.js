// 🌊 Wave Pattern
// Move mouse up/down to change wave frequency

let offset = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(15, 15, 35);
  
  let frequency = map(mouseY, 0, height, 0.01, 0.05);
  let numWaves = 8;
  
  colorMode(HSB);
  noFill();
  strokeWeight(3);
  
  for (let w = 0; w < numWaves; w++) {
    let hue = map(w, 0, numWaves, 180, 300);
    stroke(hue, 70, 90, 0.8);
    
    beginShape();
    for (let x = 0; x <= width; x += 5) {
      let waveOffset = w * 30;
      let y = height/2 + 
              sin((x * frequency) + offset + (w * 0.5)) * (50 + w * 10) +
              waveOffset - (numWaves * 15);
      vertex(x, y);
    }
    endShape();
  }
  
  offset += 0.05;
}
