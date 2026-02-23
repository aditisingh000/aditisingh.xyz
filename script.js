// Resume data – from Resume-AditiSingh.pdf
const resumeData = {
    experience: [
        {
            id: 1,
            title: "Software Engineering Intern",
            company: "Ozcorp Scientific",
            location: "Remote",
            startDate: "2025-01",
            endDate: "Present",
            description: "Designing and developing a meta-agent platform and agents for recruitment, research, and CRM workflows.",
            achievements: [
                "Designed and developed a meta-agent platform using Python, Next.js, Postgres, and LangChain",
                "Proposed and documented architectural enhancements (agent structure, service integrations)",
                "Implemented end-to-end features: Google Calendar scheduling (FastAPI), Twilio SMS, resume parsing, DB migrations",
                "Owned DevOps for the recruiting agent pipeline; managed GitHub MRs and unit/integration testing"
            ]
        },
        {
            id: 2,
            title: "Software Engineer",
            company: "Mercor",
            location: "Remote",
            startDate: "2024-09",
            endDate: "Present",
            description: "LLM supervised fine-tuning for coding and debugging assistance.",
            achievements: [
                "Sourced and analyzed technical coding documentation for accuracy and domain alignment",
                "Designed complex prompts and drafted golden reference responses for model training and evaluation",
                "Reviewed peer-generated golden responses; tracked and documented feedback for dataset quality and consistency"
            ]
        },
        {
            id: 3,
            title: "Data Science Student Researcher",
            company: "UC Berkeley, CITRIS and the Banatao Institute",
            location: "Berkeley, CA",
            startDate: "2024-09",
            endDate: "2025-08",
            description: "Research on LLM-based tools and early detection of ADHD using LLMs.",
            achievements: [
                "Designed a RAG-based LLM Chatbot and Forum for administrative professionals (React/Radix UI, Python/LangChain, Postgres/Supabase)",
                "Developed hypotheses and analyzed three datasets for research on leveraging LLMs for early ADHD detection",
                "Designed and evaluated classifiers to uncover data patterns and drive actionable research insights"
            ]
        },
        {
            id: 4,
            title: "Software Engineering Intern",
            company: "Modivcare",
            location: "Denver, CO",
            startDate: "2023-06",
            endDate: "2023-08",
            description: "Web-based trip simulator and AI-driven HR compliance tools.",
            achievements: [
                "Developed a web-based trip simulator modeling patient journey (booking to drop-off) with Django/Python and MySQL",
                "Co-led HR Compliance project; as tech lead, created a pseudo-model with mock HR complaints and multi-shot prompts in ChatGPT to demonstrate Gen AI for compliance"
            ]
        }
    ],
    education: [
        {
            id: 1,
            degree: "Master's in Computer Science with AI Graduate Certificate",
            institution: "University of Colorado at Boulder",
            location: "Boulder, CO",
            startDate: "2025-09",
            endDate: "2027-05",
            description: "Class of 2027.",
            achievements: []
        },
        {
            id: 2,
            degree: "Bachelor's in Data Science (Major), Minor in Computer Science",
            institution: "University of California at Berkeley",
            location: "Berkeley, CA",
            startDate: "2021-09",
            endDate: "2025-05",
            description: "Class of 2025.",
            achievements: [
                "CDSS Award of Excellence for Large Language Modeling Innovation (May 2025)",
                "Relevant courses: Data Structures, ML I & II, NLP, AI, Data Science, Data Engineering, Efficient Algorithms"
            ]
        }
    ]
};

// Projects data – from Resume-AditiSingh.pdf (notebookUrl optional; omit for description-only cards)
const projects = [
    {
        id: 1,
        title: "Natural Language Processing (Annotation)",
        description: "Developed an annotated dataset for multi-class book audience ratings using 500 passages from Project Gutenberg and LibriVox. Conducted manual annotations, reconciled discrepancies, produced annotation guidelines, and built a classifier to evaluate dataset accuracy.",
        notebookUrl: "",
        date: "2024",
        tags: ["NLP", "Annotation", "Classification"]
    },
    {
        id: 2,
        title: "Machine Learning (Clinical & CNN)",
        description: "Built ML models to estimate angiographic coronary disease probabilities from global clinical and noninvasive angiography data. Also developed CNN models (convolutional layers, max pooling, fully connected) for multiclass image classification on CIFAR-10.",
        notebookUrl: "",
        date: "2024",
        tags: ["ML", "CNN", "CIFAR-10", "Healthcare"]
    },
    {
        id: 3,
        title: "Data Structures (Ngram Viewer Backend)",
        description: "Implemented a Java backend for a browser-based tool exploring word usage and hypernym/hyponym history in English texts over 100 years using Google NGram and WordNet datasets.",
        notebookUrl: "",
        date: "2023",
        tags: ["Java", "Data Structures", "NLP"]
    },
    {
        id: 4,
        title: "Email & Movie Classifiers",
        description: "Logistic Regression classifier for spam vs non-spam emails and k-nearest-neighbors classifier to predict whether a movie is comedy or thriller.",
        notebookUrl: "",
        date: "2023",
        tags: ["Data Science", "Logistic Regression", "KNN"]
    }
];

