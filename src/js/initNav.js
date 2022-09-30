function initNav() {
    const mobileNavToggle = document.querySelector('.nav__toggle');
    const mobileNavContent = document.querySelector('.nav__content--mobile');
    const navCloseTriggers = document.querySelectorAll('.nav__close');

    function toggleMobileNav() {
        if (mobileNavContent.classList.contains('active')) {
            mobileNavToggle.classList.remove('active');
            mobileNavContent.classList.add('navFadeOut');
            setTimeout(() => {
                mobileNavContent.classList.remove('active');
                mobileNavContent.classList.remove('navFadeOut');
            }, 150)
        } else {
            mobileNavToggle.classList.add('active')
            mobileNavContent.classList.add('active')
        }
    }

    mobileNavToggle.addEventListener('click', () => toggleMobileNav());
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280 && mobileNavContent.classList.contains('active')) {
            toggleMobileNav();
        }
    });
    navCloseTriggers.forEach(item => item.addEventListener('click', () => toggleMobileNav()));
}

export default initNav;