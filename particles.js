class ParticleAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationFrameId = null;
        this.isDarkMode = document.body.classList.contains('light-mode') ? false : true;
        this.isVisible = true;
        
        // Configuration
        this.particleCount = 50;
        this.particleColor = this.isDarkMode ? '#ccc' : '#444';
        this.particleSize = 2;
        this.particleSpeed = 0.5;
        this.connectionDistance = 100;
        this.connectionOpacity = 0.2;

        // Bind methods
        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
        this.resize = this.resize.bind(this);
        this.updateTheme = this.updateTheme.bind(this);
        this.checkVisibility = this.checkVisibility.bind(this);

        // Initialize
        this.init();
    }

    init() {
        // Set initial canvas size
        this.resize();

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.particleSpeed,
                vy: (Math.random() - 0.5) * this.particleSpeed
            });
        }

        // Add event listeners
        window.addEventListener('resize', this.resize);
        window.addEventListener('scroll', this.checkVisibility);
        document.getElementById('darkModeToggle').addEventListener('click', this.updateTheme);

        // Start animation
        this.animate();
    }

    resize() {
        const heroSection = this.canvas.parentElement;
        this.canvas.width = heroSection.offsetWidth;
        this.canvas.height = heroSection.offsetHeight;
    }

    checkVisibility() {
        const heroSection = this.canvas.parentElement;
        const rect = heroSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView !== this.isVisible) {
            this.isVisible = isInView;
            if (this.isVisible) {
                this.animate();
            } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                if (this.animationFrameId) {
                    cancelAnimationFrame(this.animationFrameId);
                    this.animationFrameId = null;
                }
            }
        }
    }

    updateTheme() {
        // Wait for the theme class to be applied
        setTimeout(() => {
            this.isDarkMode = document.body.classList.contains('light-mode') ? false : true;
            this.particleColor = this.isDarkMode ? '#ccc' : '#444';
        }, 100);
    }

    animate() {
        if (!this.isVisible) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, this.particleSize, 0, Math.PI * 2);
            this.ctx.fillStyle = this.particleColor;
            this.ctx.fill();

            // Draw connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const dx = particle.x - this.particles[j].x;
                const dy = particle.y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `${this.particleColor}${Math.floor(this.connectionOpacity * 255).toString(16).padStart(2, '0')}`;
                    this.ctx.stroke();
                }
            }
        });

        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('scroll', this.checkVisibility);
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        window.particleAnimation = new ParticleAnimation(canvas);
    }
}); 