// Initialize Firebase
var config = {
    apiKey: "AIzaSyDTVatfgKcuEKd7a6SBGZmH7UBcnhflZBE",
    authDomain: "wickedrunners-44247.firebaseapp.com",
    databaseURL: "https://wickedrunners-44247.firebaseio.com",
    storageBucket: "wickedrunners-44247.appspot.com",
    messagingSenderId: "501393337133"
};
firebase.initializeApp(config);

var db = firebase.database().ref("runners");

//push() <- adds new object to the database
// set() < - Replaces existing object with whatever we set
//


function getUserInput() {
    var firstName = $('#first-name-input').val().trim();
    var lastName = $('#last-name-input').val().trim();
    var eMail = $('#user-name').val().trim();
    var zipCode = $('#zip-code').val().trim();
    var gender = $('input:radio[name=gender]:checked').val();

    var newUser = {
        firstName: firstName,
        lastName: lastName,
        eMail: eMail,
        zipCode: zipCode,
        gender: gender
    }
    return newUser;
}

// var sendButton = $('')

$("#wa-form").on("submit", function(event) {
    var data = firebase.database().ref("runners")
    event.preventDefault();
    var newUser = getUserInput();
    var geoCodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + newUser.zipCode + "&key=AIzaSyCR3fKBOyQ4xA9ZZGTvzEP3r1IG7NKR4yY"
    $.ajax({
        url: geoCodeUrl,
        method: "GET"
    }).done(function(response) {

        console.log(response); 
        var latitude = response.results[0].geometry.location.lat;
         var longitdue = response.results[0].geometry.location.lng;

         newUser.lat = latitude; 
         newUser.lng = longitdue;


        //debugger;
        //$("zipCode")

        data.push(newUser);

    });

    // console.log(newUser)

});

var people;
var peopleArray = [];
db.once('value').then(function(snapshot) {
  // console.log(snapshot.val());
  people = snapshot.val();

  for (person in people) {
    peopleArray.push(people[person]);
    // // console.log(person);
    // // console.log(people[person].lat);
    // // console.log(people[person].lng);

    // peopleArray.push({
    //   name: people[person].firstName + " " + people[person].lastName,
    //   lat: people[person].lat,
    //   lng: people[person].lng
    // });
  }

  //1. draw the map

  for (var i=0; i < peopleArray.length; i++){
    console.log(peopleArray[i].lng);
    console.log(peopleArray[i].lat);

    //2. make markers for each set of lat and lng
  }

  //1. for loop around peopleArray and console log each of the values
  //2. instead of console log create markers for each one using the lat and lngss
});