// Email gate: Formspree form ID – replace with your form ID from https://formspree.io
const FORMSPREE_GATE_ID = 'YOUR_FORM_ID';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initEmailGate();
    loadProjects();
    loadResume();
    setupSmoothScrolling();
});

function initEmailGate() {
    const gate = document.getElementById('emailGate');
    const mainContent = document.getElementById('mainContent');
    const passed = sessionStorage.getItem('emailGatePassed');

    if (passed) {
        gate.classList.add('hidden');
        mainContent.classList.remove('content-hidden');
        return;
    }

    mainContent.classList.add('content-hidden');
    gate.classList.remove('hidden');

    const form = document.getElementById('emailGateForm');
    const messageEl = document.getElementById('gateMessage');
    const input = document.getElementById('gateEmail');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = (input.value || '').trim();
        if (!email) return;

        messageEl.textContent = '';
        messageEl.className = 'gate-message';

        function unlockSite() {
            sessionStorage.setItem('emailGatePassed', '1');
            gate.classList.add('hidden');
            mainContent.classList.remove('content-hidden');
        }

        // Store email locally so you can view in console: localStorage.getItem('gateEmails')
        try {
            const stored = JSON.parse(localStorage.getItem('gateEmails') || '[]');
            stored.push({ email, timestamp: new Date().toISOString() });
            localStorage.setItem('gateEmails', JSON.stringify(stored));
        } catch (_) {}

        if (!FORMSPREE_GATE_ID || FORMSPREE_GATE_ID === 'YOUR_FORM_ID') {
            unlockSite();
            return;
        }

        try {
            const body = new URLSearchParams({
                email,
                _subject: 'aditisingh.xyz gate',
                timestamp: new Date().toISOString()
            });
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_GATE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString()
            });

            if (!res.ok) throw new Error('Submission failed');
            unlockSite();
        } catch (err) {
            unlockSite();
        }
    });
}

// Load and display projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="project-placeholder">
                <p>No projects available yet. Add your Jupyter notebook projects to the projects array in script.js</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = projects.map(project => {
        const hasNotebook = project.notebookUrl && project.notebookUrl.trim() !== '';
        const dataAttrs = hasNotebook
            ? ''
            : ` data-project-title="${(project.title || '').replace(/"/g, '&quot;')}" data-project-desc="${(project.description || '').replace(/"/g, '&quot;').replace(/\n/g, ' ')}"`;
        const onClick = hasNotebook
            ? `openNotebook('${(project.notebookUrl || '').replace(/'/g, "\\'")}', '${(project.title || '').replace(/'/g, "\\'")}')`
            : 'openProjectDetail(this)';
        return `
        <div class="project-card"${dataAttrs} onclick="${onClick}">
            <div class="project-meta">${project.date}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-meta">${project.tags.join(' • ')}</div>
        </div>
    `;
    }).join('');
}

function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
}

// Open project detail modal (no notebook URL); el is the project card with data-project-title and data-project-desc
function openProjectDetail(el) {
    const title = escapeHtml(el.getAttribute('data-project-title') || 'Project');
    const description = escapeHtml(el.getAttribute('data-project-desc') || '').replace(/\n/g, '<br>');
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal(this)">&times;</button>
            <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 500;">${title}</h2>
            <p style="line-height: 1.7; color: #666;">${description}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(modal.querySelector('.modal-close'));
    });
}

// Open notebook in modal
function openNotebook(url, title) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal(this)">&times;</button>
            <h2 style="margin-bottom: 2rem; font-size: 1.5rem; font-weight: 500;">${title}</h2>
            <div class="notebook-viewer">
                <iframe src="${url}" frameborder="0"></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.querySelector('.modal-close'));
        }
    });
}

// Close modal
function closeModal(button) {
    const modal = button.closest('.modal');
    if (modal) {
        modal.remove();
    }
}

// Compute duration in months (for proportional timeline box heights)
function getDurationMonths(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(1, months); // at least 1 month so short stints still have a visible box
}

