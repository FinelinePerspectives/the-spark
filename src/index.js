import './styles/main.scss';
import 'fslightbox';

import initNav from './js/initNav';
import initTimeline from './js/intiTimeline';
import initSwipers from './js/initSwipers';
import initMap from './js/initMap';
import initContactForm from './js/initContactForm';
import initFaqs from './js/initFaqs';
import onePageNav from './js/onePageNav';
import './js/rhenti'

$('#onePageNav').onePageNav({
	currentClass: 'active',
	changeHash: false,
	scrollSpeed: 100,
	scrollThreshold: 0.5,
	filter: '',
	easing: 'swing',
});

$('#onePageNavMobile').onePageNav({
	currentClass: 'active',
	changeHash: false,
	scrollSpeed: 100,
	scrollThreshold: 0.5,
	filter: '',
	easing: 'swing',
});

initNav();
initTimeline();
initSwipers();
initMap();
initFaqs();
initContactForm();