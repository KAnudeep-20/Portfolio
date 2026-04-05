/* ========================================
   NEURAL NETWORK ANIMATION (SIGNATURE ELEMENT)
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neural-bg');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    this.x -= dx * 0.01;
                    this.y -= dy * 0.01;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 170, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 160) {
                    const opacity = (1 - dist / 160) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 170, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        resize();
        init();
    });
});

/* ========================================
   SCROLL REVEAL
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
});

/* ========================================
   SKILL BAR ANIMATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const fills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
});

/* ========================================
   NAVIGATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });
});

/* ========================================
   CUSTOM CURSOR
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const ring = document.querySelector('.cursor-ring');

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
        });

        const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .contact-item, .tag');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });
    }
});

/* ========================================
   SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ========================================
   ACTIVE NAV HIGHLIGHT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}`
                        ? 'var(--accent)'
                        : '';
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
});
