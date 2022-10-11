import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function initSwipers() {
  let layoutsSwiper;

  layoutsSwiper = new Swiper(`.layouts__swiper`, {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.layouts__swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.layouts__swiper-next',
      prevEl: '.layouts__swiper-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true,
  });
}

export default initSwipers;