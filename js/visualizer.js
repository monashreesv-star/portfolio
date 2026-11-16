/**
 * Interactive Creative Visualizer: Ideas ↔ Code ↔ Interfaces
 * Physics-driven tri-nodal network representing the bridge between concepts, logic, and products.
 */

class TriadVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mouse = { x: -1000, y: -1000, isHovered: false };
    this.time = 0;

    this.nodes = [
      { id: 'ideas', label: 'IDEAS', sub: 'Problem Framing', angle: 0, radius: 85, color: '#38bdf8', currentX: 0, currentY: 0 },
      { id: 'code', label: 'CODE', sub: 'Algorithms & Architecture', angle: (2 * Math.PI) / 3, radius: 85, color: '#818cf8', currentX: 0, currentY: 0 },
      { id: 'interfaces', label: 'INTERFACES', sub: 'Human-Centered AI', angle: (4 * Math.PI) / 3, radius: 85, color: '#34d399', currentX: 0, currentY: 0 }
    ];

    this.particles = [];
    this.bursts = [];

    this.init();
    this.bindEvents();
  }

  init() {
    this.resize();
    for (let i = 0; i < 28; i++) {
      this.particles.push({
        t: Math.random(),
        edge: Math.floor(Math.random() * 3),
        speed: 0.004 + Math.random() * 0.006,
        size: Math.random() * 2 + 1.5
      });
    }
    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio || 380;
    this.canvas.height = rect.height * window.devicePixelRatio || 320;
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    this.w = rect.width || 380;
    this.h = rect.height || 320;
    this.center = { x: this.w / 2, y: this.h / 2 };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.isHovered = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHovered = false;
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.nodes.forEach(n => {
        const dist = Math.hypot(clickX - n.currentX, clickY - n.currentY);
        if (dist < 40) {
          if (window.soundSystem) window.soundSystem.playClick();
          this.createBurst(n.currentX, n.currentY, n.color);
          if (window.showToast) window.showToast(`Exploring: ${n.label} — ${n.sub}`);
        }
      });
    });
  }

  createBurst(x, y, color) {
    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18;
      const speed = 2 + Math.random() * 3;
      this.bursts.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color
      });
    }
  }

  getThemeColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (theme === 'light') {
      return {
        line: 'rgba(15, 23, 42, 0.15)',
        lineActive: 'rgba(37, 99, 235, 0.4)',
        centerRing: 'rgba(37, 99, 235, 0.12)',
        textColor: '#0f172a',
        textMuted: '#475569',
        cardBg: '#ffffff'
      };
    } else if (theme === 'emerald') {
      return {
        line: 'rgba(52, 211, 153, 0.18)',
        lineActive: 'rgba(16, 185, 129, 0.5)',
        centerRing: 'rgba(16, 185, 129, 0.2)',
        textColor: '#f2fbf7',
        textMuted: '#a7f3d0',
        cardBg: '#0f241d'
      };
    }
    // dark
    return {
      line: 'rgba(255, 255, 255, 0.12)',
      lineActive: 'rgba(56, 189, 248, 0.45)',
      centerRing: 'rgba(56, 189, 248, 0.18)',
      textColor: '#ffffff',
      textMuted: '#94a3b8',
      cardBg: '#0f172a'
    };
  }

  animate() {
    this.time += 0.012;
    this.ctx.clearRect(0, 0, this.w, this.h);
    const themeCols = this.getThemeColors();

    // Central core pulsation
    this.ctx.strokeStyle = themeCols.centerRing;
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, 35 + Math.sin(this.time * 2) * 4, 0, Math.PI * 2);
    this.ctx.stroke();

    // Calculate node coordinates with gentle rotation
    this.nodes.forEach((n, idx) => {
      const curAngle = n.angle + this.time * 0.35;
      let targetX = this.center.x + Math.cos(curAngle) * n.radius;
      let targetY = this.center.y + Math.sin(curAngle) * n.radius;

      // Mouse influence
      if (this.mouse.isHovered) {
        const dx = this.mouse.x - targetX;
        const dy = this.mouse.y - targetY;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          targetX += (dx / dist) * 15;
          targetY += (dy / dist) * 15;
        }
      }

      n.currentX += (targetX - n.currentX) * 0.1;
      n.currentY += (targetY - n.currentY) * 0.1;
    });

    // Draw triangle edges connecting the 3 nodes
    this.ctx.strokeStyle = themeCols.line;
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.nodes[0].currentX, this.nodes[0].currentY);
    this.ctx.lineTo(this.nodes[1].currentX, this.nodes[1].currentY);
    this.ctx.lineTo(this.nodes[2].currentX, this.nodes[2].currentY);
    this.ctx.closePath();
    this.ctx.stroke();

    // Draw circulating flow particles
    this.particles.forEach(p => {
      p.t += p.speed;
      if (p.t > 1) p.t = 0;

      const p1 = this.nodes[p.edge];
      const p2 = this.nodes[(p.edge + 1) % 3];

      const px = p1.currentX + (p2.currentX - p1.currentX) * p.t;
      const py = p1.currentY + (p2.currentY - p1.currentY) * p.t;

      this.ctx.fillStyle = p1.color;
      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw particle bursts
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.alpha -= 0.03;
      if (b.alpha <= 0) {
        this.bursts.splice(i, 1);
        continue;
      }
      this.ctx.save();
      this.ctx.globalAlpha = b.alpha;
      this.ctx.fillStyle = b.color;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw nodes
    this.nodes.forEach(n => {
      // Glow
      this.ctx.save();
      this.ctx.shadowColor = n.color;
      this.ctx.shadowBlur = 12;

      // Outer pill
      this.ctx.fillStyle = themeCols.cardBg;
      this.ctx.strokeStyle = n.color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(n.currentX, n.currentY, 26, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();

      // Node label
      this.ctx.fillStyle = themeCols.textColor;
      this.ctx.font = 'bold 10px JetBrains Mono, monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(n.label, n.currentX, n.currentY);
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TriadVisualizer('triad-canvas');
});
