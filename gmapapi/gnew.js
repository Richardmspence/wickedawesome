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




// function createMarker(places) {
//   var bounds = new google.maps.LatLngBounds();
//   var placesList = document.getElementById('places');

//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });

//     placesList.innerHTML += '<li>' + place.name + '</li>';

//     bounds.extend(place.geometry.location);
//   }
// }

// console.log('ajjsajsj')
// $("#chooseZip").on("submit", function(event) {
//   console.log('heheh')
//  event.preventDefault();
//   var zip = $("#textZip").val().trim();
//   //) Clear previous search result
//   $("#clear").empty();
//   // ) initialize variables for search
//   var allLatlng = []; //returned from the API
//   var infowindow = null;
//   var pos;
//   var userCords = { lat: '', lng: ''};

//   // CREATE API KEY;


//   var APIkey = "AIzaSyCR3fKBOyQ4xA9ZZGTvzEP3r1IG7NKR4yY";

//   getCoordsFromZip(zip);

//   function getCoordsFromZip(zip) {
//     var zipCode = zip || 11428;

//     // var map = new google.maps.Map(document.getElementById('map'), {
//     //   zoom: 4
//     // });

//     $.ajax({
//         method: "GET",
//         url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode,
//       })
//       .then(function(response) {
//         console.log(response);
//         userCords.lat = response.results[0].geometry.location.lat;
//         userCords.lng = response.results[0].geometry.location.lng;

//         console.log({
//           position: {lat: userCords.lat, lng: userCords.lng},
//           map: map
//         });

//         // here
//       });
//   }

//   return;



//   //Start geolocation

//   if (navigator.geolocation) {

//     function error(err) {
//       console.warn('ERROR(' + err.code + '): ' + err.message);
//     }

//     function success(pos) {
//       userCords = pos.coords;

//       //return userCords;
//     }

//     // Get the user's current position
//     navigator.geolocation.getCurrentPosition(success, error);
//     //console.log(pos.latitude + " " + pos.longitude);
//   } else {
//     alert('Geolocation is not supported in your browser');
//   }

//   //End Geo location

//   //map options
//   var mapOptions = {
//     zoom: 5,
//     center: new google.maps.LatLng(37.09024, -100.712891),
//     panControl: false,
//     panControlOptions: {
//       position: google.maps.ControlPosition.BOTTOM_LEFT
//     },
//     zoomControl: true,
//     zoomControlOptions: {
//       style: google.maps.ZoomControlStyle.LARGE,
//       position: google.maps.ControlPosition.RIGHT_CENTER
//     },
//     scaleControl: false

//   };

//   //Adding infowindow option
//   infowindow = new google.maps.InfoWindow({
//     content: "holding..."
//   });

//   //Fire up Google maps and place inside the map-canvas div
//   map = new google.maps.Map(document.getElementById('map'), mapOptions);

//   //grab form data
//   $('#chooseZip').submit(function() { // bind function to submit event of form

//       //define and set variables
//       var userZip = $("#textZip").val();
//       //console.log("This-> " + userCords.latitude);

//       var accessURL;

//       if (userZip) {
//         accessURL = "http://maps.google.com/?ll=39.774769,-74.86084." + userZip;
//       } else {
//         accessURL = "http://maps.google.com/?ll=" + userCords.lat + "," + userCords.lng + ".";
//       }


//       //Use the zip code and in area.
//       $.ajax({
//           type: "GET",
//           contentType: "application/json; charset=utf-8",
//           url: accessURL,
//           dataType: 'json'
//         })
//         .then(function(data) {
//           console.log(data);
//         })

//       });

//     return false; // important: prevent the form from submitting
//   });