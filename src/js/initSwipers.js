import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function initSwipers() {
  let homebuildingSwiper;
  let testimonialsSwiper;
  let residentialSwiper;
  let commercialGallery;
  let agricultureGallery;

  homebuildingSwiper = new Swiper(`.homebuilding__swiper`, {
    slidesPerView: 'auto',
    spaceBetween: 25,
    loop: true,
    pagination: {
      el: '.homebuilding__swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.homebuilding__swiper-next',
      prevEl: '.homebuilding__swiper-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true,
    breakpoints: {
      1450: {
        centeredSlides: false,
        loop: false,
        centerMode: false,

      }
    }
  });
  
  testimonialsSwiper = new Swiper(`.testimonials__swiper`, {
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      autoWidth: true,
      pagination: {
        el: '.testimonials__swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.testimonials__swiper-next',
        prevEl: '.testimonials__swiper-prev',
      },
      modules: [Navigation, Pagination],
      centeredSlides: true,
  });

  residentialSwiper = new Swiper('.residential__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 25,
    loop: true,
    autoWidth: true,
    pagination: {
        el: '.gallery__swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-slide-next',
        prevEl: '.swiper-slide-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true
});

commercialGallery = new Swiper('.commercial__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 25,
    loop: true,
    autoWidth: true,
    pagination: {
        el: '.gallery__swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-slide-next',
        prevEl: '.swiper-slide-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true
});

agricultureGallery = new Swiper('.agriculture__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 25,
    loop: true,
    autoWidth: true,
    pagination: {
        el: '.gallery__swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-slide-next',
        prevEl: '.swiper-slide-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true,
});

const swipers = [
  homebuildingSwiper,
  testimonialsSwiper,
  residentialSwiper,
  commercialGallery,
  agricultureGallery,
]

window.addEventListener('load', () => {
  swipers.forEach(swiper => {
    if (window.innerWidth <= 768) {
      swiper.cssMode = true
    } else {
      swiper.cssMode = false    
    }
      swiper.init();
    });
});

window.addEventListener('resize', () => {
  swipers.forEach(swiper => {
    if (window.innerWidth <= 768) {
      swiper.cssMode = true
    } else {
      swiper.cssMode = false    
    }
      swiper.init();
    });
  });
}

export default initSwipers;