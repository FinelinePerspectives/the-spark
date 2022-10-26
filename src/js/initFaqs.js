function initFaqs() {
    const faqBtns = document.querySelectorAll('.btn-faq');

        faqBtns.forEach(btn => btn.addEventListener('click', (e) => {
            const selectedFaq = btn.getAttribute('data-faq');
    
            const selectedBtn = document.querySelector(`.btn-faq[data-faq='${selectedFaq}']`);
            const selectedFaqSection = document.querySelector(`.faq__section[data-faq='${selectedFaq}']`);
            const isActive = btn.classList.contains('active');
    
            if (!isActive) {
                const activeBtn = document.querySelector('.btn-faq.active');
                const activeFaqSection = document.querySelector('.faq__section.active');
    
                activeBtn.classList.remove('active');
                activeFaqSection.classList.remove('active');
    
                selectedBtn.classList.add('active');
                selectedFaqSection.classList.add('active');
            }
        }));
}

export default initFaqs;