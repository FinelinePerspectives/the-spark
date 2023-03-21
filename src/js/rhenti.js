import 'regenerator-runtime/runtime'
import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  { id: 'The Spark floorplans', url: 'https://thesparkapartments.ca/floorplans/suite-01.jpg', walkInCloset: false, terrace: false, balcony: true, barrierFree: true,  ensuite: false },
  { id: 'The Spark floorplans 2', url: 'https://thesparkapartments.ca/floorplans/suite-02.jpg', walkInCloset: true, terrace: false, balcony: true, barrierFree: false,  ensuite: true },
  { id: 'The Spark floorplans 3' ,url: 'https://thesparkapartments.ca/floorplans/suite-03.jpg', walkInCloset: true, terrace: false, balcony: true, barrierFree: false,  ensuite: false },
  { id: 'The Spark floorplans 4' ,url: 'https://thesparkapartments.ca/floorplans/suite-04.jpg', walkInCloset: true, terrace: false, balcony: true, barrierFree: false,  ensuite: true },
  { id: 'The Spark floorplans 5', url: 'https://thesparkapartments.ca/floorplans/suite-05-1.jpg', walkInCloset: false, terrace: false, balcony: false, barrierFree: true,  ensuite: false },
  { id: 'The Spark floorplans 6', url: 'https://thesparkapartments.ca/floorplans/suite-05-2.jpg', walkInCloset: false, terrace: false, balcony: false, barrierFree: true,  ensuite: false },
  { id: 'The Spark floorplans 7', url: 'https://thesparkapartments.ca/floorplans/suite-06.jpg', walkInCloset: true, terrace: false, balcony: false, barrierFree: false,  ensuite: false },
  { id: 'The Spark floorplans 8', url: 'https://thesparkapartments.ca/floorplans/suite-07.jpg', walkInCloset: true, terrace: false, balcony: false, barrierFree: false,  ensuite: true },
  { id: 'The Spark floorplans 9', url: 'https://thesparkapartments.ca/floorplans/suite-08.jpg', walkInCloset: true, terrace: true, balcony: false, barrierFree: false,  ensuite: true },
  { id: 'The Spark floorplans 10', url: 'https://thesparkapartments.ca/floorplans/suite-902.jpg', walkInCloset: false, terrace: true, balcony: false, barrierFree: false,  ensuite: false },
  { id: 'The Spark floorplans 11', url: 'https://thesparkapartments.ca/floorplans/suite-903.jpg', walkInCloset: false, terrace: true, balcony: false, barrierFree: false,  ensuite: false },
];

export const rhentiUrl = 'https://www.thesparkapartments.ca/php/listings.php';

export const filterRhentiListings = (arr, filter) => {
    const items = arr.Feed.Properties.filter(p => p.BuildingName === "353 Gardner Street",);
    const newArr = items.map(listing => parseRhentiListing(listing));
    return newArr;
}

export const parseRhentiListing = (listing) => {
    const rhentiId = listing.PropertyId;
    const hasAmenity = (str) => listing.UnitDetails.Amenities.filter(a => a.name === str).length > 0;
    const imageRef = images.find(img => img.id === rhentiId) || "N/A";
    let imageUrl;
    if (imageRef !== "N/A") {
        imageUrl = `https://thesparkapartments.ca/floorplans/${imageRef.url}`;
        imageUrl = imageUrl.replace(/\s/g, "%20");
    }

    const hasDen = listing.UnitDetails.Bedrooms === "1.5" && true;

    return {
        url: listing.Website,
        numOfBaths: listing.UnitDetails.Bathrooms,
        numOfBeds: listing.UnitDetails.Bedrooms,
        vrTour: listing.UnitDetails.VirtualTour ? listing.UnitDetails.VirtualTour : null,
        title: listing.UnitDetails.Title.split('|')[0],
        price: parseInt(listing.UnitDetails.Price),
        floorplanCode: listing.UnitDetails.FloorPlanCode,
        sqft: listing.UnitDetails.SquareFootage,
        sqftRange: `${Math.floor(listing.UnitDetails.SquareFootage / 100) * 100}`,
        floorplan: imageRef !== "N/A" ? imageUrl : "N/A",
        availability: listing.UnitDetails.MoveInDate,
        den: hasDen,
        ensuite: imageRef.ensuite,
        barrierFree: imageRef.barrierFree,
        balcony: hasAmenity('balcony'),
    };
}

