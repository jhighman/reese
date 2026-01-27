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

// Initialize preview sketches when elements exist
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('code-preview-1')) {
    new p5(fireflySketch);
  }
  if (document.getElementById('code-preview-2')) {
    new p5(murmurationSketch);
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
