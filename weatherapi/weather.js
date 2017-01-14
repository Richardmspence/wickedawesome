var APIKey = "783292655e803480038357e1d72387d5";
    
    $('#submit-btn').on('click', function(){
          zipCode = $('#zip').val().trim();
          console.log(zipCode);
          getWeather(zipCode);
    });

    getWeather();

    function getWeather(zipCode) {
      var zip = zipCode || "10003";

      var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip + "&units=imperial&appid=" + APIKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      .done(function(response) {

        console.log(queryURL);

        console.log(response);

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").html("Wind Speed: " + response.wind.speed);
        $(".humidity").html("Humidity: " + response.main.humidity);
        $(".temp").html("Temperature (F): " + response.main.temp);
        $(".clouds").html("Cloudiness: " + response.clouds.all + "%");
        $(".description").html("Current Skies: " + response.weather[0].description);
        $(".icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

        
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        console.log("Cloudiness: " + response.clouds.all) + "%";
        console.log("Current Skies: " + response.weather[0].description);


      });
    }




