export function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('hero');
  let particlesArray = [];
  let animationFrameId = null;
  let isVisible = true;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height + canvas.height; // start below
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = Math.random() * 0.8 + 0.2;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      
      if (this.y < 0) {
        this.y = canvas.height + Math.random() * 50;
        this.x = Math.random() * canvas.width;
      }
    }
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = '#00d4ff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticlesList() {
    particlesArray = [];
    const count = Math.min(100, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
      particlesArray[i].y = Math.random() * canvas.height; // distribute on startup
    }
  }
  initParticlesList();

  function animateParticles() {
    if (!isVisible) return; // Halt calculations and redraws when hidden
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animateParticles);
  }

  // Optimize Performance: Pause loop when Hero section is out of viewport
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // Resume Loop
          cancelAnimationFrame(animationFrameId);
          animateParticles();
        } else {
          // Pause Loop
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
  } else {
    // Fallback if IntersectionObserver is not supported
    animateParticles();
  }
}