const renderRhentiListing = (screen, listing) => {
    const { bedsDescription, sqft, sqftRange, numOfBeds, numOfBaths, price, url, vrTour, den, floorplanCode, balcony } = listing;

    let title;

    const imageUrl = images.find(img => img.id === floorplanCode) || null;
    const imageHTML = imageUrl ? `<img src="${imageUrl.url}" alt="" />` : `<div></div>`;
    

    if (numOfBeds === '1') {
        title = '1 Bed'
    } else if (numOfBeds === '1.5') {
        title = '1 Bed + Den'
    } else {
        title = `${numOfBeds} Beds`
    }

    if (screen === 'desktop') {
      return (
        `<div class="listings__item listingCard ${numOfBeds}beds ${numOfBaths}baths ${sqftRange} ${balcony ? 'balcony' : '!'}">
        <div class="listings__item--header">
          <div>
            <p class="listings__item--type bold">${title}</p>
            <p class="listings__item--type">${sqft} sqft</p>
          </div>

          <p class="listings__item--price bold">$${price}</p>
        </div>

        <div class="listings__item--floorplan">
          ${imageHTML}
        </div>

        <a href="${url}" target="_blank" class="listings__item--contact" data-col="contact">
            <p>Inquire Now</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18.055"
              height="7.386"
              viewBox="0 0 18.055 7.386"
            >
              <path
                id="Shape_1"
                data-name="Shape 1"
                d="M145.243,288.491l-.007,0h13.916l-.082,2.346a.239.239,0,0,0,0,.336l.142.142a.236.236,0,0,0,.334,0l3.441-3.455a.238.238,0,0,0,.069-.168.232.232,0,0,0-.069-.167l-3.441-3.458a.24.24,0,0,0-.334,0l-.142.143a.234.234,0,0,0-.069.167.227.227,0,0,0,.069.164l.093,2.351H145.24a.245.245,0,0,0-.24.243v1.125A.24.24,0,0,0,145.243,288.491Z"
                transform="translate(-145 -283.997)"
                fill="#fff"
              ></path>
            </svg>
        </a>
      </div>`
      )
      } else {
        return (
          `<div class="swiper-slide listings__item listingCard ${numOfBeds}beds ${numOfBaths}baths ${sqftRange} ${balcony ? 'balcony' : '!'}">
          <div class="listings__item">
            <div class="listings__item--header">
              <div>
                <p class="listings__item--type bold">${title}</p>
                <p class="listings__item--type">${sqft} sqft</p>
              </div>
    
              <p class="listings__item--price bold">$${price}</p>
            </div>
    
            <div class="listings__item--floorplan">
              ${imageHTML}
            </div>
    
            <a href="${url}" target="_blank" class="listings__item--contact" data-col="contact">
                <p>Inquire Now</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.055"
                  height="7.386"
                  viewBox="0 0 18.055 7.386"
                >
                  <path
                    id="Shape_1"
                    data-name="Shape 1"
                    d="M145.243,288.491l-.007,0h13.916l-.082,2.346a.239.239,0,0,0,0,.336l.142.142a.236.236,0,0,0,.334,0l3.441-3.455a.238.238,0,0,0,.069-.168.232.232,0,0,0-.069-.167l-3.441-3.458a.24.24,0,0,0-.334,0l-.142.143a.234.234,0,0,0-.069.167.227.227,0,0,0,.069.164l.093,2.351H145.24a.245.245,0,0,0-.24.243v1.125A.24.24,0,0,0,145.243,288.491Z"
                    transform="translate(-145 -283.997)"
                    fill="#fff"
                  ></path>
                </svg>
            </a>
          </div>
          </div>`
      )
    }
}

