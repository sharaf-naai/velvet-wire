document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor Implementation ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const navItems = document.querySelectorAll('a, button, .project-item');

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-active');
        });
        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active');
        });
    });


    // --- 2. Scroll Trigger Animations ---
    const scrollBlocks = document.querySelectorAll('.scroll-block');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollBlocks.forEach(block => {
        scrollObserver.observe(block);
    });
});