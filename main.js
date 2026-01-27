// ========================================
// Reese Highman Portfolio - Main JS
// ========================================

// Generative Background (subtle Montana-themed particles)
let bgSketch = function(p) {
  let particles = [];
  const NUM_PARTICLES = 50;
  
  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('bg-canvas');
    
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(2, 6),
        speedX: p.random(-0.3, 0.3),
        speedY: p.random(-0.3, 0.3),
        hue: p.random([345, 350, 355, 0])
      });
    }
  };
  
  p.draw = function() {
    p.clear();
    p.colorMode(p.HSB);
    p.noStroke();
    
    for (let particle of particles) {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x < 0) particle.x = p.width;
      if (particle.x > p.width) particle.x = 0;
      if (particle.y < 0) particle.y = p.height;
      if (particle.y > p.height) particle.y = 0;
      
      p.fill(particle.hue, 60, 80, 0.3);
      p.ellipse(particle.x, particle.y, particle.size * 3);
      p.fill(particle.hue, 70, 100, 0.8);
      p.ellipse(particle.x, particle.y, particle.size);
    }
    
    p.stroke(350, 40, 50, 0.1);
    p.strokeWeight(1);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        if (d < 150) {
          p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        }
      }
    }
  };
  
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(bgSketch);

// ========================================
// Firefly Field - ties to "Firefly Dance" artwork
// Bioluminescent particles that pulse and gather toward cursor
// ========================================
let fireflySketch = function(p) {
  let fireflies = [];
  const NUM_FIREFLIES = 40;
  
  p.setup = function() {
    let container = document.getElementById('code-preview-1');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-1');
    
    for (let i = 0; i < NUM_FIREFLIES; i++) {
      fireflies.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.5, 0.5),
        vy: p.random(-0.5, 0.5),
        phase: p.random(p.TWO_PI),
        pulseSpeed: p.random(0.02, 0.05),
        size: p.random(4, 8)
      });
    }
  };
  
  p.draw = function() {
    // Warm summer evening gradient
    p.colorMode(p.RGB);
    for (let y = 0; y < p.height; y++) {
      let inter = p.map(y, 0, p.height, 0, 1);
      let c = p.lerpColor(p.color(45, 25, 50), p.color(20, 15, 35), inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }
    
    p.colorMode(p.HSB);
    p.noStroke();
    
    // Get mouse position relative to canvas
    let mx = p.mouseX;
    let my = p.mouseY;
    let mouseInCanvas = mx > 0 && mx < p.width && my > 0 && my < p.height;
    
    for (let ff of fireflies) {
      // Update phase for pulsing
      ff.phase += ff.pulseSpeed;
      
      // Gentle drift
      ff.vx += p.random(-0.1, 0.1);
      ff.vy += p.random(-0.1, 0.1);
      ff.vx = p.constrain(ff.vx, -1, 1);
      ff.vy = p.constrain(ff.vy, -1, 1);
      
      // Attract toward mouse (jar effect)
      if (mouseInCanvas) {
        let dx = mx - ff.x;
        let dy = my - ff.y;
        let dist = p.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ff.vx += dx * 0.002;
          ff.vy += dy * 0.002;
        }
      }
      
      // Synchronize with nearby fireflies
      for (let other of fireflies) {
        if (other !== ff) {
          let d = p.dist(ff.x, ff.y, other.x, other.y);
          if (d < 50) {
            ff.phase += (other.phase - ff.phase) * 0.01;
          }
        }
      }
      
      ff.x += ff.vx;
      ff.y += ff.vy;
      
      // Wrap edges
      if (ff.x < 0) ff.x = p.width;
      if (ff.x > p.width) ff.x = 0;
      if (ff.y < 0) ff.y = p.height;
      if (ff.y > p.height) ff.y = 0;
      
      // Pulsing glow
      let brightness = p.map(p.sin(ff.phase), -1, 1, 0.2, 1);
      let glowSize = ff.size * (1 + brightness * 0.5);
      
      // Outer glow
      p.fill(45, 80, 100, brightness * 0.2);
      p.ellipse(ff.x, ff.y, glowSize * 4);
      p.fill(50, 90, 100, brightness * 0.4);
      p.ellipse(ff.x, ff.y, glowSize * 2);
      // Core
      p.fill(55, 70, 100, brightness);
      p.ellipse(ff.x, ff.y, glowSize);
    }
  };
};

