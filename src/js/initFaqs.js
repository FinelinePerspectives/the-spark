function initFaqs() {
    const faqBtns = document.querySelectorAll('.btn-faq');
    const faqItems = document.querySelectorAll('.faq__item');

        faqBtns.forEach(btn => btn.addEventListener('click', () => {
            const selectedSection = btn.getAttribute('data-faq');
    
            const selectedBtn = document.querySelector(`.btn-faq[data-faq='${selectedSection}']`);
            const selectedFaqSection = document.querySelector(`.faq__section[data-faq='${selectedSection}']`);
            const isActive = btn.classList.contains('active');
    
            if (!isActive) {
                const sectionItems = selectedFaqSection.querySelectorAll('.faq__item');
                sectionItems.forEach((item, i) => {
                    item.classList.remove('active')
                });
                sectionItems[0].classList.add('active');

                const activeBtn = document.querySelector('.btn-faq.active');
                const activeFaqSection = document.querySelector('.faq__section.active');
    
                activeBtn.classList.remove('active');
                activeFaqSection.classList.remove('active');
    
                selectedBtn.classList.add('active');
                selectedFaqSection.classList.add('active');
            }
        }));

        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedFaq = item;
                const isActive = item.classList.contains('active');

                if (!isActive) {
                    faqItems.forEach(item => item.classList.remove('active'));
                    selectedFaq.classList.add('active');
                }
            })
        })
}

export default initFaqs;