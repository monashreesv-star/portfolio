/**
 * Main Controller
 * Handles Navigation, Mobile Drawer, Copy Actions, Back to Top & Toast Notifications.
 */

// Toast notification helper
window.showToast = function(msg) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer navigation
  const mobileToggleBtn = document.querySelector('.mobile-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileToggleBtn.innerHTML = mobileDrawer.classList.contains('open') ? '✕' : '☰';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggleBtn.innerHTML = '☰';
      });
    });
  }

  // Smooth scroll spy for active navigation state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 160;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Copy email functionality
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn, .copy-mini-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('monashreesv@gmail.com').then(() => {
        if (window.soundSystem) window.soundSystem.playSuccess();
        window.showToast('✓ Email copied to clipboard: monashreesv@gmail.com');
      }).catch(() => {
        window.showToast('monashreesv@gmail.com');
      });
    });
  });
});
