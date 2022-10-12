import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function initSwipers() {
  let layoutsSwiper;
  let amenitiesSwiper;
  let stepsSwiper;

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
  
  amenitiesSwiper = new Swiper(`.amenities__swiper`, {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    effect: 'fade',
    pagination: {
      el: '.amenities__swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.amenities__swiper-next',
      prevEl: '.amenities__swiper-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true,
  });
  
  stepsSwiper = new Swiper(`.steps__swiper`, {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    effect: "fade",
    pagination: {
      el: '.steps__swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.steps__swiper-next',
      prevEl: '.steps__swiper-prev',
    },
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centerMode: true,
  });
}

export default initSwipers;