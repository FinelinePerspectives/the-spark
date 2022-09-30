
const mapItems = [
        {'title': 'Manotick', 'lat': 45.2122679, 'lang': -75.7497449, 'icon': '', anchor: [0,0] },
];

function initMap() {
		let mapCentre = {lat: 45.1024307, lng: -75.5635001};
        let map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 11,
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
       
		for (let i = 0; i < mapItems.length; i++) {
			let icon = {
				url: mapItems[i].icon,
				scaledSize: new google.maps.Size(75, 75),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(mapItems[i].anchor[0], mapItems[i].anchor[1])

			}

			new google.maps.Marker({
				position:{ lat: mapItems[i].lat, lng: mapItems[i].lang },
				map: map,
				icon: icon,			
			  });
		}
}

export default initMap;