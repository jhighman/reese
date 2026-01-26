// ========================================
// Reese Highman Portfolio - Main JS
// ========================================

// Generative Background
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
        hue: p.random([345, 350, 355, 0]) // Maroons and warm silvers (UM colors)
      });
    }
  };
  
  p.draw = function() {
    p.clear();
    p.colorMode(p.HSB);
    p.noStroke();
    
    for (let particle of particles) {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = p.width;
      if (particle.x > p.width) particle.x = 0;
      if (particle.y < 0) particle.y = p.height;
      if (particle.y > p.height) particle.y = 0;
      
      // Draw particle with glow
      p.fill(particle.hue, 60, 80, 0.3);
      p.ellipse(particle.x, particle.y, particle.size * 3);
      p.fill(particle.hue, 70, 100, 0.8);
      p.ellipse(particle.x, particle.y, particle.size);
    }
    
    // Draw connections
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

// Code Preview Sketches
let preview1Sketch = function(p) {
  let particles = [];
  
  p.setup = function() {
    let container = document.getElementById('code-preview-1');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-1');
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-1, 1),
        vy: p.random(-2, -0.5),
        size: p.random(3, 8),
        hue: p.random(340, 360)
      });
    }
  };
  
  p.draw = function() {
    p.background(15, 15, 26, 50);
    p.colorMode(p.HSB);
    p.noStroke();
    
    for (let particle of particles) {
      particle.x += particle.vx;
      particle.vy += 0.02;
      particle.y += particle.vy;
      
      if (particle.y > p.height) {
        particle.y = 0;
        particle.vy = p.random(-2, -0.5);
      }
      
      p.fill(particle.hue, 70, 90);
      p.ellipse(particle.x, particle.y, particle.size);
    }
  };
};

let preview2Sketch = function(p) {
  let offset = 0;
  
  p.setup = function() {
    let container = document.getElementById('code-preview-2');
    if (!container) return;
    let w = container.offsetWidth || 400;
    let h = container.offsetHeight || 300;
    let canvas = p.createCanvas(w, h);
    canvas.parent('code-preview-2');
  };
  
  p.draw = function() {
    p.background(15, 15, 26);
    p.colorMode(p.HSB);
    p.noFill();
    p.strokeWeight(2);
    
    for (let w = 0; w < 5; w++) {
      p.stroke(350 - w * 5, 50 - w * 8, 60 + w * 8);
      p.beginShape();
      for (let x = 0; x <= p.width; x += 5) {
        let y = p.height/2 + p.sin((x * 0.02) + offset + (w * 0.5)) * (20 + w * 8);
        p.vertex(x, y);
      }
      p.endShape();
    }
    
    offset += 0.03;
  };
};

// Initialize preview sketches when elements exist
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('code-preview-1')) {
    new p5(preview1Sketch);
  }
  if (document.getElementById('code-preview-2')) {
    new p5(preview2Sketch);
  }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const dotsContainer = document.querySelector('.carousel-dots');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentIndex = 0;
  let visibleSlides = Array.from(slides);
  
  // Create dots
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
    
    // Simple: just use currentIndex since hidden slides are display:none
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
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      // Update visible slides
      visibleSlides = [];
      slides.forEach(slide => {
        if (filter === 'all' || slide.dataset.category === filter) {
          slide.style.display = '';
          visibleSlides.push(slide);
        } else {
          slide.style.display = 'none';
        }
      });
      
      // Reset to first slide and recreate dots
      currentIndex = 0;
      track.style.transform = 'translateX(0)';
      createDots();
    });
  });
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  });
  
  // Initialize
  createDots();
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