// ========================================
// Murmuration - Flocking birds (Montana wildlife)
// Boids algorithm with emergent swarm behavior
// ========================================
let murmurationSketch = function(p) {
  let boids = [];
  const NUM_BOIDS = 80;
  
  p.setup = function() {
    let container = document.getElementById('code-preview-2');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-2');
    
    for (let i = 0; i < NUM_BOIDS; i++) {
      boids.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-2, 2),
        vy: p.random(-2, 2)
      });
    }
  };
  
  p.draw = function() {
    // Dusk sky gradient
    p.colorMode(p.RGB);
    for (let y = 0; y < p.height; y++) {
      let inter = p.map(y, 0, p.height, 0, 1);
      let c = p.lerpColor(p.color(70, 40, 80), p.color(30, 20, 45), inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }
    
    // Mountain silhouette
    p.fill(20, 15, 30);
    p.noStroke();
    p.beginShape();
    p.vertex(0, p.height);
    for (let x = 0; x <= p.width; x += 20) {
      let y = p.height - 30 - p.noise(x * 0.01) * 60;
      p.vertex(x, y);
    }
    p.vertex(p.width, p.height);
    p.endShape(p.CLOSE);
    
    let mx = p.mouseX;
    let my = p.mouseY;
    let mouseInCanvas = mx > 0 && mx < p.width && my > 0 && my < p.height;
    
    // Update boids
    for (let boid of boids) {
      let sepX = 0, sepY = 0, sepCount = 0;
      let alignX = 0, alignY = 0, alignCount = 0;
      let cohX = 0, cohY = 0, cohCount = 0;
      
      for (let other of boids) {
        if (other !== boid) {
          let d = p.dist(boid.x, boid.y, other.x, other.y);
          
          // Separation
          if (d < 20) {
            sepX += boid.x - other.x;
            sepY += boid.y - other.y;
            sepCount++;
          }
          
          // Alignment
          if (d < 50) {
            alignX += other.vx;
            alignY += other.vy;
            alignCount++;
          }
          
          // Cohesion
          if (d < 60) {
            cohX += other.x;
            cohY += other.y;
            cohCount++;
          }
        }
      }
      
      // Apply forces
      if (sepCount > 0) {
        boid.vx += sepX / sepCount * 0.05;
        boid.vy += sepY / sepCount * 0.05;
      }
      if (alignCount > 0) {
        boid.vx += (alignX / alignCount - boid.vx) * 0.05;
        boid.vy += (alignY / alignCount - boid.vy) * 0.05;
      }
      if (cohCount > 0) {
        boid.vx += (cohX / cohCount - boid.x) * 0.003;
        boid.vy += (cohY / cohCount - boid.y) * 0.003;
      }
      
      // Avoid mouse (predator)
      if (mouseInCanvas) {
        let d = p.dist(boid.x, boid.y, mx, my);
        if (d < 80) {
          boid.vx += (boid.x - mx) * 0.02;
          boid.vy += (boid.y - my) * 0.02;
        }
      }
      
      // Limit speed
      let speed = p.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
      if (speed > 3) {
        boid.vx = (boid.vx / speed) * 3;
        boid.vy = (boid.vy / speed) * 3;
      }
      
      boid.x += boid.vx;
      boid.y += boid.vy;
      
      // Wrap edges
      if (boid.x < 0) boid.x = p.width;
      if (boid.x > p.width) boid.x = 0;
      if (boid.y < 0) boid.y = p.height;
      if (boid.y > p.height) boid.y = 0;
    }
    
    // Draw boids as small birds
    p.colorMode(p.HSB);
    p.noStroke();
    for (let boid of boids) {
      let angle = p.atan2(boid.vy, boid.vx);
      p.push();
      p.translate(boid.x, boid.y);
      p.rotate(angle);
      p.fill(0, 0, 15);
      // Bird shape
      p.beginShape();
      p.vertex(6, 0);
      p.vertex(-4, -3);
      p.vertex(-2, 0);
      p.vertex(-4, 3);
      p.endShape(p.CLOSE);
      p.pop();
    }
  };
};

