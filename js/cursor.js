/**
 * Custom Interactive Magnetic Cursor
 * Adds subtle lerp following and magnetic expansion on interactive elements.
 */

class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.custom-cursor-dot');
    this.ring = document.querySelector('.custom-cursor-ring');
    if (!this.dot || !this.ring) return;

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    });

    const interactables = document.querySelectorAll('a, button, input, textarea, .filter-tab, .chip-btn, .project-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.ring.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        this.ring.classList.remove('active');
      });
    });

    this.render();
  }

  render() {
    // Smooth lerp for outer ring
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.18;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.18;

    this.ring.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
    requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(pointer: fine)').matches) {
    new CustomCursor();
  }
});
