
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTVatfgKcuEKd7a6SBGZmH7UBcnhflZBE",
    authDomain: "wickedrunners-44247.firebaseapp.com",
    databaseURL: "https://wickedrunners-44247.firebaseio.com",
    storageBucket: "wickedrunners-44247.appspot.com",
    messagingSenderId: "501393337133"
  };
  firebase.initializeApp(config);


  var firstName = $('#first-name-input').val().trim();
  var lastName = $('#last-name-input').val().trim();
  var eMail = $('#user-name').val().trim();
  var zipCode = $('#zip-code').val().trim();
  var gender = $('#input:radio[name=gender]').val();
