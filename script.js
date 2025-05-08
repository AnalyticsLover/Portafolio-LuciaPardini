// Typing Animation
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

// Initialize typing animation when the page loads
window.addEventListener('load', function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
});

// Language translations
const translations = {
    en: {
        name: "Lucia Pardini",
        title: "Data Analyst",
        about: "About Me",
        about_text_1: "I am Lucía Pardini, a data analyst with a background in professional cooking. A couple of years ago, I hung up my apron and fully immersed myself in the tech world.",
        about_text_2: "My journey, marked by an initial training in gastronomy, taught me to mix precision with creativity: just as a dish requires a balance between flavor and appearance, data analysis demands technical knowledge, design, and an innovative vision... Today I translate data into clear and actionable stories. I specialize in Power BI (certified), and also work with Python, SQL, Tableau, and more.",
        about_text_3: "Currently, I continue to apply the precision of gastronomy to each visualization: a dashboard, like a good dish, must be well balanced, easy to digest... and leave a good impression.",
        skills: "Skills and Competencies",
        projects: "Recent Projects",
        contact: "Contact Me",
        downloadCV: "Download Resume",
        viewCode: "See the code",
        certificates: "Certificates",
        go_to_certificate: "Go to certificate",
        dark_mode_tooltip: "Toggle to dark mode",
        light_mode_tooltip: "Toggle to light mode",
        // Project 1
        project1_title: "Hydrocarbons Dashboard in Argentina",
        project1_description: "Interactive dashboard created in Power BI about the hydrocarbons industry in Argentina, designed to visualize and analyze official data on production, wells, and fractures, obtained from datos.gob.ar.",
        view_code: "View Code",
        view_dashboard: "View Dashboard",
        // Project 2
        project2_title: "Happiness Index",
        project2_description: "Creation of two analytical reports, one private made in PowerBI and another public made with Google Colab, studying the results of more than 150 individuals who took the Oxford Happiness Questionnaire.",
        // Project 3
        project3_title: "Employee Turnover Analysis and Prediction",
        project3_description: "Project that combines exploratory data analysis with machine learning to understand the factors that affect employee turnover. Various Python libraries were used for visual analysis and to develop a classification model capable of predicting employee retention or departure, evaluated with a confusion matrix. Report written in English.",
        // Project 4
        project4_title: "Product Analysis: Fitbit",
        project4_description: "Analysis report of Fitbit product usage data to identify trends and provide recommendations for Bellabeat's marketing strategy. Analytical report written in English.",
        // Project 5
        project5_title: "Sales Dashboard: Local Stores in Japan",
        project5_description: "Cleaning and analysis of data extracted from kaggle.com. Creation of a dashboard made with Python and Streamlit.",
        // Add all other translations here
        sendEmail: "Send Email",
        openEmail: "Open Email Client",
        copyEmail: "Copy Email Address",
        emailCopied: "Email copied to clipboard!",
        copyFailed: "Failed to copy email",
        telegram: "Telegram",
        whatsapp: "WhatsApp"
    },
    es: {
        name: "Lucia Pardini",
        title: "Analista de Datos",
        about: "Sobre mí",
        about_text_1: "Soy Lucía Pardini, analista de datos con pasado en la cocina profesional. Hace un par de años colgué el delantal y me metí de lleno en el mundo tech.",
        about_text_2: "Mi trayectoria, marcada por una formación inicial en gastronomía, me enseñó a mezclar precisión con creatividad: así como un plato requiere equilibrio entre sabor y aspecto, el análisis de datos demanda conocimiento técnico, diseño y una visión innovadora... Hoy traduzco datos en historias claras y accionables. Me especializo en Power BI (certificada), y también trabajo con Python, SQL, Tableau y más.",
        about_text_3: "Actualmente sigo aplicando la precisión de la gastronomía a cada visualización: un dashboard, como un buen plato, debe estar bien balanceado, ser fácil de digerir… y dejar una buena impresión.",
        skills: "Aptitudes y Competencias",
        projects: "Proyectos Recientes",
        contact: "Contáctame",
        downloadCV: "Descargar CV",
        viewCode: "Ver el código",
        certificates: "Certificados",
        go_to_certificate: "Ir a certificado",
        dark_mode_tooltip: "Cambiar a modo oscuro",
        light_mode_tooltip: "Cambiar a modo claro",
        // Project 1
        project1_title: "Dashboard Hidrocarburos en Argentina",
        project1_description: "Dashboard interactivo confeccionado en Power BI sobre la industria de hidrocarburos en Argentina, diseñado para visualizar y analizar datos oficiales de producción, pozos y fracturas, obtenidos de datos.gob.ar.",
        view_code: "Ver código",
        view_dashboard: "Ver Dashboard",
        // Project 2
        project2_title: "Índice de Felicidad",
        project2_description: "Confección de dos reportes analíticos, uno privado realizado en PowerBI y otro publico realizado con Google Colab, estudiando los resultados de mas de 150 individuos que realizaron el Oxford Hapiness Questionnaire.",
        // Project 3
        project3_title: "Análisis y Predicción de Rotacion de Personal",
        project3_description: "Proyecto que combina análisis exploratorio de datos con machine learning para entender los factores que inciden en la rotación de empleados. Se utilizaron diversas librerias de Python para el análisis visual y para desarrollar un modelo de clasificación capaz de predecir la permanencia o salida de un empleado, evaluado con matriz de confusión. Reporte escrito en Inglés.",
        // Project 4
        project4_title: "Análisis de Produto: Fitbit",
        project4_description: "Reporte de análisis de datos de uso de productos de Fitbit para identificar tendencias y proporcionar recomendaciones para la estrategia de marketing de Bellabeat. Reporte analítico escrito en Inglés.",
        // Project 5
        project5_description: "Limpieza y analisis de los datos extraidos de kaggle.com. Elaboracion de un dashboard realizado con pythony stramlit.",
        // Add all other translations here
        sendEmail: "Enviar Email",
        openEmail: "Abrir Cliente de Email",
        copyEmail: "Copiar Dirección de Email",
        emailCopied: "¡Email copiado al portapapeles!",
        copyFailed: "Error al copiar el email",
        telegram: "Telegram",
        whatsapp: "WhatsApp"
    }
};