const desktopListingsDOM = document.querySelector('#desktopListings');
const mobileListingsDOM = document.querySelector('#mobileListings');
const renderRhentiListings = async () => {
    const rhentiFeed = await fetch(rhentiUrl);
    const data = await rhentiFeed.json();
    const filteredListings = await filterRhentiListings(data);

    let desktopListingsHTML = '';
    let mobileListingsHTML = '';
    filteredListings.forEach(listing => {
      desktopListingsHTML += renderRhentiListing('desktop', listing);
    });
    desktopListingsDOM.innerHTML = desktopListingsHTML;

    filteredListings.forEach(listing => {
        mobileListingsHTML += renderRhentiListing('mobile', listing);
    });
    mobileListingsDOM.innerHTML = mobileListingsHTML;

    const listingsSwiper = new Swiper(`.listings__swiper`, {
      slidesPerView: "auto",
      spaceBetween: 30,
      pagination: {
        el: '.listings__swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.listings__swiper-next',
        prevEl: '.listings__swiper-prev',
      },
      modules: [Navigation, Pagination],
      // centeredSlides: true,
      // centerMode: true,
    });
}


window.addEventListener('load', () => renderRhentiListings());

let listingsFilters = {
  numOfBeds: '*',
  numOfBaths: '*',
  sqftRange: '*',
  balcony: false,
}

const listingsCheckboxes = document.querySelectorAll('.listings__checkbox');
listingsCheckboxes.forEach(chk => {
  chk.addEventListener('click', () => {
    const input = chk.querySelector('input');
    const name = input.getAttribute('name');
    listingsFilters[name] = !listingsFilters[name];
    chk.classList.toggle('active');
    filterListings();
  })
})

const filterListings = () => {
  const listingsCards = document.querySelectorAll('.listingCard');

    const activeFilters = [];
    listingsFilters.numOfBeds !== '*' && activeFilters.push(listingsFilters.numOfBeds)
    listingsFilters.numOfBaths !== '*' && activeFilters.push(listingsFilters.numOfBaths)
    listingsFilters.sqftRange !== '*' && activeFilters.push(listingsFilters.sqftRange)
    listingsFilters.balcony && activeFilters.push('balcony')

    listingsCards.forEach(card => {
      let hideUnit = false;

      activeFilters.forEach(filter => {
        if (!card.classList.contains(filter)) hideUnit = true;
      });

      hideUnit ? card.classList.add('hide') : card.classList.remove('hide');
    });

    const noResults = document.querySelector('.listings__noResults');
    const visibleListings = document.querySelectorAll('.listingCard:not(.hide)').length;

    listingsCards.forEach(card => card.classList.add('fadeIn'))
    visibleListings === 0 ? noResults.classList.remove('hide') : noResults.classList.add('hide');
    setTimeout(() => listingsCards.forEach(card => card.classList.remove('fadeIn')), 500)
}

const listingSelects = document.querySelectorAll('.listings__select');
listingSelects.forEach(select => {
  select.addEventListener('input', (e) => {
    const name = e.target.name;
    const val = e.target.value;

    listingsFilters[name] = val;

    filterListings();
  });
})

const listingsReset = document.querySelector('.listings__reset');
listingsReset.addEventListener('click', () => {
  listingSelects.forEach(select => select.value = "*");

  listingsFilters = {
    numOfBeds: '*',
    numOfBaths: '*',
    sqftRange: '*',
    balcony: false
  }

  listingsCheckboxes.forEach(chk => {
      const input = chk.querySelector('input');
      input.checked = false;
      const name = input.getAttribute('name');
      listingsFilters[name] = false;
      chk.classList.remove('active');
      filterListings();
  })

  const listingsCards = document.querySelectorAll('.listingCard');
  listingsCards.forEach(card => card.classList.remove('hide'));

  const noResults = document.querySelector('.listings__noResults');
  const visibleListings = document.querySelectorAll('.listingCard:not(.hide)').length;
  visibleListings === 0 ? noResults.classList.remove('hide') : noResults.classList.add('hide');
});