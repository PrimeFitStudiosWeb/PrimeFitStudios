(function () {
    'use strict';

    // Intro / preloader sequence
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            document.body.classList.remove('is-loading');
            document.body.classList.add('is-revealed');
            preloader.remove();
        } else {
            // Total intro: 0.2s delay + 1.6s logo in + 1.0s hold + 1.2s fade out = 4.0s
            const REVEAL_AT = 2800;   // matches start of preloader fade-out
            const REMOVE_AT = 4050;   // just after preloader fade-out completes
            window.setTimeout(() => {
                document.body.classList.remove('is-loading');
                document.body.classList.add('is-revealed');
            }, REVEAL_AT);
            window.setTimeout(() => {
                if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, REMOVE_AT);
        }
    } else {
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-revealed');
    }

    // Mobile nav
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        });
        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Sticky header style on scroll
    const header = document.getElementById('siteHeader');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Quote form (front-end stub — wire to your endpoint of choice)
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = 'Sent — We\'ll Be In Touch';
            btn.disabled = true;
            setTimeout(() => {
                form.reset();
                btn.textContent = original;
                btn.disabled = false;
            }, 3500);
        });
    }
})();
