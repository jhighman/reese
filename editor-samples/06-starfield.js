// ⭐ Starfield
// Move mouse left/right to control warp speed

let stars = [];
const NUM_STARS = 400;

function setup() {
  createCanvas(400, 400);
  
  for (let i = 0; i < NUM_STARS; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0, 0, 0, 150);
  translate(width/2, height/2);
  
  let speed = map(mouseX, 0, width, 0.5, 20);
  
  for (let star of stars) {
    star.update(speed);
    star.display();
  }
}

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.z = random(width);
    this.pz = this.z;
  }

  update(speed) {
    this.z -= speed;
    if (this.z < 1) {
      this.reset();
      this.z = width;
      this.pz = this.z;
    }
  }

  display() {
    let sx = map(this.x / this.z, 0, 1, 0, width/2);
    let sy = map(this.y / this.z, 0, 1, 0, height/2);
    
    let px = map(this.x / this.pz, 0, 1, 0, width/2);
    let py = map(this.y / this.pz, 0, 1, 0, height/2);
    
    this.pz = this.z;
    
    let brightness = map(this.z, 0, width, 255, 50);
    stroke(brightness);
    strokeWeight(map(this.z, 0, width, 3, 0.5));
    line(px, py, sx, sy);
  }
}
