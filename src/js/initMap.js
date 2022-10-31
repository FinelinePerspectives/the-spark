import Swiper, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import mapItems from './mapItems';
import mapIcon from '../assets/svg/mapIcon.svg';
const mapLegend = document.querySelector('#mapLegend');

const allMapItems = [];
let currentMapItems = [];
let map;
let prevInfoWindow;

mapItems.forEach(cat => {
    cat.items.forEach(i => {
        i.category = cat.name;
        allMapItems.push(i);
    });
});

function initGoogleMap() {
		let mapCentre = {lat: 45.4314337, lng: -75.6654839};
        map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 14,
          styles: [
{
"elementType": "geometry",
"stylers": [
    {
    "color": "#f5f5f5"
    }
]
},
{
"elementType": "labels.icon",
"stylers": [
    {
    "visibility": "off"
    }
]
},
{
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#616161"
    }
]
},
{
"elementType": "labels.text.stroke",
"stylers": [
    {
    "color": "#f5f5f5"
    }
]
},
{
"featureType": "administrative.land_parcel",
"stylers": [
    {
    "visibility": "off"
    }
]
},
{
"featureType": "administrative.land_parcel",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#bdbdbd"
    }
]
},
{
"featureType": "administrative.neighborhood",
"stylers": [
    {
    "visibility": "off"
    }
]
},
{
"featureType": "poi",
"elementType": "geometry",
"stylers": [
    {
    "color": "#eeeeee"
    }
]
},
{
"featureType": "poi",
"elementType": "labels.text",
"stylers": [
    {
    "visibility": "off"
    }
]
},
{
"featureType": "poi",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#757575"
    }
]
},
{
"featureType": "poi.park",
"elementType": "geometry",
"stylers": [
    {
    "color": "#e5e5e5"
    }
]
},
{
"featureType": "poi.park",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#9e9e9e"
    }
]
},
{
"featureType": "road",
"elementType": "geometry",
"stylers": [
    {
    "color": "#ffffff"
    }
]
},
{
"featureType": "road",
"elementType": "labels",
"stylers": [
    {
    "visibility": "off"
    }
]
},
{
"featureType": "road.arterial",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#757575"
    }
]
},
{
"featureType": "road.highway",
"elementType": "geometry",
"stylers": [
    {
    "color": "#dadada"
    }
]
},
{
"featureType": "road.highway",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#616161"
    }
]
},
{
"featureType": "road.local",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#9e9e9e"
    }
]
},
{
"featureType": "transit.line",
"elementType": "geometry",
"stylers": [
    {
    "color": "#e5e5e5"
    }
]
},
{
"featureType": "transit.station",
"elementType": "geometry",
"stylers": [
    {
    "color": "#eeeeee"
    }
]
},
{
"featureType": "water",
"elementType": "geometry",
"stylers": [
    {
    "color": "#c9c9c9"
    }
]
},
{
"featureType": "water",
"elementType": "labels.text",
"stylers": [
    {
    "visibility": "off"
    }
]
},
{
"featureType": "water",
"elementType": "labels.text.fill",
"stylers": [
    {
    "color": "#9e9e9e"
    }
]
}
          ],
          center: mapCentre,
          disableDefaultUI: true
        });
       }

function renderMapMarkers(filter, map) { 
    if (currentMapItems !== []) currentMapItems.forEach(marker => marker.setMap(null));

    const icon = {
        url: mapIcon,
        size: new google.maps.Size(25, 25),
        scaledSize: new google.maps.Size(25, 25)
    };

    const items = allMapItems.filter(item => item.category == filter);
    let legendItems = '';

    items.forEach((item, i) => {
        const legendItem = `<li class="mapItem__trigger" data-id="${item.id}">${item.title}</li>`;
        legendItems += legendItem;

        let infoWindow = new google.maps.InfoWindow({ content: '' });
        const infoWindowContent = returnMapItemPopup(item);

        const latLng = { lat: item.coords.lat, lng: item.coords.lng };

        let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: item.title,
            draggable: false,
            padding: '10px',
            icon: icon,
            zIndex: 8,
            id: item.id,
            label:{
                text: `${i + 1}`,
                color: 'white',
                fontFamily: 'Poppins Semi Bold',
            },
        })

        google.maps.event.addListener(marker, 'click', function() {
            if (prevInfoWindow) prevInfoWindow.close();

            const latLng = marker.getPosition();
            map.setCenter(latLng);
            infoWindow.close();
            infoWindow.setContent(infoWindowContent);
            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: true
            })

            prevInfoWindow = infoWindow;
        })

        google.maps.event.addListener(map, 'click', function() {
            infoWindow.close();
        })

        currentMapItems.push(marker);
        mapLegend.innerHTML = legendItems;

        const currentMapTriggers = document.querySelectorAll('.mapItem__trigger');
        currentMapTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const id = trigger.getAttribute('data-id');
                const marker = currentMapItems.filter(marker => marker.id == id)[0];
                new google.maps.event.trigger(marker, 'click');
        
            })
        })
    });
}

