var map;
var service;
var infowindow;

function initMap(coordinates) {

  function handleGetPositionSuccess(position) {
    var coords = {
      lat: Number(position.coords.latitude.toFixed(3)),
      lng: Number(position.coords.longitude.toFixed(3))
    };
    console.log(coords)
    renderMap(coords);
  }

  navigator.geolocation.getCurrentPosition(handleGetPositionSuccess, function(){ 
    console.log('didnt work');
  });
}
//
function renderMap(coords) {
  console.log(coords);
  renderRunners(coords);
  renderPlaces(coords);
}

function renderRunners(coords) {
  var runners = [
  {
    lat: -25.363,
    lng: 131.044
  },
  {
    lat: -25.363,
    lng: 132
  },
  {
    lat: -25.363,
    lng: 133
  }

  ];

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coords,
    scrollwheel: false
  });

  for (var i = 0; i < runners.length; i++){
    new google.maps.Marker({
      position: runners[i],
      map: map
    });
  }
}

function renderPlaces(coords) {
  var currentPosition = new google.maps.LatLng(coords.lat, coords.lng);
  var request = {
    location: currentPosition,
    radius: '5000',
    types: ['gym']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, handlePlacesSearch);
}

function handlePlacesSearch(results, status) {
  console.log(status)
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      addMarker(results[i]);
    }
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(20, 34)
    }
  });
}