// ========================================
// Ink Diffusion - Watercolor simulation
// Click to drop ink that bleeds organically
// ========================================
let inkSketch = function(p) {
  let particles = [];
  let drops = [];
  
  p.setup = function() {
    let container = document.getElementById('code-preview-3');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-3');
    p.background(250, 245, 240); // Paper color
  };
  
  p.draw = function() {
    // Subtle paper texture fade
    p.colorMode(p.RGB);
    p.noStroke();
    p.fill(250, 245, 240, 3);
    p.rect(0, 0, p.width, p.height);
    
    // Update and draw ink particles
    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];
      
      // Organic movement using noise
      let angle = p.noise(particle.x * 0.01, particle.y * 0.01, p.frameCount * 0.01) * p.TWO_PI * 2;
      particle.x += p.cos(angle) * particle.speed;
      particle.y += p.sin(angle) * particle.speed;
      particle.speed *= 0.99;
      particle.life -= 0.5;
      particle.size += 0.1;
      
      if (particle.life > 0) {
        p.colorMode(p.HSB);
        p.fill(particle.hue, particle.sat, particle.bri, particle.life / 255 * 0.5);
        p.noStroke();
        p.ellipse(particle.x, particle.y, particle.size);
      } else {
        particles.splice(i, 1);
      }
    }
    
    // Instructions
    if (particles.length === 0 && drops.length === 0) {
      p.colorMode(p.RGB);
      p.fill(180);
      p.textAlign(p.CENTER);
      p.textSize(14);
      p.text('click to drop ink', p.width/2, p.height/2);
    }
  };
  
  p.mousePressed = function() {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      // Create ink drop
      let hue = p.random([340, 200, 280, 30]); // Her palette colors
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: p.mouseX + p.random(-5, 5),
          y: p.mouseY + p.random(-5, 5),
          size: p.random(2, 8),
          speed: p.random(0.5, 2),
          life: p.random(100, 255),
          hue: hue + p.random(-20, 20),
          sat: p.random(40, 70),
          bri: p.random(50, 80)
        });
      }
    }
  };
};

// ========================================
// Generative Self-Portrait
// Particles construct and deconstruct a face
// ========================================
let portraitSketch = function(p) {
  let particles = [];
  let facePoints = [];
  const NUM_PARTICLES = 200;
  
  p.setup = function() {
    let container = document.getElementById('code-preview-4');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-4');
    
    // Define face outline points
    let cx = w / 2;
    let cy = h / 2;
    
    // Face oval
    for (let a = 0; a < p.TWO_PI; a += 0.1) {
      facePoints.push({
        x: cx + p.cos(a) * 60,
        y: cy + p.sin(a) * 75
      });
    }
    
    // Eyes
    for (let a = 0; a < p.TWO_PI; a += 0.3) {
      facePoints.push({ x: cx - 25 + p.cos(a) * 12, y: cy - 15 + p.sin(a) * 8 });
      facePoints.push({ x: cx + 25 + p.cos(a) * 12, y: cy - 15 + p.sin(a) * 8 });
    }
    
    // Nose
    facePoints.push({ x: cx, y: cy });
    facePoints.push({ x: cx - 8, y: cy + 15 });
    facePoints.push({ x: cx + 8, y: cy + 15 });
    
    // Mouth
    for (let a = 0; a < p.PI; a += 0.2) {
      facePoints.push({ x: cx + p.cos(a + p.PI) * 20, y: cy + 35 + p.sin(a + p.PI) * 8 });
    }
    
    // Initialize particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      let target = facePoints[p.floor(p.random(facePoints.length))];
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        targetX: target.x,
        targetY: target.y,
        building: true,
        timer: p.random(100, 300)
      });
    }
  };
  
  p.draw = function() {
    p.background(20, 18, 30);
    p.colorMode(p.HSB);
    p.noStroke();
    
    for (let particle of particles) {
      particle.timer--;
      
      if (particle.timer <= 0) {
        particle.building = !particle.building;
        particle.timer = p.random(100, 300);
        if (particle.building) {
          let target = facePoints[p.floor(p.random(facePoints.length))];
          particle.targetX = target.x;
          particle.targetY = target.y;
        } else {
          particle.targetX = p.random(p.width);
          particle.targetY = p.random(p.height);
        }
      }
      
      // Move toward target
      particle.x += (particle.targetX - particle.x) * 0.02;
      particle.y += (particle.targetY - particle.y) * 0.02;
      
      // Draw
      let hue = particle.building ? 350 : 200;
      p.fill(hue, 60, 90, 0.8);
      p.ellipse(particle.x, particle.y, 3);
    }
  };
};