function initMapButtons() {
    const btns = document.querySelectorAll('.map__controls--btn');

    btns.forEach(btn => btn.addEventListener('click', (e) => {
        const selectedCategory = btn.getAttribute('data-category');

        const selectedBtn = document.querySelector(`.map__controls--btn[data-category='${selectedCategory}']`);
        const selectedMapSwiper = document.querySelector(`.map__swiper[data-category='${selectedCategory}']`);
        const isActive = btn.classList.contains('active');

        if (!isActive) {
            const activeBtn = document.querySelector('.map__controls--btn.active');
            const activeMapSwiper = document.querySelector('.map__swiper.active');

            activeBtn.classList.remove('active');
            activeMapSwiper.classList.remove('active');

            selectedBtn.classList.add('active');
            selectedMapSwiper.classList.add('active');

            renderMapMarkers(selectedCategory, map);
        }
    }));
}

function returnMapItemSlide(item) {
    return  `<div class="swiper-slide">
    <div class="mapCard">
      <div class="mapCard__header">
        <p>${item.title}</p>
      </div>

      <a href="https://maps.google.ca/?q=${item.coords.lat},${item.coords.lng}" target="_blank">
          <div class="mapCard__image">
              <img src="${item.image}" alt="${item.title}" />
          </div>
      </a>

      <div class="mapCard__info">
        <div class="mapCard__time" data-transportation="walk">
          <div
            class="mapCard__time--icon"
            data-transportation="walk"
          ></div>
          <span>${item.walkTime}min</span>
        </div>
        <div class="mapCard__time" data-transportation="bike">
          <div
            class="mapCard__time--icon"
            data-transportation="bike"
          ></div>
          <span>${item.bikeTime}min</span>
        </div>
        <div class="mapCard__time" data-transportation="car">
          <div
            class="mapCard__time--icon"
            data-transportation="car"
          ></div>
          <span>${item.driveTime}min</span>
        </div>
      </div>
    </div>
  </div>`;
}

function returnMapItemPopup(item) {
    return  `<div class="swiper-slide">
    <div class="mapCardPopup">
      <div class="mapCardPopup__header">
        <p>${item.title}</p>
      </div>

      <a href="https://maps.google.ca/?q=${item.coords.lat},${item.coords.lng}" target="_blank">
          <div class="mapCardPopup__image">
              <img src="${item.image}" alt="${item.title}" />
          </div>
      </a>

      <div class="mapCardPopup__info">
        <div class="mapCardPopup__time" data-transportation="walk">
          <div
            class="mapCardPopup__time--icon"
            data-transportation="walk"
          ></div>
          <span>${item.walkTime}min</span>
        </div>
        <div class="mapCardPopup__time" data-transportation="bike">
          <div
            class="mapCardPopup__time--icon"
            data-transportation="bike"
          ></div>
          <span>${item.bikeTime}min</span>
        </div>
        <div class="mapCardPopup__time" data-transportation="car">
          <div
            class="mapCardPopup__time--icon"
            data-transportation="car"
          ></div>
          <span>${item.driveTime}min</span>
        </div>
      </div>
    </div>
  </div>`;
}

function initMapSwipers() {
    const mapSwipers = ['restaurants', 'shopping', 'lifestyle', 'parks', 'transit'];

    mapSwipers.forEach(swiper => {
        const swiperContainer = document.querySelector(`.${swiper}__swiper`);

        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');

        let slides = '';
        const items = mapItems.filter(cat => cat.name === swiper)[0].items;
        items.forEach(item => {
            const slide = returnMapItemSlide(item);
            slides += slide;
        });

        swiperWrapper.innerHTML = slides;

        const swiperPrev = document.createElement('div');
        swiperPrev.classList.add('map__swiper-prev');
        swiperPrev.classList.add(`${swiper}__swiper-prev`);

        const swiperNext = document.createElement('div');
        swiperNext.classList.add('map__swiper-next');
        swiperNext.classList.add(`${swiper}__swiper-next`);
        
        swiperContainer.appendChild(swiperWrapper);
        swiperContainer.appendChild(swiperPrev);
        swiperContainer.appendChild(swiperNext);
    })

    mapSwipers.forEach(swiper => {
        return new Swiper(`.${swiper}__swiper`, {
            slidesPerView: "auto",
            spaceBetween: 10,
            loop: true,
            navigation: {
              nextEl: `.${swiper}__swiper-next`,
              prevEl: `.${swiper}__swiper-prev`,
            },
            modules: [Navigation],
            centeredSlides: true,
            centerMode: true,
          });
    });
}

function initMap() {
    initMapButtons();
    initGoogleMap();
    renderMapMarkers('restaurants', map);
    initMapSwipers();
}

export default initMap;