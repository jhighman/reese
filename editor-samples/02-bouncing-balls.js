// 🏀 Bouncing Balls
// Click anywhere to add more balls

let balls = [];

function setup() {
  createCanvas(400, 400);
  // Start with 5 balls
  for (let i = 0; i < 5; i++) {
    balls.push(new Ball(random(width), random(height)));
  }
}

function draw() {
  background(15, 15, 35, 50);
  
  for (let ball of balls) {
    ball.update();
    ball.display();
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.hue = random(360);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < this.size/2 || this.x > width - this.size/2) {
      this.xSpeed *= -1;
      this.hue = (this.hue + 30) % 360;
    }
    if (this.y < this.size/2 || this.y > height - this.size/2) {
      this.ySpeed *= -1;
      this.hue = (this.hue + 30) % 360;
    }
  }

  display() {
    colorMode(HSB);
    noStroke();
    fill(this.hue, 70, 100);
    ellipse(this.x, this.y, this.size);
    
    // Glow effect
    fill(this.hue, 70, 100, 0.3);
    ellipse(this.x, this.y, this.size * 1.5);
  }
}
