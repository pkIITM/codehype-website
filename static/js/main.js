/**
 * CodeHype Tech — Advanced UI & Interactive Simulator Scripts
 * Provides:
 * 1. Scroll Progress Bar
 * 2. Live IST Clock (Asia/Kolkata UTC+5:30)
 * 3. Interactive CareFlow HMS Live Queue Simulator
 * 4. Interactive Pytest Test Suite Runner
 * 5. Interactive Database Model Schema Filter
 * 6. Code Snippet Copy-to-Clipboard with Toast
 * 7. Mouse Spotlight Card Glow Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initISTClock();
    initSpotlightGlow();
    initCodeCopyButtons();
    initQueueSimulator();
    initPytestRunner();
    initSchemaFilter();
});

/* -------------------------------------------------------------
 * 1. SCROLL PROGRESS BAR
 * ----------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'top-scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

/* -------------------------------------------------------------
 * 2. LIVE ASIA/KOLKATA (IST) CLOCK
 * ----------------------------------------------------------- */
function initISTClock() {
    const istClockElements = document.querySelectorAll('.live-ist-clock');
    if (!istClockElements.length) return;

    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const istTimeStr = new Intl.DateTimeFormat('en-IN', options).format(now);
        istClockElements.forEach(el => {
            el.innerHTML = `<span class="status-dot status-dot-live me-1"></span> IST ${istTimeStr} (UTC+5:30)`;
        });
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* -------------------------------------------------------------
 * 3. SPOTLIGHT CARD GLOW EFFECT
 * ----------------------------------------------------------- */
function initSpotlightGlow() {
    const cards = document.querySelectorAll('.project-card, .showcase-card, .channel-card, .skill-card, .workspace-card, .engine-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* -------------------------------------------------------------
 * 4. CODE COPY BUTTONS
 * ----------------------------------------------------------- */
function initCodeCopyButtons() {
    const codeContainers = document.querySelectorAll('.architecture-visual-card, .architecture-diagram-container, .terminal-window, .er-schema-card, .code-window');
    codeContainers.forEach(container => {
        const header = container.querySelector('.visual-header, .diagram-header, .terminal-bar, .schema-header, .dots');
        if (!header) return;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy-code';
        copyBtn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy';
        copyBtn.type = 'button';
        copyBtn.title = 'Copy code snippet';

        copyBtn.addEventListener('click', () => {
            const codeEl = container.querySelector('code, pre');
            if (!codeEl) return;
            const textToCopy = codeEl.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.innerHTML = '<i class="bi bi-check2 text-emerald me-1"></i> Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                copyBtn.innerText = 'Failed';
            });
        });

        header.appendChild(copyBtn);
    });
}

/* -------------------------------------------------------------
 * 5. INTERACTIVE CAREFLOW HMS LIVE QUEUE SIMULATOR
 * ----------------------------------------------------------- */
function initQueueSimulator() {
    const simWrapper = document.getElementById('interactive-queue-simulator');
    if (!simWrapper) return;

    let currentToken = 4;
    let totalInQueue = 9;
    const avgSlotMinutes = 15;

    const currentTokenEl = document.getElementById('sim-current-token');
    const totalQueueEl = document.getElementById('sim-total-queue');
    const waitTimeEl = document.getElementById('sim-est-wait');
    const patientAheadEl = document.getElementById('sim-ahead-count');
    const queueStatusMsgEl = document.getElementById('sim-status-msg');
    const nextBtn = document.getElementById('sim-next-btn');
    const addWalkinBtn = document.getElementById('sim-add-walkin-btn');
    const resetBtn = document.getElementById('sim-reset-btn');

    function updateSimulation() {
        if (currentTokenEl) currentTokenEl.innerText = `#0${currentToken}`;
        if (totalQueueEl) totalQueueEl.innerText = totalInQueue;
        
        const patientsAhead = Math.max(0, totalInQueue - currentToken);
        const estWait = patientsAhead * avgSlotMinutes;

        if (patientAheadEl) patientAheadEl.innerText = patientsAhead;
        if (waitTimeEl) waitTimeEl.innerText = `${estWait} mins`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentToken < totalInQueue) {
                currentToken++;
                if (queueStatusMsgEl) {
                    queueStatusMsgEl.innerHTML = `<span class="text-emerald fw-bold">✓ Token #0${currentToken}</span> called into Doctor Consultation Room. State: <code>WITH_DOCTOR</code>`;
                }
                updateSimulation();
            } else {
                if (queueStatusMsgEl) {
                    queueStatusMsgEl.innerHTML = `<span class="text-cyan fw-bold">All scheduled patients completed!</span> Click 'Register Walk-In' to add more patients.`;
                }
            }
        });
    }

    if (addWalkinBtn) {
        addWalkinBtn.addEventListener('click', () => {
            totalInQueue++;
            if (queueStatusMsgEl) {
                queueStatusMsgEl.innerHTML = `<span class="text-amber fw-bold">+ Assisted Walk-In Patient Checked In</span> -> Issued sequential Token #0${totalInQueue}.`;
            }
            updateSimulation();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentToken = 1;
            totalInQueue = 8;
            if (queueStatusMsgEl) {
                queueStatusMsgEl.innerHTML = `Queue initialized for today's clinic schedule. Token #01 in consultation.`;
            }
            updateSimulation();
        });
    }

    updateSimulation();
}

