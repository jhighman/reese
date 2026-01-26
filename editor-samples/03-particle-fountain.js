// ✨ Particle Fountain
// Move mouse to control where particles spray from

let particles = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(10, 10, 20, 40);
  
  // Spawn new particles at mouse position
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(mouseX, height - 20));
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-12, -6);
    this.alpha = 255;
    this.size = random(4, 10);
    this.hue = random(180, 280);
  }

  update() {
    this.x += this.vx;
    this.vy += 0.2; // Gravity
    this.y += this.vy;
    this.alpha -= 3;
  }

  display() {
    colorMode(HSB);
    noStroke();
    fill(this.hue, 80, 100, this.alpha / 255);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
