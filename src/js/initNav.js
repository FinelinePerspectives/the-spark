function initNav() {
    const body = document.querySelector('body');
    const nav = document.querySelector('nav');
    const navWrapper = document.querySelector('#navWrapper');
    const navSecondary = document.querySelector('#navSecondary');
    const navToggle = document.querySelector('#navToggle');
    const navMobile = document.querySelector('.navMobile');
    const navMobileOverlay = document.querySelector('.navMobile__overlay');
    const navMobileItems = document.querySelectorAll('.navMobile__item');

    const desktopTrigger = document.querySelector('#hero').getBoundingClientRect().bottom + 80;
    const mobileTrigger = document.querySelector('.hero__bg--mobile').getBoundingClientRect().bottom;

    function initNavSticky() {
        let trigger = window.innerWidth <= 1024 ? mobileTrigger : desktopTrigger;

        if (window.scrollY >= trigger) {
            body.classList.add('navMargin');
            nav.classList.add('sticky');
            navWrapper.classList.add('sticky');
            navSecondary.classList.add('sticky');
        } else {
            body.classList.remove('navMargin');
            nav.classList.remove('sticky');
            navWrapper.classList.remove('sticky');
            navSecondary.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', initNavSticky);

    function openMenu() {
        body.classList.add('noscroll');
        navWrapper.classList.add('mobileSticky');
        navMobile.classList.add('active');
        navToggle.classList.add('active');
        navMobileOverlay.classList.add('active');
    }

    function closeMenu() {
        body.classList.remove('noscroll');
        navWrapper.classList.remove('mobileSticky');
        navMobile.classList.remove('active');
        navToggle.classList.remove('active');
        navMobileOverlay.classList.remove('active');
    }

    function initNavMobile() {
        if (navMobile.classList.contains('active')) {
         closeMenu();
        } else {
            openMenu();
        }
    }

    navToggle.addEventListener('click', initNavMobile);
    navMobileOverlay.addEventListener('click', closeMenu);
    navMobileItems.forEach(item => {item.addEventListener('click', closeMenu)})
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    });

    initNavSticky();
}

export default initNav;