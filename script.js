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
            degree: "Master's in Computer Science (With AI graduate certificate)",
            institution: "University of Colorado at Boulder",
            location: "Boulder, CO",
            startDate: "2025-09",
            endDate: "2027-05",
            description: "Class of 2027.",
            achievements: [
                "Relevant courses:",
                "Dynamic Programming, Greedy Algorithms",
                "Approximation Algorithms and Linear Programming",
                "Advanced Data Structures, RSA and Quantum Algorithms"
            ]
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

// Projects data – each project has its own notebook when available (resume-aligned)
const projects = [
    {
        id: 1,
        title: "Coronary Heart Disease (ML Models)",
        description: "Developed three ML models to estimate angiographic coronary disease probabilities using patient attributes from global clinical and noninvasive angiography test data. Evaluated model metrics to identify at-risk patients.",
        notebookUrl: "projects/aditi-singh---7f56021c/Coronary-Heart-Disease-ML-Models.ipynb",
        date: "2024",
        tags: ["ML", "Healthcare", "Clinical"]
    },
    {
        id: 2,
        title: "CNN Multiclass Image Classification (CIFAR-10)",
        description: "Developed multiple convolution neural network models with CNN layers, max pooling, and fully connected layers to address the multiclass image classification problem using the CIFAR-10 dataset.",
        notebookUrl: "projects/aditi-singh---7f56021c/Neural-Networks-Clinical-CIFAR10-CNN.ipynb",
        date: "2024",
        tags: ["ML", "CNN", "CIFAR-10", "Computer Vision"]
    },
    {
        id: 3,
        title: "Binary Perceptron",
        description: "Implemented a binary perceptron model for classification from scratch.",
        date: "2024",
        tags: ["ML", "Perceptron", "Classification"]
    },
    {
        id: 4,
        title: "Email Ham or Spam Classifier",
        description: "Developed a Logistic Regression classifier for spam/non-spam (ham) email classification.",
        notebookUrl: "projects/aditi-singh---7f56021c/Email-Movie-Classifiers.ipynb",
        date: "2023",
        tags: ["Data Science", "Logistic Regression", "NLP"]
    },
    {
        id: 5,
        title: "K-Nearest Neighbors Movie Classification",
        description: "Developed a k-nearest-neighbors classifier to predict whether a movie is a comedy or a thriller.",
        notebookUrl: "projects/aditi-singh---7f56021c/Email-Movie-Classifiers.ipynb",
        date: "2023",
        tags: ["Data Science", "KNN", "Classification"]
    }
];

// Email gate: Formspree form ID – replace with your form ID from https://formspree.io
const FORMSPREE_GATE_ID = 'YOUR_FORM_ID';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initEmailGate();
    loadFolderStack();
    loadProjects();
    loadResume();
    setupSmoothScrolling();
    setupScrollForResume();
    setupTimelineReveal();
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

