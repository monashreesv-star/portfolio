/**
 * Interactive Projects Showcase & System Architecture Inspector
 * Replaces static screenshots with interactive architecture breakdowns, metrics & code previews.
 */

const projectsData = [
  {
    id: 'uniserv',
    title: 'UniServ',
    subtitle: 'Cooperative Service Marketplace & Automated AI Job Triage',
    category: 'fullstack',
    categoryLabel: 'Full-Stack & Applied AI',
    summary: 'A cooperative-first marketplace connecting verified skilled gig-workers with clients. Features automated AI job triage, PayPal Sandbox payment escrow authorization, split payouts, and a real-time treasury ledger dashboard.',
    problem: 'Traditional gig economy platforms charge exorbitant commissions (up to 30%) with opaque job dispute mechanisms and zero cooperative ownership for service providers.',
    solution: 'Designed an open cooperative marketplace utilizing Google Gemini AI to parse and triage client requests, automatically estimating labor scopes and routing jobs. Integrated PayPal Sandbox for multi-party escrow payments with automated split payouts.',
    techStack: ['React Native', 'Expo', 'Node.js', 'Express.js', 'Gemini API', 'PayPal APIs', 'REST APIs'],
    architecture: 'Client App (React Native/Expo) -> Express API Gateway -> Gemini AI Triage Engine -> PayPal Multi-party Escrow -> PostgreSQL Ledger',
    metrics: [
      { label: 'Job Triage Speed', val: '< 1.4s with Gemini API' },
      { label: 'Payment Flow', val: 'Automated Split Payouts' },
      { label: 'Architecture', val: 'Cooperative Escrow Ledger' }
    ],
    codeSnippet: `// UniServ Gemini Job Triage Handler
router.post('/api/jobs/triage', async (req, res) => {
  const { jobDescription, category, budgetMax } = req.body;
  const prompt = \`Analyze worker classification & complexity for: "\${jobDescription}"\`;
  const triageResult = await geminiModel.generateContent(prompt);
  const { complexity, suggestedRate, requiredSkills } = JSON.parse(triageResult.text);
  
  const matchedWorkers = await matchWorkersByProximity(requiredSkills, req.user.coords);
  return res.json({ status: 'matched', complexity, suggestedRate, matchedWorkers });
});`,
    githubUrl: 'https://github.com/monashreesv-star/UniServ',
    liveUrl: 'https://github.com/monashreesv-star'
  },
  {
    id: 'sahaayagrid',
    title: 'SahaayaGrid',
    subtitle: 'Smart Crowd Safety & Rapid Emergency Response Network',
    category: 'social',
    categoryLabel: 'Social Impact & Emergency Ops',
    summary: 'A zero-install, QR-activated emergency reporting platform built for high-density public venues. Features real-time incident monitoring, skill/proximity-based volunteer dispatch, and bilingual English & Tamil localization.',
    problem: 'During crowd surges, temple festivals, or stadium emergencies, native mobile app downloads fail due to network congestion and urgent panic, delaying emergency response by 15-25 minutes.',
    solution: 'Engineered a lightweight, zero-install web application loaded instantaneously via localized QR codes. Automatically maps venue-zone coordinates, triggers a real-time volunteer notification mesh, and provides bilingual UI support (English/Tamil) for rapid panic-free reporting.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'WebSockets', 'QR Protocol', 'Bilingual i18n'],
    architecture: 'Venue QR Beacon -> Zero-Install Micro-Web -> Zone Identification Engine -> Proximity Volunteer Dispatch Mesh -> Master Incident Monitor',
    metrics: [
      { label: 'Installation Overhead', val: '0 MB (Direct QR Web)' },
      { label: 'Volunteer Dispatch', val: '< 45s Proximity Routing' },
      { label: 'Accessibility', val: 'Bilingual (Tamil / English)' }
    ],
    codeSnippet: `// SahaayaGrid Proximity Volunteer Dispatch
function dispatchNearestVolunteers(incidentZone, requiredSkill) {
  const zoneVolunteers = activeVolunteers.filter(v => 
    v.available && v.skills.includes(requiredSkill)
  );
  const sorted = zoneVolunteers.sort((a, b) => 
    getManhattanDistance(a.zone, incidentZone) - getManhattanDistance(b.zone, incidentZone)
  );
  
  notifyVolunteers(sorted.slice(0, 3), {
    alert: 'EMERGENCY_DISPATCH',
    zone: incidentZone,
    bilingualAlert: 'உடனடி உதவி தேவை: மண்டலம் ' + incidentZone
  });
}`,
    githubUrl: 'https://github.com/monashreesv-star',
    liveUrl: 'https://github.com/monashreesv-star'
  },
  {
    id: 'healthchain',
    title: 'AI Healthcare Supply Chain',
    subtitle: 'Intelligent Inventory Allocation & Cold-Chain Anomaly Tracking',
    category: 'aiml',
    categoryLabel: 'Applied AI & Distributed DB',
    summary: 'A robust healthcare resource and inventory management suite with AI-driven demand forecasting, inter-hospital medicine transfer routing, critical medicine shelf-life tracking, and real-time analytics.',
    problem: 'Hospital clusters face unpredictable drug stockouts, expired batch wastage, and lack of real-time coordination when urgent medicines or anti-venoms need immediate inter-hospital rerouting.',
    solution: 'Constructed a full-stack portal with Vite, Node.js, and PostgreSQL utilizing Drizzle ORM for type-safe database queries. Incorporated Gemini AI to forecast resource consumption trends and optimize batch transfers between regional medical hubs.',
    techStack: ['Vite', 'JavaScript', 'Node.js', 'PostgreSQL', 'Drizzle ORM', 'Gemini API', 'Tailwind CSS'],
    architecture: 'Hospital Terminal -> Vite Client -> Node/Express Controller -> Drizzle ORM -> PostgreSQL Cluster -> Gemini Demand Forecaster',
    metrics: [
      { label: 'Stockout Prediction', val: 'AI Resource Forecasting' },
      { label: 'ORM & Database', val: 'PostgreSQL + Drizzle Type-Safe' },
      { label: 'Transfer Routing', val: 'Multi-Hub Inter-Hospital' }
    ],
    codeSnippet: `// Drizzle ORM Schema & Transfer Pipeline
export const medicineTransfers = pgTable('medicine_transfers', {
  id: serial('id').primaryKey(),
  batchId: text('batch_id').notNull(),
  originHospitalId: integer('origin_id').notNull(),
  targetHospitalId: integer('target_id').notNull(),
  priority: text('priority').default('URGENT'),
  temperatureLogged: real('temp_celsius'),
  status: text('status').default('IN_TRANSIT'),
  createdAt: timestamp('created_at').defaultNow()
});`,
    githubUrl: 'https://github.com/monashreesv-star',
    liveUrl: 'https://github.com/monashreesv-star'
  },
  {
    id: 'wasteguard',
    title: 'WasteGuard AI',
    subtitle: 'Computer Vision Waste Detection & Smart Route Optimization',
    category: 'aiml',
    categoryLabel: 'Machine Learning & Computer Vision',
    summary: 'An automated computer vision image classification system designed for high-throughput waste sorting (plastic, paper, organic, recyclable) paired with smart municipal collection tracking.',
    problem: 'Manual municipal waste sorting is hazardous, inefficient, and leads to recyclable plastics contaminating landfill compost.',
    solution: 'Trained deep learning and machine learning models in Python using NumPy, Pandas, Scikit-learn, and OpenCV to segment and classify material types from camera feeds, triggering automated routing alerts.',
    techStack: ['Python', 'Computer Vision', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Matplotlib'],
    architecture: 'Camera Sensor Feed -> Image Preprocessing & Feature Extraction -> ML Classification Pipeline -> Fleet Dispatch Alert API',
    metrics: [
      { label: 'Material Classes', val: 'Plastic, Paper, Metal, Organic' },
      { label: 'Inference Target', val: 'Edge Camera & Mobile Friendly' },
      { label: 'Impact', val: 'Smart Municipal Route Dispatch' }
    ],
    codeSnippet: `# WasteGuard AI Classifier Pipeline
def predict_waste_category(image_frame):
    processed = preprocess_frame(image_frame, target_size=(224, 224))
    features = feature_extractor.extract(processed)
    prediction = classifier_model.predict(features)
    confidence = np.max(classifier_model.predict_proba(features))
    
    return {
        "class": CATEGORIES[prediction[0]],
        "confidence": float(confidence),
        "is_recyclable": prediction[0] in [1, 2]
    }`,
    githubUrl: 'https://github.com/monashreesv-star/WasteGuardAI',
    liveUrl: 'https://github.com/monashreesv-star'
  }
];

class ProjectsManager {
  constructor() {
    this.grid = document.querySelector('.projects-grid');
    this.filterTabs = document.querySelectorAll('.filter-tab');
    this.modal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('project-modal-body');
    this.modalClose = document.getElementById('project-modal-close');

    this.activeFilter = 'all';
    this.init();
  }

  init() {
    this.renderCards(this.activeFilter);
    this.bindEvents();
  }

  bindEvents() {
    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (window.soundSystem) window.soundSystem.playClick();
        this.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeFilter = tab.getAttribute('data-filter');
        this.renderCards(this.activeFilter);
      });
    });

    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // Escape key to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  renderCards(filter) {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    const filtered = filter === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === filter);

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);

      card.innerHTML = `
        <div class="card-top">
          <span class="project-category-tag">${project.categoryLabel}</span>
          <div class="card-actions-icons">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-icon-link" title="View Source on GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>

        <h3 class="project-title">${project.title}</h3>
        <div class="project-subtitle">${project.subtitle}</div>
        <p class="project-summary">${project.summary}</p>

        <div class="project-highlight-box">
          <div class="highlight-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Core Architecture
          </div>
          <div class="highlight-value">${project.architecture}</div>
        </div>

        <div class="project-tech-pills">
          ${project.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>

        <div class="card-bottom-actions">
          <button class="inspect-btn" data-project="${project.id}">
            Inspect System Deep Dive
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      `;

      // Spotlight tracking
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });

      // Click to inspect
      const inspectBtn = card.querySelector('.inspect-btn');
      inspectBtn.addEventListener('click', () => {
        this.openModal(project);
      });

      this.grid.appendChild(card);
    });
  }

  openModal(project) {
    if (!this.modal || !this.modalContent) return;
    if (window.soundSystem) window.soundSystem.playClick();

    document.getElementById('project-modal-title').textContent = `${project.title} - System Architecture`;

    this.modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="project-category-tag">${project.categoryLabel}</span>
        <h2 style="font-size: 1.8rem; margin-top: 0.5rem; color: var(--text-primary);">${project.title}</h2>
        <div style="color: var(--accent-indigo); font-weight: 600; margin-bottom: 1rem;">${project.subtitle}</div>
        <p style="color: var(--text-secondary); line-height: 1.7;">${project.summary}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.75rem;">
        ${project.metrics.map(m => `
          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: 12px;">
            <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">${m.label}</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">${m.val}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.4rem; color: var(--text-primary);">The Challenge & Problem</h4>
        <p style="color: var(--text-secondary); line-height: 1.6;">${project.problem}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.4rem; color: var(--text-primary);">Engineering Solution</h4>
        <p style="color: var(--text-secondary); line-height: 1.6;">${project.solution}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.6rem; color: var(--text-primary);">Key Implementation Code Snippet</h4>
        <pre style="background: #090d16; color: #e2e8f0; padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); overflow-x: auto; font-size: 0.88rem; line-height: 1.5;"><code>${this.escapeHtml(project.codeSnippet)}</code></pre>
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-decoration: none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Source Code on GitHub
        </a>
      </div>
    `;

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.projectsManager = new ProjectsManager();
});
