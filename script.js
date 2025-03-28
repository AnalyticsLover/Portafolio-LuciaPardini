// Language translations
const translations = {
    en: {
        name: "Lucia Pardini",
        title: "Data Analyst",
        about: "About Me",
        about_text_1: "I am passionate about learning new things and solving problems.",
        about_text_2: "From Excel to Python, from SQL to PowerBI, from Tableau to Azure, from programming to data visualization, from data science to artificial intelligence.",
        skills: "Skills and Competencies",
        projects: "Personal Projects",
        contact: "Contact Me",
        sendEmail: "Send Email",
        python: "Python",
        sql: "SQL",
        powerbi: "PowerBI",
        tableau: "Tableau",
        excel: "Excel",
        azure: "Azure",
        english: "English (B2)",
        downloadCV: "Download Resume",
        viewCode: "See the code",
        project1Title: "Happiness Index",
        project1Desc: "Creation of two analytical reports studying the results of more than 150 surveyed individuals. A written report made with Jupyter notebooks and another hosted in PowerBI and PowerBI Service.",
        project2Title: "Product Analysis: Bellabeat",
        project2Desc: "Interactive dashboard created in PowerBI to visualize key sales and performance metrics.",
        project3Title: "Sentiment Analysis",
        project3Desc: "Machine learning project for sentiment analysis on social media comments.",
        project4Title: "Python Automation",
        project4Desc: "Automation scripts for data processing and report generation.",
        skills: "Skills and Competencies",
        databases: "Databases",
        machine_learning: "Machine Learning",
        pivot_tables: "Pivot Tables",
        conditional_formatting: "Conditional Formatting",
        charts: "Charts",
        reports: "Reports",
        visualizations: "Visualizations",
        supervised_learning: "Supervised Learning",
        regression: "Regression",
        classification: "Classification",
        logistic_regression: "Logistic Regression",
        random_forest: "Random Forest",
        decision_trees: "Decision Trees"
    },
    es: {
        name: "Lucia Pardini",
        title: "Analista de Datos",
        about: "Sobre mí",
        about_text_1: "Soy una apasionada por aprender cosas nuevas y por resolver problemas.",
        about_text_2: "Desde Excel hasta Python, desde SQL hasta PowerBI, desde Tableau hasta Azure, desde la programación hasta la visualización de datos, desde la ciencia de datos hasta la inteligencia artificial.",
        skills: "Aptitudes y Competencias",
        projects: "Proyectos Personales",
        contact: "Contáctame",
        sendEmail: "Enviar Email",
        python: "Python",
        sql: "SQL",
        powerbi: "PowerBI",
        tableau: "Tableau",
        excel: "Excel",
        azure: "Azure",
        english: "Inglés (B2)",
        downloadCV: "Descargar CV",
        viewCode: "Ver el código",
        project1Title: "Índice de Felicidad",
        project1Desc: "Confección de dos reportes analíticos estudiando los resultados de mas de 150 individuos que fueron encuestados. Un reporte escrito realizado con jupyer notebooks y otro realizado y hosteado en PowerBI y PowerBI Service.",
        project2Title: "Análisis de Produto: Bellabeat",
        project2Desc: "Dashboard interactivo creado en PowerBI para visualizar métricas clave de ventas y rendimiento.",
        project3Title: "Análisis de Sentimientos",
        project3Desc: "Proyecto de machine learning para análisis de sentimientos en comentarios de redes sociales.",
        project4Title: "Automatización con Python",
        project4Desc: "Scripts de automatización para procesamiento de datos y generación de reportes.",
        skills: "Aptitudes y Competencias",
        databases: "Bases de Datos",
        machine_learning: "Aprendizaje Automático",
        pivot_tables: "Tablas Dinámicas",
        conditional_formatting: "Formato Condicional",
        charts: "Gráficos",
        reports: "Informes",
        visualizations: "Visualizaciones",
        supervised_learning: "Aprendizaje Supervisado",
        regression: "Regresión",
        classification: "Clasificación",
        logistic_regression: "Regresión Logística",
        random_forest: "Bosques Aleatorios",
        decision_trees: "Árboles de Decisión"
    }
};

// Current language state
let currentLang = 'es'; // Default to Spanish

// Dark mode state
let isDarkMode = true; // Default to dark mode

// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const languageToggle = document.getElementById('languageToggle');
const body = document.body;

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkMode = false;
        body.classList.add('light-mode');
        updateDarkModeIcon(isDarkMode);
    }
}

// Initialize language from localStorage
function initializeLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        currentLang = savedLang;
        updateLanguageSwitch();
        updateContent();
    }
}

// Toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateDarkModeIcon(isDarkMode);
}

// Update dark mode icon
function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        // In dark mode, show sun icon (white)
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        darkModeToggle.title = 'Switch to light mode';
    } else {
        // In light mode, show moon icon (black)
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        darkModeToggle.title = 'Switch to dark mode';
    }
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('language', currentLang);
    updateLanguageSwitch();
    updateContent();
}

// Update language switch appearance
function updateLanguageSwitch() {
    languageToggle.setAttribute('data-lang', currentLang);
}

// Update content based on current language
function updateContent() {
    // Update text content using translations
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// Add smooth scroll behavior
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

// Add animation on scroll
function handleScrollAnimation() {
    const sections = document.querySelectorAll('.section-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Event listeners
darkModeToggle.addEventListener('click', toggleDarkMode);
languageToggle.addEventListener('click', toggleLanguage);
window.addEventListener('scroll', handleScrollAnimation);

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with pre-filled information
    const mailtoLink = `mailto:luciajulianapardini@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
});

// Projects navigation
const projectsWrapper = document.querySelector('.projects-wrapper');
const prevButton = document.querySelector('.nav-prev');
const nextButton = document.querySelector('.nav-next');

function updateNavigationButtons() {
    const scrollLeft = projectsWrapper.scrollLeft;
    const maxScroll = projectsWrapper.scrollWidth - projectsWrapper.clientWidth;
    
    prevButton.classList.toggle('hidden', scrollLeft <= 0);
    nextButton.classList.toggle('hidden', scrollLeft >= maxScroll);
}

function scrollProjects(direction) {
    const cardWidth = projectsWrapper.querySelector('.project-card').offsetWidth;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    projectsWrapper.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

prevButton.addEventListener('click', () => scrollProjects('prev'));
nextButton.addEventListener('click', () => scrollProjects('next'));
projectsWrapper.addEventListener('scroll', updateNavigationButtons);

// Initialize navigation buttons on load
window.addEventListener('load', updateNavigationButtons);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    handleScrollAnimation();
});

// Scroll button functionality
const scrollBtn = document.getElementById('scrollDownBtn');
const aboutSection = document.querySelector('section:nth-child(3)'); // About section

scrollBtn.addEventListener('click', () => {
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Hide/show scroll button based on scroll position
const heroSection = document.querySelector('section:first-child');
let lastScrollPosition = 0;

function handleScroll() {
    const currentScrollPosition = window.scrollY;
    const heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    // Add/remove hidden class based on scroll position
    if (currentScrollPosition > heroSectionBottom * 0.5) {
        scrollBtn.classList.add('hidden');
    } else {
        scrollBtn.classList.remove('hidden');
    }
    
    // Update last scroll position
    lastScrollPosition = currentScrollPosition;
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initialize scroll button visibility
handleScroll();