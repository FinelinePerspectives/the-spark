import 'regenerator-runtime/runtime'

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
        sqft: `${Math.floor(listing.UnitDetails.SquareFootage / 100) * 100}`,
        floorplan: imageRef !== "N/A" ? imageUrl : "N/A",
        availability: listing.UnitDetails.MoveInDate,
        den: hasDen,
        ensuite: imageRef.ensuite,
        barrierFree: imageRef.barrierFree,
        balcony: imageRef.balcony,
    };
}

const renderRhentiListing = (listing) => {
    const { bedsDescription, sqft, numOfBeds, price, url, vrTour, den } = listing;
    let title;

    if (numOfBeds === '1') {
        title = '1 Bed'
    } else if (numOfBeds === '1.5') {
        title = '1 Bed + Den'
    } else {
        title = `${numOfBeds} Beds`
    }

    const vrTourIcon = `
    <a
    data-fslightbox="vrTour1"
    class="vrIcon"
    href="${vrTour}"
    target="_blank"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64.702"
      height="52.178"
      viewBox="0 0 64.702 52.178"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_168"
            data-name="Rectangle 168"
            width="64.702"
            height="52.178"
            fill="#f8f8f8"
          />
        </clipPath>
      </defs>
      <g
        id="Group_662"
        data-name="Group 662"
        clip-path="url(#clip-path)"
      >
        <path
          id="Path_519"
          data-name="Path 519"
          d="M132.742,42.9a7,7,0,1,0,7,7,7.007,7.007,0,0,0-7-7m-1.848,10.768a4.116,4.116,0,1,1,5.885-5.72,6.646,6.646,0,0,0-5.885,5.72"
          transform="translate(-96.685 -32.986)"
          fill="#f8f8f8"
        />
        <path
          id="Path_520"
          data-name="Path 520"
          d="M95.678,28.126A2.751,2.751,0,0,0,95.7,27.8V5.56a2.789,2.789,0,0,0-2.78-2.78h-2.78V0h-2.78V2.78h-13.9A2.921,2.921,0,0,0,70.678,0h-5.56a2.921,2.921,0,0,0-2.78,2.78h-2.78a2.789,2.789,0,0,0-2.78,2.78V27.8a2.768,2.768,0,0,0,.038.436c4.886,1.146,21.552,4.371,38.862-.11M79.714,6.3A10.61,10.61,0,1,1,69.1,16.914,10.621,10.621,0,0,1,79.714,6.3M63.435,8.109a2.024,2.024,0,1,1-2.024,2.022,2.025,2.025,0,0,1,2.024-2.022"
          transform="translate(-43.656)"
          fill="#f8f8f8"
        />
        <path
          id="Path_521"
          data-name="Path 521"
          d="M4.968,78.628,11,81.28,6.42,87.374,5.783,84.48C4.8,85.1,3.862,85.6,3.041,86.235c-1.157.9-1.233,1.659.082,2.339a38.259,38.259,0,0,0,7.692,3.285c9.286,2.427,18.789,2.67,28.318,2.164a63.665,63.665,0,0,0,17.405-2.946,24.659,24.659,0,0,0,5.036-2.517c1.259-.791,1.27-1.568.008-2.333a34.874,34.874,0,0,0-5.556-2.708c-2.343-.9-2.385-.794-1.948-3.557,3.4.956,6.76,1.91,9.3,4.525a3.94,3.94,0,0,1-.042,5.92,16.407,16.407,0,0,1-4.6,2.954c-4.88,2.1-10.109,2.775-15.344,3.328a105.879,105.879,0,0,1-22.256-.008c-4.958-.521-9.9-1.194-14.57-3.049A17.9,17.9,0,0,1,1.913,91.01c-2.667-2.17-2.494-5.393.19-7.561a5.52,5.52,0,0,1,.562-.4c.548-.338,1.084-.7,1.66-.988.591-.292,1.193-.486.961-1.37-.159-.608-.2-1.246-.319-2.06"
          transform="translate(0 -60.456)"
          fill="#f8f8f8"
        />
        <path
          id="Path_522"
          data-name="Path 522"
          d="M64.065,182.126a6.265,6.265,0,0,0,2.751.729c1.439,0,2.168-.692,2.168-1.566,0-1.184-1.166-1.713-2.386-1.713h-1.13V177.59H66.56c.929,0,2.1-.364,2.1-1.366,0-.71-.565-1.239-1.749-1.239a5.255,5.255,0,0,0-2.459.71l-.565-2a7.367,7.367,0,0,1,3.661-.893c2.514,0,3.917,1.33,3.917,2.951a2.822,2.822,0,0,1-2.168,2.751v.036a2.947,2.947,0,0,1,2.569,2.9c0,2.077-1.84,3.607-4.846,3.607a7.215,7.215,0,0,1-3.516-.82Z"
          transform="translate(-48.824 -132.863)"
          fill="#f8f8f8"
        />
        <path
          id="Path_523"
          data-name="Path 523"
          d="M114.394,175.027a7.631,7.631,0,0,0-1.075.037c-2.459.2-3.552,1.457-3.862,2.823h.055a3.426,3.426,0,0,1,2.514-.929,3.594,3.594,0,0,1,3.662,3.862,4.236,4.236,0,0,1-4.354,4.281c-3.17,0-4.718-2.35-4.718-5.173a7.1,7.1,0,0,1,2.113-5.283,7.032,7.032,0,0,1,4.554-1.731,5.8,5.8,0,0,1,1.111-.018Zm-1.512,5.939a1.809,1.809,0,0,0-1.767-2.04,1.773,1.773,0,0,0-1.621,1.038,1.451,1.451,0,0,0-.128.71c.055,1.257.656,2.386,1.931,2.386.966,0,1.585-.893,1.585-2.1"
          transform="translate(-81.975 -132.924)"
          fill="#f8f8f8"
        />
        <path
          id="Path_524"
          data-name="Path 524"
          d="M159.507,178.865c0,3.643-1.476,6.176-4.481,6.176-3.061,0-4.408-2.751-4.427-6.1,0-3.443,1.439-6.139,4.5-6.139,3.151,0,4.408,2.824,4.408,6.066m-6.139.073c0,2.714.656,4.008,1.713,4.008,1.075,0,1.658-1.348,1.658-4.044,0-2.624-.565-4.008-1.676-4.008-1,0-1.694,1.275-1.694,4.044"
          transform="translate(-115.794 -132.863)"
          fill="#f8f8f8"
        />
        <path
          id="Path_525"
          data-name="Path 525"
          d="M199.408,173.488a2.725,2.725,0,0,1-2.787,2.714,2.651,2.651,0,0,1-2.751-2.66,2.715,2.715,0,0,1,2.787-2.714,2.651,2.651,0,0,1,2.751,2.66m-4.081.055a1.317,1.317,0,1,0,1.294-1.439,1.346,1.346,0,0,0-1.294,1.439"
          transform="translate(-149.064 -131.348)"
          fill="#f8f8f8"
        />
      </g>
    </svg>
  </a>
    `

    return (
        ` <div class="listings__item">
        <div class="listings__item--header">
          <div>
            <p class="listings__item--type bold">${title}</p>
            <p class="listings__item--type">${sqft} sqft</p>
          </div>

          <p class="listings__item--price bold">$${price}</p>
        </div>

        <div class="listings__item--floorplan">
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
}

const rhentiListingsDOM = document.querySelector('#rhentiListings');
const renderRhentiListings = async () => {
    const rhentiFeed = await fetch(rhentiUrl);
    const data = await rhentiFeed.json();
    const filteredListings = await filterRhentiListings(data);

    let listingsHTML = '';
    filteredListings.forEach(listing => {
        listingsHTML += renderRhentiListing(listing);
    });
    rhentiListingsDOM.innerHTML = listingsHTML;
}

const images = [
    { id: '6409fca7f4bf63002d87570e',url: 'floorplan-suite-01-compare.png', ensuite: false, barrierFree: false, balcony: true },
    { id: '640a055d23aec6002d8fb59e',url: 'floorplan-suite-02-compare.png', ensuite: true, barrierFree: false, balcony: true },
    { id: '640a07abf4bf63002d87622c',url: 'floorplan-suite-03-compare.png', ensuite: false, barrierFree: false, balcony: true },
    { id: '640a09bf239d04002d9c891b',url: 'floorplan-suite-04-compare.png', ensuite: true, barrierFree: false, balcony: true },
    { id: '640a0c5b23aec6002d8fbd4b',url: 'floorplan-suite-05-compare.png', ensuite: false, barrierFree: false, balcony: false },
    { id: '640a11203ba657002db420f3',url: 'floorplan-suite-06-compare.png', ensuite: false, barrierFree: false, balcony: false },
    { id: '640a142923aec6002d8fc37f',url: 'floorplan-suite-07-compare.png', ensuite: true, barrierFree: true, balcony: true },
    { id: '640a15733ba657002db424f8',url: 'floorplan-suite-08-compare.png', ensuite: false, barrierFree: false, balcony: false },
    { id: '640a17e5f4bf63002d876f2f',url: 'floorplan-suite-09-compare.png', ensuite: true, barrierFree: false, balcony: true },
    { id: '640a1a1a239d04002d9c96fa',url: 'floorplan-suite-10-compare.png', ensuite: false, barrierFree: true, balcony: true },
];

window.addEventListener('load', () => renderRhentiListings())