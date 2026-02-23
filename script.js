// Resume data – from Resume-AditiSingh.pdf
const resumeData = {
    experience: [
        {
            id: 1,
            title: "Software Engineering Intern",
            company: "Ozcorp Scientific",
            location: "Remote",
            startDate: "2025-12",
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
            startDate: "2026-02",
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
                "Relevant courses:",
                "Data Structures",
                "Machine Learning I",
                "Machine Learning II",
                "Natural Language Processing",
                "Artificial Intelligence",
                "Data Science",
                "Data Engineering",
                "Efficient Algorithms",
                "Foundations of Data Science",
                "Probability",
                "Statistics",
                "Linear Algebra",
                "Database Systems"
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
            <p style="line-height: 1.7; color: var(--hotpink-muted);">${description}</p>
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

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDatePart(ym) {
    if (!ym || ym === 'Present') return 'Present';
    const [y, m] = String(ym).split('-').map(Number);
    if (!m || m < 1 || m > 12) return ym;
    return `${MONTH_NAMES[m - 1]} ${y}`;
}

function formatDateRange(startDate, endDate) {
    return `${formatDatePart(startDate)} – ${formatDatePart(endDate)}`;
}

// For "Present" roles, use a display end date so box height reflects relative length (e.g. Ozcorp bigger than Mercor).
function getDisplayEndDate(item) {
    if (item.endDate !== 'Present') return item.endDate;
    const company = (item.company || item.institution || '').toLowerCase();
    if (company.includes('ozcorp')) return '2026-12';  // Ozcorp: show as ~12 months
    if (company.includes('mercor')) return '2026-12';  // Mercor: bigger box
    return new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
}

function getStartEnd(item) {
    const start = new Date(item.startDate);
    const endDateStr = getDisplayEndDate(item);
    const end = endDateStr === 'Present' ? new Date() : new Date(endDateStr);
    return { start: start.getTime(), end: end.getTime() };
}

function overlaps(itemA, itemB) {
    const a = getStartEnd(itemA);
    const b = getStartEnd(itemB);
    return a.start < b.end && a.end > b.start;
}

// Assign lane (0, 1, 2...) per side so overlapping items get different lanes. Returns max lane count for that side.
function assignLanes(items, sideKey) {
    const sideItems = items.filter((i) => i.type === sideKey).sort((a, b) => getStartEnd(a).start - getStartEnd(b).start);
    const laneEnds = [];
    sideItems.forEach((item) => {
        const se = getStartEnd(item);
        let lane = 0;
        while (lane < laneEnds.length && laneEnds[lane] > se.start) lane++;
        if (lane === laneEnds.length) laneEnds.push(se.end);
        else laneEnds[lane] = Math.max(laneEnds[lane], se.end);
        item.lane = lane;
    });
    return laneEnds.length;
}

// Load and display resume timeline: time on vertical axis, year labels, boxes positioned by date (Gantt/calendar style)
function loadResume() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    const allItems = [
        ...resumeData.experience.map((item) => ({ ...item, type: 'experience' })),
        ...resumeData.education.map((item) => ({ ...item, type: 'education' }))
    ];

    if (allItems.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-placeholder">
                <p>Add your experience and education to the resumeData object in script.js</p>
            </div>
        `;
        return;
    }

    const rangeStart = Math.min(...allItems.map((i) => getStartEnd(i).start));
    const rangeEnd = Math.max(...allItems.map((i) => getStartEnd(i).end));
    const rangeMs = rangeEnd - rangeStart;

    const leftLaneCount = assignLanes(allItems, 'experience');
    const rightLaneCount = assignLanes(allItems, 'education');

    const TIMELINE_HEIGHT_PX = 900;
    const getTopPct = (endMs) => ((rangeEnd - endMs) / rangeMs) * 100;
    const getBottomPct = (startMs) => 100 - ((rangeEnd - startMs) / rangeMs) * 100;
    const MIN_BOX_HEIGHT_PCT = 10;  // Big enough to show title, company, and date

    const years = [];
    const yStart = new Date(rangeStart).getFullYear();
    const yEnd = new Date(rangeEnd).getFullYear();
    for (let y = yStart; y <= yEnd; y++) years.push(y);

    let axisHTML = '<div class="timeline-axis-labels">';
    years.forEach((y) => {
        const midYear = new Date(y, 5, 15).getTime();
        const topPct = getTopPct(midYear);
        axisHTML += `<div class="timeline-year" style="top: ${topPct}%">${y}</div>`;
    });
    axisHTML += '</div>';

    let boxesHTML = '';
    let marksHTML = '';
    const experienceColors = ['#0a0a0a', '#141414', '#1a1a1a'];
    const educationColors = ['#0a0a0a', '#141414', '#1a1a1a'];

    allItems.forEach((item, idx) => {
        const se = getStartEnd(item);
        let topPct = getTopPct(se.end);
        let bottomPct = getBottomPct(se.start);
        const company = (item.company || item.institution || '').toLowerCase();
        const minHeight = company.includes('modivcare') ? 14 : MIN_BOX_HEIGHT_PCT;  // Modivcare: bigger box so text shows
        let heightPct = 100 - topPct - bottomPct;
        if (heightPct < minHeight) {
            topPct = 100 - bottomPct - minHeight;
        }
        const isExperience = item.type === 'experience';
        const lane = item.lane ?? 0;
        const laneCount = isExperience ? leftLaneCount : rightLaneCount;
        const halfWidth = 48;
        const laneWidth = halfWidth / Math.max(1, laneCount);
        const leftPct = isExperience ? lane * laneWidth : (100 - halfWidth) + lane * laneWidth;
        const color = isExperience ? experienceColors[lane % experienceColors.length] : educationColors[lane % educationColors.length];

        const startMarkTopPct = 100 - bottomPct;
        marksHTML += `<div class="timeline-start-mark" style="top: ${startMarkTopPct}%" aria-hidden="true"></div>`;

        const dateLabel = formatDateRange(item.startDate, item.endDate);
        const header = `
            <h3 class="timeline-title">${isExperience ? item.title : item.degree}</h3>
            <div class="timeline-company">${isExperience ? item.company : item.institution}</div>
            <div class="timeline-date">${dateLabel}</div>
        `;
        const body = `
            <div class="timeline-location">${item.location}</div>
            <p class="timeline-description">${item.description}</p>
            ${item.achievements && item.achievements.length > 0 ? `<ul class="timeline-achievements">${item.achievements.map((a) => `<li>${a}</li>`).join('')}</ul>` : ''}
        `;

        boxesHTML += `
            <div class="timeline-box timeline-box-${isExperience ? 'left' : 'right'}" 
                 style="top: ${topPct}%; bottom: ${bottomPct}%; left: ${leftPct}%; width: ${laneWidth}%; --box-color: ${color};">
                <div class="timeline-box-inner">
                    <div class="timeline-box-header">${header}</div>
                    <div class="timeline-box-body">${body}</div>
                </div>
            </div>
        `;
    });

    timelineContainer.innerHTML = `
        <div class="timeline timeline-axis" style="--timeline-height: ${TIMELINE_HEIGHT_PX}px">
            ${axisHTML}
            <div class="timeline-axis-line">${marksHTML}</div>
            ${boxesHTML}
        </div>
    `;
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
