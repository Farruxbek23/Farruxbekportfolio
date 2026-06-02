/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* =========================
   ACTIVE NAV ON SCROLL
========================= */

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(15,23,42,0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    } else {
        header.style.background = "rgba(15,23,42,0.8)";
        header.style.boxShadow = "none";
    }
});

/* =========================
   TYPING EFFECT
========================= */

const heroText = document.querySelector(".hero-content h2");

const textArray = [
    "Frontend Developer",
    "UI/UX Designer",
    "Web Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!heroText) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        heroText.textContent = currentText.substring(0, charIndex--);
    } else {
        heroText.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

/* =========================
   CONTACT FORM
========================= */

const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Xabaringiz yuborildi!");
        form.reset();
    });
}

/* =========================
   SCROLL ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".skill-card, .service-card, .project-card, .certificate-card, .achievement-card"
).forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(50px)";
    el.style.transition = "0.8s ease";
    observer.observe(el);
});

/* =========================
   ALISA AI (3 TILDA GAPIRADI)
========================= */

const alisaTexts = [
`Salom! Men Odilbekov Farruxbek.
Men 14 yoshli Frontend Developer man.
HTML, CSS, JavaScript va Bootstrap o‘rganayapman.
Maqsadim Full Stack Developer bo‘lish.`,

`Здравствуйте! Меня зовут Одилбеков Фаррухбек.
Мне 14 лет, я Frontend разработчик.
Я изучаю HTML, CSS и JavaScript.
Моя цель — стать Full Stack разработчиком.`,

`Hello! My name is Odilbekov Farruxbek.
I am 14 years old Frontend Developer.
I am learning HTML, CSS and JavaScript.
My goal is to become Full Stack Developer.`
];

let speechIndex = 0;
let isSpeaking = false;

/* Speech voices */
function getVoice(lang) {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => v.lang.includes(lang)) || voices[0];
}

function speakAlisa() {

    if (!("speechSynthesis" in window)) return;

    const speech = new SpeechSynthesisUtterance(alisaTexts[speechIndex]);

    if (speechIndex === 0) {
        speech.lang = "uz-UZ";
        speech.voice = getVoice("ru");
    }

    if (speechIndex === 1) {
        speech.lang = "ru-RU";
        speech.voice = getVoice("ru");
    }

    if (speechIndex === 2) {
        speech.lang = "en-US";
        speech.voice = getVoice("en");
    }

    speech.rate = 1;

    speech.onend = () => {
        speechIndex++;

        if (speechIndex < alisaTexts.length) {
            setTimeout(speakAlisa, 800);
        } else {
            speechIndex = 0;
        }
    };

    speechSynthesis.speak(speech);
}

const alisaBtn = document.querySelector(".alisa");

if (alisaBtn) {
    alisaBtn.addEventListener("click", () => {
        speechSynthesis.cancel();
        speechIndex = 0;
        speakAlisa();
    });
}