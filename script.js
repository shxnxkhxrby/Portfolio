// Matrix Rain Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Video Intro with Static Glitch
const videoScreen = document.getElementById('video-screen');
const introVideo = document.getElementById('intro-video');
const mainContent = document.getElementById('main-content');

function triggerGlitchAndTransition() {
    introVideo.pause();
    videoScreen.classList.add('freeze-frame');
    
    const staticNoise = document.createElement('div');
    staticNoise.className = 'static-noise';
    videoScreen.appendChild(staticNoise);
    
    const grainNoise = document.createElement('div');
    grainNoise.className = 'grain-noise';
    videoScreen.appendChild(grainNoise);
    
    setTimeout(() => {
        videoScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('content-glitch-in');
        animateSkills();
    }, 800);
}

introVideo.addEventListener('ended', triggerGlitchAndTransition);
videoScreen.addEventListener('click', triggerGlitchAndTransition);
introVideo.addEventListener('error', () => {
    videoScreen.style.display = 'none';
    mainContent.style.display = 'block';
    mainContent.classList.add('content-glitch-in');
    animateSkills();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = document.querySelector('#mobile-menu-btn i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// Mobile Menu Toggle - Enhanced with Icon Change
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Change icon between bars and times
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Animate Skills on Scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#0f0';
    });
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(0, 255, 0, 0.3)';
    });
});

// Add hover effects to certificate cards
const certCards = document.querySelectorAll('.cert-card');
certCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#0f0';
    });
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(0, 255, 0, 0.3)';
    });
});
