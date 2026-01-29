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
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSlides(btn.dataset.filter);
    });
  });
  
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
  
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  createDots();
  
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
