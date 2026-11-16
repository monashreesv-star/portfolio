/**
 * Interactive Developer Terminal CLI
 * Provides a responsive command-line interface directly on the portfolio.
 */

class InteractiveTerminal {
  constructor() {
    this.container = document.querySelector('.terminal-body');
    this.output = document.querySelector('.terminal-output');
    this.input = document.querySelector('.terminal-input');
    this.chips = document.querySelectorAll('.chip-btn');
    this.history = [];
    this.historyIndex = -1;

    if (!this.input || !this.output) return;

    this.bindEvents();
    this.printWelcome();
  }

  bindEvents() {
    this.input.addEventListener('keydown', (e) => {
      if (window.soundSystem) window.soundSystem.playKeypress();

      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.executeCommand(cmd);
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
        e.preventDefault();
      }
    });

    // Quick chip buttons
    this.chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          this.input.focus();
        }
      });
    });

    // Focus input when clicking anywhere inside terminal body
    this.container.addEventListener('click', () => {
      this.input.focus();
    });
  }

  printWelcome() {
    this.appendHtml(`
      <div class="term-line term-dim">Type <span class="term-cyan">help</span> or click the quick command chips below.</div>
      <div class="term-line term-dim">Available commands: <span class="term-yellow">skills</span>, <span class="term-yellow">projects</span>, <span class="term-yellow">resume</span>, <span class="term-yellow">experience</span>, <span class="term-yellow">contact</span>, <span class="term-yellow">sudo hire</span></div>
    `);
  }

  executeCommand(rawCmd) {
    const cmd = rawCmd.toLowerCase().trim();
    if (window.soundSystem) window.soundSystem.playClick();

    // Echo command
    this.appendHtml(`
      <div class="term-line" style="margin-top: 0.6rem;">
        <span class="term-prompt">monashree@portfolio:~$</span> <span class="term-cyan">${this.escapeHtml(rawCmd)}</span>
      </div>
    `);

    switch (cmd) {
      case 'help':
        this.appendHtml(`
          <div class="term-line term-yellow">Available Commands:</div>
          <div class="term-line"><span class="term-cyan">about</span>       - Monashree's background & objective</div>
          <div class="term-line"><span class="term-cyan">skills</span>      - Technical stack & proficiencies</div>
          <div class="term-line"><span class="term-cyan">projects</span>    - Showcase of production-grade systems</div>
          <div class="term-line"><span class="term-cyan">resume</span>      - Open interactive ATS resume modal</div>
          <div class="term-line"><span class="term-cyan">experience</span>  - Internships & practical experience</div>
          <div class="term-line"><span class="term-cyan">hackathons</span>  - Hackathon wins & leadership roles</div>
          <div class="term-line"><span class="term-cyan">contact</span>     - Direct email, phone & social profiles</div>
          <div class="term-line"><span class="term-cyan">theme</span>       - Toggle between Obsidian & Porcelain themes</div>
          <div class="term-line"><span class="term-cyan">clear</span>       - Clear the terminal screen</div>
          <div class="term-line"><span class="term-cyan">sudo hire</span>   - Recruiter fast-track & celebration!</div>
        `);
        break;

      case 'about':
        this.appendHtml(`
          <div class="term-line term-success">MONASHREE S V - Software Developer & AI Engineer</div>
          <div class="term-line">B.Tech in Information Technology at Sri Krishna College of Engineering and Technology (SKCET), Coimbatore.</div>
          <div class="term-line">CGPA: <span class="term-cyan">8.9 / 10</span> | Active Hackathon Competitor & Community Ambassador.</div>
          <div class="term-line">Focused on full-stack architecture, API integration, and applied AI systems with real-world impact.</div>
        `);
        break;

      case 'skills':
        this.appendHtml(`
          <div class="term-line term-yellow">Technical Arsenal:</div>
          <div class="term-line"><span class="term-cyan">Languages:</span> C++, C, Java, JavaScript, Python</div>
          <div class="term-line"><span class="term-cyan">Web & Backend:</span> React, Node.js, Express.js, HTML5, CSS3, Bootstrap, Tailwind</div>
          <div class="term-line"><span class="term-cyan">Databases:</span> MySQL, PostgreSQL, Drizzle ORM</div>
          <div class="term-line"><span class="term-cyan">Tools & Core:</span> Git, GitHub, Gemini API, PayPal APIs, DSA, OOP, OS</div>
        `);
        break;

      case 'projects':
        this.appendHtml(`
          <div class="term-line term-yellow">Selected Systems:</div>
          <div class="term-line">1. <span class="term-cyan">UniServ</span> - Cooperative Service Marketplace with Gemini AI Triage & PayPal Payouts</div>
          <div class="term-line">2. <span class="term-cyan">SahaayaGrid</span> - QR-based Zero-Install Emergency Incident Management & Volunteer Dispatch</div>
          <div class="term-line">3. <span class="term-cyan">Healthcare Supply Chain</span> - AI Inventory Allocation & Medicine Transfer Tracking</div>
          <div class="term-line">4. <span class="term-cyan">WasteGuard AI</span> - Computer Vision Smart Waste Detection & Classification</div>
          <div class="term-line term-dim">Scroll down to the Projects section or type <span class="term-cyan">inspect 1</span> to learn more.</div>
        `);
        break;

      case 'resume':
        if (window.resumeViewer) {
          window.resumeViewer.openModal();
          this.appendHtml(`<div class="term-line term-success">✓ Interactive Resume modal opened!</div>`);
        } else {
          this.appendHtml(`<div class="term-line term-cyan">Opening resume section...</div>`);
          document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' });
        }
        break;

      case 'experience':
        this.appendHtml(`
          <div class="term-line term-yellow">Internship Experience:</div>
          <div class="term-line"><span class="term-cyan">1. Machine Learning & AI Intern</span> @ Tamizhan Skills (Oct 2026)</div>
          <div class="term-line">   - RISE Program: Customer Churn Prediction using Python, NumPy, Pandas, Scikit-learn.</div>
          <div class="term-line"><span class="term-cyan">2. Full Stack Development Intern</span> @ SkillNexis (Nov-Dec 2026)</div>
          <div class="term-line">   - Responsive frontend architecture, modern component design and styling.</div>
        `);
        break;

      case 'hackathons':
        this.appendHtml(`
          <div class="term-line term-yellow">Certificates & Achievements:</div>
          <div class="term-line">🏆 <span class="term-cyan">IDEATHON 2026</span> - Social Impact (Open Category)</div>
          <div class="term-line">📜 <span class="term-cyan">CRYPTERA 2026</span> - Paper Presentation</div>
          <div class="term-line">🚀 <span class="term-cyan">Adobe University Hackathon 2026</span></div>
          <div class="term-line">🌟 <span class="term-cyan">CodeEmy Campus Ambassador</span> & <span class="term-cyan">MyGov Campus Ambassador</span></div>
          <div class="term-line">💡 <span class="term-cyan">Build with AI</span> - Code for Communities</div>
          <div class="term-line">⚡ <span class="term-cyan">HACK-KERALA 2026</span> - TECHAVAM</div>
          <div class="term-line">💻 <span class="term-cyan">Vibe Coding Workshop 2026</span> - StartupTN & Google for Developers</div>
        `);
        break;

      case 'contact':
        this.appendHtml(`
          <div class="term-line term-yellow">Connect with Monashree:</div>
          <div class="term-line">📧 Email: <a href="mailto:monashreesv@gmail.com" class="term-cyan">monashreesv@gmail.com</a></div>
          <div class="term-line">📱 Phone: <span class="term-cyan">+91 6382131343</span> (Coimbatore, Tamil Nadu)</div>
          <div class="term-line">💼 LinkedIn: <a href="https://www.linkedin.com/in/monashree-s-v-28ms" target="_blank" class="term-cyan">linkedin.com/in/monashree-s-v-28ms</a></div>
          <div class="term-line">🐙 GitHub: <a href="https://github.com/monashreesv-star" target="_blank" class="term-cyan">github.com/monashreesv-star</a></div>
          <div class="term-line">🧩 LeetCode: <a href="https://leetcode.com/u/monashreesv/" target="_blank" class="term-cyan">leetcode.com/u/monashreesv/</a></div>
        `);
        break;

      case 'theme':
        if (window.themeManager) {
          window.themeManager.toggle();
          this.appendHtml(`<div class="term-line term-success">✓ Theme switched to ${window.themeManager.theme} mode.</div>`);
        }
        break;

      case 'clear':
        this.output.innerHTML = '';
        this.printWelcome();
        return;

      case 'sudo hire':
      case 'hire':
        this.triggerHireCelebration();
        break;

      default:
        this.appendHtml(`
          <div class="term-line" style="color: #f87171;">Command not found: "${this.escapeHtml(rawCmd)}". Type <span class="term-yellow">help</span> for list of commands.</div>
        `);
        break;
    }

    this.scrollToBottom();
  }

  triggerHireCelebration() {
    if (window.soundSystem) window.soundSystem.playSuccess();
    this.appendHtml(`
      <div class="term-line term-success" style="font-size: 1.05rem; font-weight: bold;">🎉 ACCESS GRANTED: EXCELLENT CHOICE! 🎉</div>
      <div class="term-line">Monashree brings dedication, technical versatility, and an engineering-first mindset.</div>
      <div class="term-line">Direct phone: <span class="term-cyan">+91 6382131343</span> | Email: <a href="mailto:monashreesv@gmail.com" class="term-cyan">monashreesv@gmail.com</a></div>
      <div class="term-line term-yellow">Let's schedule an interview and build something extraordinary!</div>
    `);

    // Create celebratory particle explosion
    this.launchConfetti();
  }

  launchConfetti() {
    const colors = ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f43f5e'];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = `${Math.random() * 80 + 10}vw`;
      el.style.top = `${Math.random() * 40 + 20}vh`;
      el.style.width = '10px';
      el.style.height = '10px';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = '50%';
      el.style.zIndex = '99999';
      el.style.pointerEvents = 'none';
      el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(el);

      setTimeout(() => {
        el.style.transform = `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400 + 200}px) scale(0)`;
        el.style.opacity = '0';
      }, 20);

      setTimeout(() => el.remove(), 1300);
    }
  }

  appendHtml(html) {
    this.output.insertAdjacentHTML('beforeend', html);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.interactiveTerminal = new InteractiveTerminal();
});
