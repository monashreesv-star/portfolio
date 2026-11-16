/**
 * Theme Manager with 3 Themes: Obsidian (Dark), Porcelain (Light), and Emerald Slate (Alt)
 * Seamless transitions, persistent storage, and reactive canvas sync.
 */

class ThemeManager {
  constructor() {
    this.theme = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    const saved = localStorage.getItem('user_theme');
    if (saved && ['dark', 'light', 'emerald'].includes(saved)) {
      return saved;
    }
    return 'dark'; // Default to Obsidian Dark
  }

  init() {
    this.applyTheme(this.theme, false);

    const themeButtons = document.querySelectorAll('.theme-pill-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-theme-val');
        if (selected) {
          this.applyTheme(selected, true);
        }
      });
    });
  }

  applyTheme(themeName, playSound = false) {
    this.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('user_theme', themeName);

    // Update active class on buttons
    document.querySelectorAll('.theme-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-theme-val') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (playSound && window.soundSystem) {
      window.soundSystem.playThemeSwitch(themeName !== 'light');
    }

    // Inform background canvas and visualizers
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: themeName } }));
  }
}

window.themeManager = new ThemeManager();