// Current language state
let currentLang = 'es'; // Default to Spanish

// DOM Elements
const languageToggle = document.getElementById('languageToggle');
const currentLangSpan = document.querySelector('.current-lang');
const languageOptions = document.querySelectorAll('.language-option');

// Initialize language
function initializeLanguage() {
    // Force Spanish as initial language
    currentLang = 'es';
    localStorage.setItem('language', 'es');
    
    // Update UI and content
    updateLanguage(currentLang);
    updateLanguageUI();
}

// Update language
function updateLanguage(lang) {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update certificate tooltips
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.setAttribute('data-tooltip', translations[lang]['go_to_certificate']);
    });

    // Update dark mode toggle tooltip without changing the icon
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        darkModeToggle.title = translations[lang]['light_mode_tooltip'];
    } else {
        darkModeToggle.title = translations[lang]['dark_mode_tooltip'];
    }

    // Save language preference
    localStorage.setItem('language', lang);
    currentLang = lang;
}

// Update language UI elements
function updateLanguageUI() {
    // Update current language display
    currentLangSpan.textContent = currentLang.toUpperCase();
    
    // Update active state of language options
    languageOptions.forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Event Listeners
languageOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        updateLanguage(lang);
        updateLanguageUI();
    });
});

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language first
    initializeLanguage();
    
    // Then initialize theme
    initializeTheme();
    
    // Finally set up scroll animations
    handleScrollAnimation();

    // Scroll to top button functionality
    const progressWrap = document.querySelector('.progress-wrap');
    const progressPath = document.querySelector('.progress-wrap path');
    
    if (progressPath) {
        const pathLength = progressPath.getTotalLength();
        
        // Set initial styles
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

        function updateProgress() {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }

        // Initial update
        updateProgress();

        // Update on scroll
        window.addEventListener('scroll', () => {
            updateProgress();
            
            // Show/hide button based on scroll position
            if (window.scrollY > 50) {
                progressWrap.classList.add('active-progress');
            } else {
                progressWrap.classList.remove('active-progress');
            }
        });

        // Click handler
        progressWrap.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return false;
        });
    }
});

// Dark mode state
let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Initialize theme
function initializeTheme() {
    // Always start with system preference
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply the theme
    if (!isDarkMode) {
        body.classList.add('light-mode');
    }
    
    // Update the icon and tooltip
    updateDarkModeIcon(isDarkMode);
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
        darkModeToggle.title = translations[currentLang]['light_mode_tooltip'];
    } else {
        // In light mode, show moon icon (black)
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        darkModeToggle.title = translations[currentLang]['dark_mode_tooltip'];
    }
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

// Scroll down button functionality
const scrollDownBtn = document.getElementById('scrollDownBtn');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        const aboutSection = document.querySelector('section:nth-of-type(2)');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

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
// languageToggle.addEventListener('click', toggleLanguage); // Temporarily disabled
window.addEventListener('scroll', handleScrollAnimation);

// Email button functionality
const emailButton = document.getElementById('emailButton');
const emailOptions = document.getElementById('emailOptions');
const openEmailBtn = document.getElementById('openEmail');
const copyEmailBtn = document.getElementById('copyEmail');
const emailAddress = 'luciajulianapardini@outlook.com';

// Create toast element
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

// Show toast message
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Toggle email options
emailButton.addEventListener('click', (e) => {
    e.stopPropagation();
    emailOptions.classList.toggle('hidden');
});

// Close options when clicking outside
document.addEventListener('click', (e) => {
    if (!emailOptions.contains(e.target) && e.target !== emailButton) {
        emailOptions.classList.add('hidden');
    }
});

// Open email client
openEmailBtn.addEventListener('click', () => {
    window.location.href = `mailto:${emailAddress}`;
    emailOptions.classList.add('hidden');
});

// Copy email to clipboard
copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
        showToast(translations[currentLang]['emailCopied'] || 'Email copied to clipboard!');
        emailOptions.classList.add('hidden');
    }).catch(() => {
        showToast(translations[currentLang]['copyFailed'] || 'Failed to copy email');
    });
});



function scrollProjects(direction) {
    const cardWidth = projectsWrapper.querySelector('.project-card').offsetWidth;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    projectsWrapper.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}



// Hide/show scroll button based on scroll position
const heroSection = document.querySelector('section:first-child');
let lastScrollPosition = 0;





