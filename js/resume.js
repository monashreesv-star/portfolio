/**
 * Interactive Resume System & ATS PDF Print Exporter
 * Formatted according to modern tech recruiter & ATS standards.
 */

class ResumeViewer {
  constructor() {
    this.modal = document.getElementById('resume-modal');
    this.closeBtn = document.getElementById('resume-modal-close');
    this.printBtn = document.getElementById('resume-print-btn');
    this.copyBtn = document.getElementById('resume-copy-btn');
    this.triggerBtns = document.querySelectorAll('.open-resume-trigger');

    this.init();
  }

  init() {
    this.triggerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => {
        if (window.soundSystem) window.soundSystem.playClick();
        window.print();
      });
    }

    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => {
        this.copyPlainTextResume();
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  openModal() {
    if (!this.modal) return;
    if (window.soundSystem) window.soundSystem.playClick();
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  copyPlainTextResume() {
    const text = `
MONASHREE S V
Aspiring Software Developer | B.Tech Information Technology Student
monashreesv@gmail.com | +91 6382131343 | Coimbatore, Tamil Nadu
LinkedIn: https://www.linkedin.com/in/monashree-s-v-28ms
GitHub: https://github.com/monashreesv-star
LeetCode: https://leetcode.com/u/monashreesv/

PROFESSIONAL PROFILE:
Information Technology student with hands-on exposure to full-stack development, machine learning, and AI-based projects. Experienced in building web applications, integrating APIs, and developing practical solutions through internships and hackathons. Continuously strengthening programming and problem-solving skills.

EDUCATION:
Bachelor of Technology - Information Technology
Sri Krishna College of Engineering and Technology (SKCET), Coimbatore
CGPA: 8.9 / 10 | Present: 2025 | Expected Graduation: 2029

TECHNICAL SKILLS:
- Programming: C++, C, Java, JavaScript, Python
- Web Development: HTML5, CSS3, Bootstrap, React, Node.js, Express.js
- Databases: MySQL, PostgreSQL, Drizzle ORM
- Tools & Concepts: Git, GitHub, DSA, OOP, Operating Systems, Gemini API, PayPal APIs

INTERNSHIP EXPERIENCE:
1. Machine Learning & AI Intern - Tamizhan Skills | Remote | Oct 2026
   - Completed 1-month virtual internship under RISE Internship Program.
   - Built Customer Churn Prediction system using Python, NumPy, Pandas, Matplotlib, Seaborn, and Scikit-learn.
2. Full Stack Development Intern - SkillNexis | Remote | Nov-Dec 2026
   - Developed responsive web applications and full-stack modules using modern HTML, CSS, JavaScript, and Node.js.

SELECTED PROJECTS:
1. UniServ - Cooperative Service Marketplace
   - Cooperative marketplace connecting clients with skilled workers.
   - Built-in Gemini AI job triage, PayPal Sandbox payment escrow, split payouts, and treasury dashboard.
   - Tech: React Native, Expo, Node.js, Express.js, Gemini API, PayPal APIs.
2. SahaayaGrid - Smart Crowd Safety & Emergency Response
   - Zero-install QR-based emergency reporting with venue-zone identification.
   - Live incident monitoring, proximity volunteer dispatch, and bilingual English/Tamil support.
   - Tech: HTML, CSS, JavaScript, Node.js.
3. AI-Powered Healthcare Supply Chain Management System
   - Healthcare resource & inventory management, AI-assisted stock allocation, and medicine transfer tracking.
   - Tech: Vite, JavaScript, Node.js, PostgreSQL, Drizzle ORM, Gemini API.
4. WasteGuard AI - Smart Waste Management
   - Image-based waste detection and material classification (plastic, paper, recyclable) with collection routing.
   - Tech: Python, Computer Vision, Scikit-learn.

CERTIFICATES & ACHIEVEMENTS:
- IDEATHON 2026 - Social Impact (Open Category)
- CRYPTERA 2026 - Paper Presentation
- Adobe University Hackathon 2026
- CodeEmy Campus Ambassador
- MyGov Campus Ambassador
- Build with AI - Code for Communities
- HACK-KERALA 2026 - TECHAVAM
- Vibe Coding Workshop 2026 - StartupTN & Google for Developers
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      if (window.soundSystem) window.soundSystem.playSuccess();
      window.showToast('✓ ATS Resume copied to clipboard!');
    }).catch(() => {
      window.showToast('Please copy text manually');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.resumeViewer = new ResumeViewer();
});
