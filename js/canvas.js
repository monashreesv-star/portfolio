/**
 * Subtle Background Particle Layer
 * Supports 3 themes: Dark, Light, and Emerald Slate.
 */

class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, radius: 120 };
    this.animationFrameId = null;
    this.isTabActive = true;

    this.init();
    this.bindEvents();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();
  }

  getThemeColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (theme === 'light') {
      return {
        particle: 'rgba(37, 99, 235, ',
        secondary: 'rgba(79, 70, 229, ',
        line: 'rgba(37, 99, 235, '
      };
    } else if (theme === 'emerald') {
      return {
        particle: 'rgba(16, 185, 129, ',
        secondary: 'rgba(52, 211, 153, ',
        line: 'rgba(16, 185, 129, '
      };
    }
    // dark
    return {
      particle: 'rgba(56, 189, 248, ',
      secondary: 'rgba(129, 140, 248, ',
      line: 'rgba(56, 189, 248, '
    };
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 18000), 70);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.8 + 1,
        baseAlpha: Math.random() * 0.35 + 0.15,
        colorType: Math.random() > 0.5 ? 'particle' : 'secondary'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
      if (this.isTabActive) {
        this.animate();
      }
    });

    window.addEventListener('theme-changed', () => {
      this.draw();
    });
  }

  animate() {
    if (!this.isTabActive) return;
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  update() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force * 1.2;
        p.y -= Math.sin(angle) * force * 1.2;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const colors = this.getThemeColors();
    const maxDist = 110;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          this.ctx.strokeStyle = `${colors.line}${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    for (let p of this.particles) {
      const colorPrefix = colors[p.colorType];
      this.ctx.fillStyle = `${colorPrefix}${p.baseAlpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleCanvas('bg-canvas');
});