// Build folder stack on hero (PROJECT 1–4 tabs, beige body with placeholders) — like reference layout
function loadFolderStack() {
    const container = document.getElementById('folderStack');
    if (!container || !projects.length) return;

    const tabsHtml = projects.map((p, i) => {
        const label = 'PROJECT ' + (i + 1);
        const active = i === 0 ? ' active' : '';
        const hasUrl = p.notebookUrl && p.notebookUrl.trim();
        const url = hasUrl ? '#' : '#';
        return `<div class="folder-tab${active}" data-index="${i}" data-notebook-url="${hasUrl ? escapeAttr(p.notebookUrl) : ''}" data-notebook-title="${escapeAttr(p.title || '')}"><a href="${url}">${label}</a></div>`;
    }).join('');

    container.innerHTML = `
        <div class="folder-tabs">${tabsHtml}</div>
        <div class="folder-body">
            <div class="placeholder placeholder-large">your image here</div>
            <div class="placeholder placeholder-small">your image here</div>
            <div class="placeholder placeholder-small">your image here</div>
        </div>
    `;

    container.querySelectorAll('.folder-tab').forEach((tab, i) => {
        const link = tab.querySelector('a');
        const notebookUrl = tab.getAttribute('data-notebook-url');
        const notebookTitle = tab.getAttribute('data-notebook-title') || ('Project ' + (i + 1));
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (notebookUrl) {
                openNotebook(notebookUrl, notebookTitle);
            } else {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
        tab.addEventListener('click', function() {
            container.querySelectorAll('.folder-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// Load and display projects — cards link to notebooks in projects folder
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
        const multiNotebooks = project.notebookUrls && Array.isArray(project.notebookUrls) && project.notebookUrls.length > 0;
        const hasNotebook = multiNotebooks || (project.notebookUrl && project.notebookUrl.trim() !== '');
        const dataAttrs = hasNotebook ? '' : ` data-project-title="${escapeAttr(project.title || '')}" data-project-desc="${escapeAttr((project.description || '').replace(/\n/g, ' '))}"`;

        if (multiNotebooks) {
            const linksHtml = project.notebookUrls.map(n => {
                const url = (n.url || '').trim();
                if (!url) return '';
                return `<a href="${escapeAttr(url)}" class="project-notebook-link" target="_blank" rel="noopener">${escapeHtml(n.label || 'Notebook')}</a>`;
            }).filter(Boolean).join('');
            return `
        <div class="project-card project-card-multi">
            <div class="project-meta">${escapeHtml(project.date)}</div>
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-notebook-links">${linksHtml}</div>
            <div class="project-meta">${escapeHtml(project.tags.join(' • '))}</div>
        </div>
    `;
        }

        const isExternalOrIpynb = hasNotebook && (project.notebookUrl.startsWith('http') || project.notebookUrl.endsWith('.ipynb'));
        const notebookClick = "openNotebook('" + (project.notebookUrl || '').replace(/'/g, "\\'") + "', '" + (project.title || '').replace(/'/g, "\\'") + "')";
        const notebookKeydown = "if(event.key==='Enter'||event.key===' '){event.preventDefault();" + notebookClick + "}";
        if (hasNotebook && isExternalOrIpynb) {
            return `
        <div class="project-card project-link" onclick="${notebookClick}" onkeydown="${notebookKeydown}" role="button" tabindex="0"${dataAttrs}>
            <div class="project-meta">${escapeHtml(project.date)}</div>
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <span class="project-notebook-badge">View notebook</span>
            <div class="project-meta">${escapeHtml(project.tags.join(' • '))}</div>
        </div>
    `;
        }
        if (hasNotebook) {
            return `
        <div class="project-card" onclick="${notebookClick}" onkeydown="${notebookKeydown}" role="button" tabindex="0">
            <div class="project-meta">${escapeHtml(project.date)}</div>
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <span class="project-notebook-badge">View notebook</span>
            <div class="project-meta">${escapeHtml(project.tags.join(' • '))}</div>
        </div>
    `;
        }
        return `
        <div class="project-card"${dataAttrs} onclick="openProjectDetail(this)">
            <div class="project-meta">${escapeHtml(project.date)}</div>
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-meta">${escapeHtml(project.tags.join(' • '))}</div>
        </div>
    `;
    }).join('');
}

function escapeAttr(s) {
    return (s || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

// Open notebook in modal — fetch .ipynb and render Jupyter-style
function openNotebook(url, title) {
    const safeTitle = (typeof title === 'string' ? title : '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content modal-content-notebook">
            <button class="modal-close" onclick="closeModal(this)">&times;</button>
            <div class="notebook-modal-header">
                <h2 class="notebook-modal-title">${safeTitle}</h2>
                <a href="${escapeAttr(url)}" class="notebook-download-link" target="_blank" rel="noopener">Download .ipynb</a>
            </div>
            <div class="notebook-viewer jp-Notebook" id="notebookViewerRoot">
                <div class="notebook-loading"><span>Loading notebook…</span></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const container = modal.querySelector('#notebookViewerRoot');
    // Resolve URL so it works from any base path and spaces are encoded
    const fetchUrl = (url && url.startsWith('http')) ? url : new URL(url, window.location.href).href;
    const isFileProtocol = window.location.protocol === 'file:';

    fetch(fetchUrl)
        .then(r => { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
        .then(data => {
            container.innerHTML = '';
            container.classList.remove('notebook-loading');
            renderNotebook(container, data);
        })
        .catch(err => {
            let msg = 'Could not load notebook.';
            if (isFileProtocol) {
                msg += ' Browsers block loading local files when you open the page from disk (file://). Run a local server in this folder instead, e.g. <code>npx serve</code> or <code>python -m http.server 8000</code>, then open http://localhost:8000';
            } else {
                msg += ' The file may be missing or the path is wrong.';
            }
            msg += ' You can still <a href="' + escapeAttr(fetchUrl) + '" target="_blank" rel="noopener">open the .ipynb file</a> directly.';
            container.innerHTML = '<div class="notebook-error">' + msg + '</div>';
            container.classList.remove('notebook-loading');
        });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(modal.querySelector('.modal-close'));
    });
}

// Render Jupyter notebook JSON into the container (Jupyter-like cells and outputs)
function renderNotebook(container, data) {
    const cells = (data && data.cells) || [];
    cells.forEach(cell => {
        const type = (cell.cell_type || 'code').toLowerCase();
        const source = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
        if (type === 'markdown') {
            const mdEl = document.createElement('div');
            mdEl.className = 'jp-Cell jp-MarkdownCell jp-mod-rendered';
            if (typeof marked !== 'undefined') {
                marked.setOptions({ gfm: true, breaks: true });
                mdEl.innerHTML = '<div class="jp-MarkdownCell-content">' + marked.parse(source) + '</div>';
            } else {
                mdEl.innerHTML = '<div class="jp-MarkdownCell-content"><pre>' + escapeHtml(source) + '</pre></div>';
            }
            container.appendChild(mdEl);
            return;
        }
        // Code cell
        const codeEl = document.createElement('div');
        codeEl.className = 'jp-Cell jp-CodeCell';
        const execCount = cell.execution_count;
        const promptHtml = execCount != null
            ? `<div class="jp-InputPrompt jp-InputArea-prompt">In [${execCount}]:</div>`
            : '<div class="jp-InputPrompt jp-InputArea-prompt"></div>';
        let codeHtml = escapeHtml(source);
        if (typeof hljs !== 'undefined') {
            try {
                codeHtml = hljs.highlight(source, { language: 'python' }).value;
            } catch (_) {}
        }
        codeEl.innerHTML = `
            <div class="jp-Cell-inputWrapper">
                <div class="jp-InputArea">
                    ${promptHtml}
                    <div class="jp-InputArea-editor"><pre><code>${codeHtml}</code></pre></div>
                </div>
            </div>
            ${renderCellOutputs(cell.outputs)}
        `;
        container.appendChild(codeEl);
    });
    container.querySelectorAll('pre code').forEach(block => {
        if (typeof hljs !== 'undefined') hljs.highlightElement(block);
    });
}

function renderCellOutputs(outputs) {
    if (!Array.isArray(outputs) || outputs.length === 0) return '';
    const parts = outputs.map(out => {
        const ot = out.output_type || '';
        if (ot === 'stream') {
            const text = Array.isArray(out.text) ? out.text.join('') : (out.text || '');
            const name = (out.name || 'stdout').toLowerCase();
            return `<div class="jp-OutputArea-item"><pre class="jp-Stream jp-${name}">${escapeHtml(text)}</pre></div>`;
        }
        if (ot === 'execute_result' || ot === 'display_data') {
            const data = out.data || {};
            const html = data['text/html'];
            const plain = data['text/plain'];
            const png = data['image/png'];
            const toStr = x => (Array.isArray(x) ? x.join('') : (typeof x === 'string' ? x : ''));
            if (html && toStr(html)) {
                return `<div class="jp-OutputArea-item"><div class="jp-Output-output">${toStr(html)}</div></div>`;
            }
            if (plain && toStr(plain)) {
                return `<div class="jp-OutputArea-item"><pre class="jp-Output-output">${escapeHtml(toStr(plain))}</pre></div>`;
            }
            if (png) {
                const b64 = toStr(png);
                if (b64) return `<div class="jp-OutputArea-item"><img src="data:image/png;base64,${b64}" alt="output" class="jp-Output-img"/></div>`;
            }
        }
        return '';
    }).filter(Boolean);
    if (parts.length === 0) return '';
    return `<div class="jp-Cell-outputWrapper"><div class="jp-OutputArea"><div class="jp-OutputArea-prompt">Out[ ]:</div>${parts.join('')}</div></div>`;
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
    const experienceColors = ['#0f172a', '#1e293b', '#334155'];
    const educationColors = ['#0f172a', '#1e293b', '#334155'];

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
        const isBerkeley = (item.institution || '').toLowerCase().includes('berkeley');
        const relIdx = item.achievements ? item.achievements.indexOf('Relevant courses:') : -1;
        const courses = isBerkeley && relIdx >= 0 && item.achievements ? item.achievements.slice(relIdx + 1) : [];
        const achievementsForBody = item.achievements && item.achievements.length > 0
            ? (isBerkeley && relIdx >= 0 ? item.achievements.slice(0, relIdx) : item.achievements)
            : [];
        const body = `
            <div class="timeline-location">${item.location}</div>
            <p class="timeline-description">${item.description}</p>
            ${achievementsForBody.length > 0 ? `<ul class="timeline-achievements">${achievementsForBody.map((a) => `<li>${a}</li>`).join('')}</ul>` : ''}
        `;

        const coursesTooltip = courses.length > 0
            ? `<div class="timeline-courses-tooltip" aria-label="Relevant courses"><span class="timeline-courses-tooltip-title">Relevant courses</span><ul class="timeline-courses-list">${courses.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul></div>`
            : '';

        boxesHTML += `
            <div class="timeline-box timeline-box-${isExperience ? 'left' : 'right'}${isBerkeley ? ' timeline-box-berkeley' : ''}" 
                 style="top: ${topPct}%; bottom: ${bottomPct}%; left: ${leftPct}%; width: ${laneWidth}%; --box-color: ${color};">
                <div class="timeline-box-inner">
                    <div class="timeline-box-header">${header}</div>
                    <div class="timeline-box-body">${body}</div>
                    ${coursesTooltip}
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

// Scroll-for-resume button: smooth scroll to #resume (same style as click me)
function setupScrollForResume() {
    const btn = document.getElementById('scrollResumeBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
        const resume = document.getElementById('resume');
        if (resume) {
            resume.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Timeline: reveal when scrolled into view
function setupTimelineReveal() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
    observer.observe(container);
}

// Export functions for global access
window.openNotebook = openNotebook;
window.openProjectDetail = openProjectDetail;
window.closeModal = closeModal;
