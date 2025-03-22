// Particle animation
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = '#00ff9d';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particlesArray = [];
let animationId;

function initCanvas() {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.appendChild(canvas);
    canvas.width = particlesContainer.offsetWidth;
    canvas.height = particlesContainer.offsetHeight;

    // Create initial particles
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
        
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            
            // Add new particle
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
        }
    }
    
    animationId = requestAnimationFrame(animate);
}

// Initialize canvas and start animation
window.addEventListener('load', () => {
    initCanvas();
    animate();
});

// Handle window resize
window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    initCanvas();
    animate();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize Botpress webchat
window.addEventListener('load', () => {
    // Wait for Botpress to be ready
    const checkBotpress = setInterval(() => {
        if (window.botpress && typeof window.botpress.init === 'function') {
            clearInterval(checkBotpress);
            
            // Initialize the webchat
            window.botpress.init();
            
            // Add click handler for chat button
            document.getElementById('startChat').addEventListener('click', () => {
                if (window.botpressWebChat && typeof window.botpressWebChat.sendEvent === 'function') {
                    window.botpressWebChat.sendEvent({ type: 'show' });
                }
            });
        }
    }, 100);
});