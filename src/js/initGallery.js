function initGallery() {
    const galleryCheckboxes = document.querySelectorAll('.gallery__checkbox');
    const galleries = document.querySelectorAll('.gallery');

    galleryCheckboxes.forEach(chk => {
        chk.addEventListener('click', (e) => {
            const selectedCategory = chk.getAttribute('data-gallery');
            const input = chk.querySelector('input');

            if (!input.checked) {
                e.preventDefault();
            } else {
                galleryCheckboxes.forEach(chk => {
                    const input = chk.querySelector('input');
                    input.checked = false;
                })

                input.checked = true;

                galleries.forEach(gallery => {
                    const galleryCategory = gallery.getAttribute('data-gallery');
                    if (selectedCategory !== galleryCategory) {
                        gallery.classList.remove('active');
                    } else {
                        gallery.classList.add('active'); 
                    }
                })
            }
        })
    })
}

export default initGallery;