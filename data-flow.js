class DataFlowAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isDarkMode = document.body.classList.contains('dark-mode');
        this.isVisible = true;
        
        // Configuration
        this.dataPoints = [];
        this.flowLines = [];
        this.maxPoints = 30;
        this.pointSize = 3;
        this.lineWidth = 1;
        this.flowSpeed = 0.5;
        
        // Colors
        this.colors = {
            dark: {
                point: '#4FD1C5',
                line: '#2C7A7B',
                highlight: '#81E6D9'
            },
            light: {
                point: '#2C7A7B',
                line: '#4FD1C5',
                highlight: '#319795'
            }
        };

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
        this.resize();
        this.createInitialPoints();
        
        // Add event listeners
        window.addEventListener('resize', this.resize);
        window.addEventListener('scroll', this.checkVisibility);
        document.getElementById('darkModeToggle').addEventListener('click', this.updateTheme);

        // Start animation
        this.animate();
    }

    createInitialPoints() {
        for (let i = 0; i < this.maxPoints; i++) {
            this.dataPoints.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.flowSpeed,
                vy: (Math.random() - 0.5) * this.flowSpeed,
                size: this.pointSize,
                alpha: Math.random() * 0.5 + 0.5
            });
        }
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
            }
        }
    }

    updateTheme() {
        setTimeout(() => {
            this.isDarkMode = document.body.classList.contains('dark-mode');
        }, 100);
    }

    drawDataPoint(point) {
        const colors = this.isDarkMode ? this.colors.dark : this.colors.light;
        
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.point;
        this.ctx.globalAlpha = point.alpha;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }

    drawFlowLine(point1, point2) {
        const colors = this.isDarkMode ? this.colors.dark : this.colors.light;
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(point1.x, point1.y);
            this.ctx.lineTo(point2.x, point2.y);
            this.ctx.strokeStyle = colors.line;
            this.ctx.globalAlpha = 0.2 * (1 - distance / 100);
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }
    }

    animate() {
        if (!this.isVisible) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw data points
        this.dataPoints.forEach((point, index) => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;

            // Bounce off edges
            if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;

            // Draw point
            this.drawDataPoint(point);

            // Draw connections
            for (let j = index + 1; j < this.dataPoints.length; j++) {
                this.drawFlowLine(point, this.dataPoints[j]);
            }
        });

        requestAnimationFrame(this.animate.bind(this));
    }

    destroy() {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('scroll', this.checkVisibility);
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dataFlowCanvas');
    if (canvas) {
        window.dataFlowAnimation = new DataFlowAnimation(canvas);
    }
}); 