// ========================================
// Mountain Ridgeline Generator
// Infinite Montana peaks with day/night cycle
// ========================================
let mountainSketch = function(p) {
  let offset = 0;
  let timeOfDay = 0;
  
  p.setup = function() {
    let container = document.getElementById('code-preview-5');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-5');
  };
  
  p.draw = function() {
    timeOfDay += 0.002;
    
    // Sky gradient based on time of day
    p.colorMode(p.RGB);
    let dayPhase = (p.sin(timeOfDay) + 1) / 2;
    
    for (let y = 0; y < p.height; y++) {
      let inter = p.map(y, 0, p.height, 0, 1);
      let dayTop = p.color(135, 180, 220);
      let dayBottom = p.color(220, 180, 160);
      let nightTop = p.color(15, 20, 40);
      let nightBottom = p.color(40, 30, 50);
      
      let topColor = p.lerpColor(nightTop, dayTop, dayPhase);
      let bottomColor = p.lerpColor(nightBottom, dayBottom, dayPhase);
      let c = p.lerpColor(topColor, bottomColor, inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }
    
    // Sun/Moon
    let celestialY = p.height * 0.3 + p.sin(timeOfDay) * p.height * 0.2;
    if (dayPhase > 0.5) {
      // Sun
      p.noStroke();
      p.fill(255, 220, 100, 200);
      p.ellipse(p.width * 0.75, celestialY, 30);
    } else {
      // Moon
      p.noStroke();
      p.fill(230, 230, 240, 200);
      p.ellipse(p.width * 0.75, celestialY, 25);
    }
    
    // Draw mountain layers (back to front)
    p.noStroke();
    for (let layer = 0; layer < 5; layer++) {
      let layerDepth = layer / 5;
      let baseColor = p.lerpColor(
        p.color(60, 50, 80),
        p.color(30, 40, 50),
        layerDepth
      );
      let brightness = p.map(dayPhase, 0, 1, 0.3, 1);
      p.fill(p.red(baseColor) * brightness, p.green(baseColor) * brightness, p.blue(baseColor) * brightness);
      
      p.beginShape();
      p.vertex(0, p.height);
      
      let noiseScale = 0.005 + layer * 0.003;
      let heightScale = 80 + layer * 30;
      let baseY = p.height - 50 - layer * 25;
      
      for (let x = 0; x <= p.width; x += 5) {
        let y = baseY - p.noise(x * noiseScale + offset + layer * 100) * heightScale;
        p.vertex(x, y);
      }
      
      p.vertex(p.width, p.height);
      p.endShape(p.CLOSE);
    }
    
    offset += 0.002;
  };
};

// Initialize preview sketches when elements exist
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('code-preview-1')) {
    new p5(fireflySketch);
  }
  if (document.getElementById('code-preview-2')) {
    new p5(murmurationSketch);
  }
  if (document.getElementById('code-preview-3')) {
    new p5(inkSketch);
  }
  if (document.getElementById('code-preview-4')) {
    new p5(portraitSketch);
  }
  if (document.getElementById('code-preview-5')) {
    new p5(mountainSketch);
  }
});

// ========================================
// Carousel functionality
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const dotsContainer = document.querySelector('.carousel-dots');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentIndex = 0;
  let visibleSlides = Array.from(slides);
  
  function createDots() {
    dotsContainer.innerHTML = '';
    visibleSlides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    if (visibleSlides.length === 0) return;
    if (index < 0) index = visibleSlides.length - 1;
    if (index >= visibleSlides.length) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Filter functionality
  function filterSlides(category) {
    currentIndex = 0;
    
    if (category === 'all') {
      slides.forEach(slide => slide.style.display = '');
      visibleSlides = Array.from(slides);
    } else {
      slides.forEach(slide => {
        if (slide.dataset.category === category) {
          slide.style.display = '';
        } else {
          slide.style.display = 'none';
        }
      });
      visibleSlides = Array.from(slides).filter(s => s.dataset.category === category);
    }
    
    createDots();
    goToSlide(0);
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSlides(btn.dataset.filter);
    });
  });
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (track) {
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextSlide();
      if (touchEndX - touchStartX > 50) prevSlide();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Initialize
  createDots();
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
