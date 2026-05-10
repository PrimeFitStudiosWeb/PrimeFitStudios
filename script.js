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
            // Total intro: 0.2s delay + 3.6s logo in/hold/out + 1.2s overlay fade = 5.0s
            const REVEAL_AT = 3800;   // matches start of preloader fade-out
            const REMOVE_AT = 5050;   // just after preloader fade-out completes
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
    const drawer = document.getElementById('mobileNav');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const setNav = (open) => {
        if (!drawer) return;
        drawer.classList.toggle('is-open', open);
        if (backdrop) backdrop.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-open', open);
        if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    };
    if (toggle && drawer) {
        toggle.addEventListener('click', () => {
            setNav(!drawer.classList.contains('is-open'));
        });
        drawer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => setNav(false));
        });
        if (backdrop) backdrop.addEventListener('click', () => setNav(false));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setNav(false);
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
