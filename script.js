
document.addEventListener('DOMContentLoaded', () => {

    // --- INTERACTIVE PARTICLE HERO BACKGROUND ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray;
        const mouse = { x: null, y: null, radius: (canvas.height / 100) * (canvas.width / 100) };
        window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
        class Particle {
            constructor(x, y, directionX, directionY, size, color) { this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color; }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill(); }
            update() {
                if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
                let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 5; }
                    if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 5; }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 5; }
                    if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 5; }
                }
                this.x += this.directionX; this.y += this.directionY; this.draw();
            }
        }
        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - 0.2; let directionY = (Math.random() * .4) - 0.2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, '#C7A4FF'));
            }
        }
        function animate() { requestAnimationFrame(animate); ctx.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } connect(); }
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(34, 224, 161, ${opacityValue})`; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        }
        window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; mouse.radius = (canvas.height / 100) * (canvas.width / 100); init(); });
        window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
        init(); animate();
    }

    // --- ELEMENT 1: FLUID CURSOR LOGIC ---
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    document.querySelectorAll('a, button, .specialist-item, .pharmacy-logo, .category-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // --- ELEMENT 2: LOADER LOGIC ---
    const loader = document.getElementById('loader');
    const loadPercentage = document.getElementById('load-percentage');
    let currentLoad = 0;
    const dataPointsContainer = document.querySelector('.data-points');
    if (dataPointsContainer) {
        for (let i = 0; i < 30; i++) {
            const point = document.createElement('div');
            point.className = 'data-point';
            point.style.top = `${Math.random() * 100}%`;
            point.style.left = `${Math.random() * 100}%`;
            point.style.animationDelay = `${Math.random() * 1.5}s`;
            dataPointsContainer.appendChild(point);
        }
    }
    const interval = setInterval(() => {
        currentLoad = Math.min(100, currentLoad + 1);
        if (loadPercentage) loadPercentage.textContent = currentLoad;
        if (currentLoad >= 100) {
            clearInterval(interval);
            setTimeout(() => { loader.classList.add('hidden'); }, 500);
        }
    }, 40);

    // --- ELEMENT 3: FULL-SCREEN NAVIGATION LOGIC ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuCloseBtn = document.querySelector('#full-screen-nav .menu-close-btn');
    const fullScreenNav = document.getElementById('full-screen-nav');
    if (menuToggle && menuCloseBtn && fullScreenNav) {
        menuToggle.addEventListener('click', () => fullScreenNav.classList.add('active'));
        menuCloseBtn.addEventListener('click', () => fullScreenNav.classList.remove('active'));
        fullScreenNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => fullScreenNav.classList.remove('active'));
        });
    }

    // --- ELEMENT 4: MARQUEE LOGIC ---
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.innerHTML += marqueeContent.innerHTML;
    }

    // --- ELEMENT 5: SPECIALIST LIST HOVER LOGIC ---
    const specialistListContainer = document.querySelector('.specialist-list-container');
    const specialistList = document.getElementById('specialist-list');
    const imagePreview = document.getElementById('specialist-image-preview');
    const doctorData = {
        cardiologist: [{ name: 'Dr. Namo Sharma', specialty: 'Cardiologist', img: 'images/doc1.png' }],
        neurologist: [{ name: 'Dr. Anya Nadar', specialty: 'Neurologist', img: 'images/doc3(2).png' }], // FIXED FILENAME
        general: [{ name: 'Dr. Karan Kumar', specialty: 'General Practitioner', img: 'images/doc5.png' }]
    };
    if (specialistList) {
        const allDoctors = [...doctorData.cardiologist, ...doctorData.neurologist, ...doctorData.general];
        allDoctors.forEach(doc => {
            const li = document.createElement('li');
            li.className = 'specialist-item';
            li.dataset.image = doc.img;
            li.innerHTML = `<span>${doc.name}</span><p>${doc.specialty}</p>`;
            specialistList.appendChild(li);
        });
        specialistList.querySelectorAll('.specialist-item').forEach(item => {
            item.addEventListener('mouseenter', () => { imagePreview.innerHTML = `<img src="${item.dataset.image}" alt="Specialist photo">`; imagePreview.style.opacity = '1'; imagePreview.style.transform = 'translate(-50%, -50%) scale(1)'; });
            item.addEventListener('mouseleave', () => { imagePreview.style.opacity = '0'; imagePreview.style.transform = 'translate(-50%, -50%) scale(0.8)'; });
        });
        if (specialistListContainer) {
            specialistListContainer.addEventListener('mousemove', e => { imagePreview.style.left = `${e.clientX}px`; imagePreview.style.top = `${e.clientY}px`; });
        }
    }

    // --- MODAL HANDLING LOGIC (ROBUST VERSION) ---
    const modalOverlay = document.getElementById('modal-overlay');
    const allModals = document.querySelectorAll('.modal-container');
    const authModal = document.getElementById('auth-modal');
    const symptomModal = document.getElementById('symptom-modal');
    const openAuthBtn = document.getElementById('auth-btn-header');
    const openSymptomBtn = document.getElementById('open-symptom-checker-btn-main');

    function openModal(modal) {
        modalOverlay.classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        allModals.forEach(modal => modal.classList.add('hidden'));
    }
    
    if (openAuthBtn) openAuthBtn.addEventListener('click', () => openModal(authModal));
    if (openSymptomBtn) openSymptomBtn.addEventListener('click', () => {
        resetSymptomChecker();
        openModal(symptomModal);
    });
    
    modalOverlay.addEventListener('click', closeModal);
    allModals.forEach(modal => {
        modal.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
    });

    // --- AUTH MODAL SPECIFIC LOGIC ---
    if (authModal) {
        const loginView = authModal.querySelector('#login-view');
        const signupView = authModal.querySelector('#signup-view');
        authModal.querySelector('#show-signup')?.addEventListener('click', e => { e.preventDefault(); loginView.classList.remove('active'); signupView.classList.add('active'); });
        authModal.querySelector('#show-login')?.addEventListener('click', e => { e.preventDefault(); signupView.classList.remove('active'); loginView.classList.add('active'); });
        authModal.querySelector('#signup-form')?.addEventListener('submit', e => { e.preventDefault(); const name = authModal.querySelector('#signup-name').value; if(openAuthBtn) openAuthBtn.textContent = `Welcome, ${name.split(' ')[0]}!`; closeModal(); });
        authModal.querySelector('#login-form')?.addEventListener('submit', e => { e.preventDefault(); if(openAuthBtn) openAuthBtn.textContent = `My Account`; closeModal(); });
    }

    // --- SYMPTOM CHECKER SPECIFIC LOGIC ---
    if (symptomModal) {
        const symptomDatabase = {
            head: { title: "Head, Neck & Throat Symptoms", tags: ['Headache', 'Migraine', 'Dizziness', 'Sore Throat'] },
            chest: { title: "Chest & Lung Symptoms", tags: ['Chest Pain', 'Cough', 'Shortness of Breath', 'Palpitations'] },
            general: { title: "General Symptoms", tags: ['Fever', 'Chills', 'Fatigue', 'Body Aches'] }
        };
        let selectedSymptoms = [];

        function goToStep(stepNumber) {
            symptomModal.querySelectorAll('.symptom-step').forEach(step => step.classList.remove('active'));
            symptomModal.querySelector(`#step-${stepNumber}`).classList.add('active');
        }

        symptomModal.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                const step2 = symptomModal.querySelector('#step-2');
                const categoryData = symptomDatabase[category];
                const tagsHTML = categoryData.tags.map(tag => `<button class="symptom-tag">${tag}</button>`).join('');
                step2.innerHTML = `<h2>${categoryData.title}</h2><p>Select all that apply.</p><div class="symptom-tags-container">${tagsHTML}</div><button class="btn btn-cta" id="analyze-btn" disabled>Analyze Symptoms</button>`;
                
                const analyzeBtn = step2.querySelector('#analyze-btn');
                step2.querySelectorAll('.symptom-tag').forEach(tag => {
                    tag.addEventListener('click', () => {
                        tag.classList.toggle('active');
                        selectedSymptoms = Array.from(step2.querySelectorAll('.symptom-tag.active')).map(t => t.textContent);
                        analyzeBtn.disabled = selectedSymptoms.length === 0;
                    });
                });

                analyzeBtn.addEventListener('click', () => {
                    const step3 = symptomModal.querySelector('#step-3');
                    let advice = "Based on your symptoms, we recommend rest and hydration. For persistent issues, it is crucial to consult a General Practitioner for a professional diagnosis. This is not medical advice.";
                    if (selectedSymptoms.includes('Chest Pain')) {
                        advice = "Chest pain can be serious. Please consider seeking immediate medical attention. It is essential to consult a Cardiologist for a full evaluation. This is not medical advice.";
                    }
                    step3.innerHTML = `<h2>Analysis Complete</h2><div id="analysis-results"><h3>Initial Guidance:</h3><p id="initial-advice-text"></p></div><button id="restart-checker" class="btn btn-primary">Start Over</button>`;
                    
                    const adviceEl = step3.querySelector('#initial-advice-text');
                    let i = 0;
                    adviceEl.innerHTML = `<span class="typing-caret"></span>`;
                    function typeWriter() {
                        const adviceText = advice;
                        if (i < adviceText.length) {
                            adviceEl.innerHTML = adviceText.substring(0, i + 1) + `<span class="typing-caret"></span>`;
                            i++;
                            setTimeout(typeWriter, 30);
                        } else {
                            adviceEl.querySelector('.typing-caret')?.remove();
                        }
                    }
                    typeWriter();
                    step3.querySelector('#restart-checker').addEventListener('click', resetSymptomChecker);
                    goToStep(3);
                });
                goToStep(2);
            });
        });
        
        function resetSymptomChecker() {
            selectedSymptoms = [];
            goToStep(1);
        }
    }
});