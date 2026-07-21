// 1. Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// 2. Active Link Highlight
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });
    document.querySelectorAll("nav a").forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) a.classList.add("active");
    });
});

// 3. Avatar & Voice Logic
const avatarImg = document.getElementById('avatar-img');
const heroSection = document.getElementById('home');

let selectedVoice = null;

function loadVoice() {
    const voices = window.speechSynthesis.getVoices();
    selectedVoice = voices.find(v => 
        v.name.includes("Google US English Female") || 
        v.name.includes("Microsoft Zira") || 
        v.name.includes("Samantha") ||
        v.lang === "en-US"
    ) || voices[0];
}

window.speechSynthesis.onvoiceschanged = loadVoice;
loadVoice();

function speakIntroduction() {
    window.speechSynthesis.cancel(); 
    
    const text = "Hi, I am Alina Zahra. I am a frontend developer and I am passionate about learning AI, and currently, I am exploring its core concepts.";
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.rate = 1.0; 
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
}

// Interaction (Image swap + Voice)
heroSection.addEventListener('mouseenter', () => {
    avatarImg.src = 'avatar-speaking.png';
    speakIntroduction();
});

heroSection.addEventListener('mouseleave', () => {
    avatarImg.src = 'avatar-working.png';
    window.speechSynthesis.cancel();
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close when clicking outside the modal box
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