/* -------------------------------------------------------------
 * 6. INTERACTIVE PYTEST RUNNER
 * ----------------------------------------------------------- */
function initPytestRunner() {
    const triggerBtn = document.getElementById('btn-run-pytest-sim');
    const terminalOutput = document.getElementById('pytest-sim-output');
    const progressEl = document.getElementById('pytest-progress-bar');
    if (!triggerBtn || !terminalOutput) return;

    triggerBtn.addEventListener('click', () => {
        triggerBtn.disabled = true;
        triggerBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Running 63 Tests...';
        terminalOutput.innerHTML = `<span class="term-prompt">$</span> pytest --verbose\n<span class="term-dim">platform darwin -- Python 3.13.15, pytest-8.4.2</span>\n<span class="term-dim">rootdir: /CareFlow-HMS, configfile: pytest.ini</span>\n<span class="term-dim">collected 63 items</span>\n\n`;

        const testSuites = [
            { name: 'tests/test_hms.py (Multi-Role Auth & Security)', count: 18, delay: 400 },
            { name: 'tests/test_hms.py (Slot Concurrency Row-Locks)', count: 12, delay: 800 },
            { name: 'tests/test_hms.py (Digital Rx & Smart Prefill)', count: 15, delay: 1200 },
            { name: 'tests/test_postgresql_migration.py (Cascading FKs & Integrity)', count: 11, delay: 1600 },
            { name: 'tests/test_timezone.py (Asia/Kolkata IST Fidelity & Past-Slots)', count: 7, delay: 2000 }
        ];

        let totalRun = 0;
        testSuites.forEach((suite, idx) => {
            setTimeout(() => {
                totalRun += suite.count;
                const percentage = Math.round((totalRun / 63) * 100);
                if (progressEl) progressEl.style.width = percentage + '%';
                
                terminalOutput.innerHTML += `<span class="text-white">${suite.name}</span> <span class="text-cyan">${suite.count} passed</span> <span class="text-emerald">[${percentage}%]</span>\n`;
                terminalOutput.scrollTop = terminalOutput.scrollHeight;

                if (idx === testSuites.length - 1) {
                    setTimeout(() => {
                        terminalOutput.innerHTML += `\n<span class="term-green fw-bold">================== 63 PASSED in 27.76s (100% SUITE PASS) ==================</span>\n`;
                        triggerBtn.disabled = false;
                        triggerBtn.innerHTML = '<i class="bi bi-arrow-repeat me-2"></i> Re-Run Test Suite';
                    }, 400);
                }
            }, suite.delay);
        });
    });
}

/* -------------------------------------------------------------
 * 7. INTERACTIVE DATABASE SCHEMA FILTER
 * ----------------------------------------------------------- */
function initSchemaFilter() {
    const filterButtons = document.querySelectorAll('.schema-filter-btn');
    const schemaCards = document.querySelectorAll('.model-schema-box');
    if (!filterButtons.length || !schemaCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            schemaCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