function getStartEnd(item) {
    const start = new Date(item.startDate);
    const end = item.endDate === 'Present' ? new Date() : new Date(item.endDate);
    return { start: start.getTime(), end: end.getTime() };
}

function overlaps(itemA, itemB) {
    const a = getStartEnd(itemA);
    const b = getStartEnd(itemB);
    return a.start < b.end && a.end > b.start;
}

// Union-find: group items that overlap (transitively). Returns array of groups (each group = array of items).
function buildOverlapGroups(items) {
    const n = items.length;
    const parent = items.map((_, i) => i);
    function find(i) {
        if (parent[i] !== i) parent[i] = find(parent[i]);
        return parent[i];
    }
    function union(i, j) {
        parent[find(i)] = find(j);
    }
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (overlaps(items[i], items[j])) union(i, j);
        }
    }
    const groupByRoot = new Map();
    items.forEach((item, i) => {
        const r = find(i);
        if (!groupByRoot.has(r)) groupByRoot.set(r, []);
        groupByRoot.get(r).push(item);
    });
    return Array.from(groupByRoot.values());
}

function renderTimelineContent(item, durationRatio, maxMonths) {
    const isExperience = item.type === 'experience';
    const durationStyle = `--duration-ratio: ${durationRatio};`;
    return `
        <div class="timeline-content" style="${durationStyle}">
            <div class="timeline-date">${item.startDate} - ${item.endDate}</div>
            <h3 class="timeline-title">${isExperience ? item.title : item.degree}</h3>
            <div class="timeline-company">${isExperience ? item.company : item.institution}</div>
            <div class="timeline-location">${item.location}</div>
            <p class="timeline-description">${item.description}</p>
            ${item.achievements && item.achievements.length > 0 ? `
                <ul class="timeline-achievements">
                    ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `;
}

// Load and display resume timeline (concurrent items shown side by side like Google Calendar)
function loadResume() {
    const timelineContainer = document.getElementById('timelineContainer');
    
    if (!timelineContainer) return;
    
    const allItems = [
        ...resumeData.experience.map(item => ({ ...item, type: 'experience' })),
        ...resumeData.education.map(item => ({ ...item, type: 'education' }))
    ];
    
    if (allItems.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-placeholder">
                <p>Add your experience and education to the resumeData object in script.js</p>
            </div>
        `;
        return;
    }
    
    const itemsWithDuration = allItems.map(item => ({
        ...item,
        durationMonths: getDurationMonths(item.startDate, item.endDate)
    }));
    const maxMonths = Math.max(...itemsWithDuration.map(i => i.durationMonths));
    
    const groups = buildOverlapGroups(itemsWithDuration);
    // Sort groups by latest end date in group (most recent first)
    groups.sort((ga, gb) => {
        const maxEnd = (g) => Math.max(...g.map(i => getStartEnd(i).end));
        return maxEnd(gb) - maxEnd(ga);
    });
    
    let timelineHTML = '<div class="timeline">';
    
    groups.forEach((group) => {
        if (group.length === 1) {
            const item = group[0];
            const isExperience = item.type === 'experience';
            const side = isExperience ? 'left' : 'right';
            const durationRatio = item.durationMonths / maxMonths;
            timelineHTML += `
                <div class="timeline-item ${side}">
                    ${renderTimelineContent(item, durationRatio, maxMonths)}
                    <div class="timeline-marker"></div>
                </div>
            `;
            return;
        }
        // Concurrent row: side-by-side like Google Calendar
        const leftItems = group.filter(i => i.type === 'experience');
        const rightItems = group.filter(i => i.type === 'education');
        timelineHTML += '<div class="timeline-row">';
        timelineHTML += '<div class="timeline-row-side timeline-row-left">';
        leftItems.forEach((item) => {
            const durationRatio = item.durationMonths / maxMonths;
            timelineHTML += renderTimelineContent(item, durationRatio, maxMonths);
        });
        timelineHTML += '</div>';
        timelineHTML += '<div class="timeline-marker"></div>';
        timelineHTML += '<div class="timeline-row-side timeline-row-right">';
        rightItems.forEach((item) => {
            const durationRatio = item.durationMonths / maxMonths;
            timelineHTML += renderTimelineContent(item, durationRatio, maxMonths);
        });
        timelineHTML += '</div>';
        timelineHTML += '</div>';
    });
    
    timelineHTML += '</div>';
    timelineContainer.innerHTML = timelineHTML;
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Export functions for global access
window.openNotebook = openNotebook;
window.openProjectDetail = openProjectDetail;
window.closeModal = closeModal;
