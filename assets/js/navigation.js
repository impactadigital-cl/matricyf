/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Navigation Component
 * 
 * Navbar, mobile menu, parallax y scroll behavior
 * ============================================================
 */

(function() {
    'use strict';

    // Referencias a elementos DOM
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const parallaxBg = document.querySelector('.parallax-bg img');

    let lastScroll = 0;
    let ticking = false;

    /**
     * Maneja la visibilidad del navbar al hacer scroll
     */
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.remove('opacity-0', '-translate-y-full');
            navbar.classList.add('opacity-100', 'translate-y-0');
        } else {
            navbar.classList.add('opacity-0', '-translate-y-full');
            navbar.classList.remove('opacity-100', 'translate-y-0');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    /**
     * Scroll handler con requestAnimationFrame para performance
     */
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(handleNavbarScroll);
            ticking = true;
        }
    }

    /**
     * Efecto parallax suave en el hero
     */
    function handleParallax() {
        if (!parallaxBg) return;

        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            const translateY = scrolled * 0.3;
            parallaxBg.style.transform = `scale(1.1) translateY(${translateY}px)`;
        }
    }

    /**
     * Abre el menú móvil
     */
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }

    /**
     * Cierra el menú móvil
     */
    function closeMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    /**
     * Inicializa todos los event listeners
     */
    function initNavigation() {
        // Navbar scroll
        window.addEventListener('scroll', onScroll, { passive: true });

        // Parallax
        window.addEventListener('scroll', handleParallax, { passive: true });

        // Mobile menu
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', openMobileMenu);
        }

        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', closeMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar menú al hacer click fuera
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });

        // Cerrar menú con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        });

        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Ajuste para navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();
