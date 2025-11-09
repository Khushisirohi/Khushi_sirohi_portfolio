// Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    const cursorGlow = document.querySelector('.cursor-glow');
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Clickable Cards Expansion
document.querySelectorAll('.clickable').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
        
        // Animate skill bars when skills card is expanded
        if (this.classList.contains('skills-card') && this.classList.contains('expanded')) {
            setTimeout(() => {
                animateSkillBars();
            }, 300);
        }
    });
});

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', progress + '%');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.bento-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    lastScroll = scrolled;
});

// Add hover sound effect (visual feedback)
document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Glitch effect on hover for hero card
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
    heroCard.addEventListener('mouseenter', () => {
        const glitch = document.querySelector('.glitch');
        glitch.style.animation = 'glitch 0.3s infinite';
    });
    
    heroCard.addEventListener('mouseleave', () => {
        const glitch = document.querySelector('.glitch');
        glitch.style.animation = 'glitch 2s infinite';
    });
}

// Random floating animation for decorative elements
function randomFloat() {
    const elements = document.querySelectorAll('.float-element');
    elements.forEach(el => {
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        el.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

setInterval(randomFloat, 3000);

// Smooth scroll for any anchor links
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

// Add entrance animation on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger skill bar animation if skills card is already expanded
    const skillsCard = document.querySelector('.skills-card');
    if (skillsCard && skillsCard.classList.contains('expanded')) {
        setTimeout(() => {
            animateSkillBars();
        }, 500);
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.bento-card.expanded').forEach(card => {
            card.classList.remove('expanded');
        });
    }
});

// Resume Download Handlers - Enhanced with visual feedback
document.addEventListener('DOMContentLoaded', () => {
    const pdfButton = document.getElementById('download-pdf');
    const docxButton = document.getElementById('download-docx');
    
    // Add download animation feedback
    [pdfButton, docxButton].forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // If file doesn't exist, the browser will show 404
                // The download attribute will still attempt to download
            });
        }
    });
});

// Add particle effect on click
document.addEventListener('click', (e) => {
    if (e.target.closest('.bento-card')) {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-magenta)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx * 0.1;
            posY += vy * 0.1;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

