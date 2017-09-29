
//* Project Information *//

// Porject File:          weather.js (2/3)
// Project File Type:     Javascript

var api_key = "api-key-123"; // My API Key

function sendRequest() {
    var xhr = new XMLHttpRequest();
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q=" + city + "&appid=" + api_key + "&format=json", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json, undefined, 2);
            //document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";

            // Weather Attributes
            var cityName = json.name + ", " + json.sys.country;
            var longitude = JSON.stringify(json.coord.lon, undefined, 2);
            var latitude = JSON.stringify(json.coord.lat, undefined, 2);
            var sunriseTime = (new Date(json.sys.sunrise)).toLocaleTimeString();
            var sunsetTime = (new Date(json.sys.sunset)).toLocaleTimeString();
            var pressure = JSON.stringify(json.main.pressure, undefined, 2);
            var humidity = JSON.stringify(json.main.humidity, undefined, 2);
            var temperature = (json.main.temp - 273.15).toPrecision(3) + " degrees C";
            var minTemp = (json.main.temp_min - 273.15).toPrecision(3) + " degrees C";
            var maxTemp = (json.main.temp_max - 273.15).toPrecision(3) + " degrees C";
            var visibility = json.weather[0].description;
            var clouds = JSON.stringify(json.clouds.all, undefined, 2);

            // Table Formation in HTML
            var myTable = "<table style='font-family:sans-serif; color:ivory; border:aquamarine; border-style:solid; border-width:1px; margin:0px auto; text-align:left'><tr><th>Category</th><th>   </th><th>Detail</th></tr><tr><td>City Name</td><td> </td><td>" + cityName + "</td></tr>";
            myTable += "<tr><td>Longitude</td><td> </td><td>" + longitude + "</td></tr>" + "<tr><td>Latitude</td><td> </td><td>" + latitude + "</td></tr>";
            myTable += "<tr><td>Sunrise Time</td><td> </td><td>" + sunriseTime + "</td></tr>" + "<tr><td>Sunset Time</td><td> </td><td>" + sunsetTime + "</td></tr>";
            myTable += "<tr><td>Pressure</td><td> </td><td>" + pressure + "</td></tr>" + "<tr><td>Humidity</td><td> </td><td>" + humidity + "</td></tr>";
            myTable += "<tr><td>Temperature</td><td> </td><td>" + temperature + "</td></tr>" + "<tr><td>Minimum Temperature</td><td> </td><td>" + minTemp + "</td></tr>";
            myTable += "<tr><td>Max Temperature</td><td> </td><td>" + maxTemp + "</td></tr>" + "<tr><td>Visibility</td><td> </td><td>" + visibility + "</td></tr>";
            myTable += "<tr><td>Clouds</td><td> </td><td>" + clouds + "</td></tr></table>";

            document.getElementById("output").innerHTML = "<pre>" + myTable + "</pre>";

            // Message To User
            var possibleWeatherConditions = new Array();
            possibleWeatherConditions[0] = "light rain";
            possibleWeatherConditions[1] = "overcast clouds";
            possibleWeatherConditions[2] = "clear sky";
            possibleWeatherConditions[3] = "few clouds";
            possibleWeatherConditions[4] = "snow";
            if (possibleWeatherConditions[0].match(visibility))
                document.getElementById("message").innerHTML = "<pre>Light drizzle of rain ongoing. Please take your umbrella with you when you step out.</pre>";
            else if (possibleWeatherConditions[1].match(visibility))
                document.getElementById("message").innerHTML = "<pre>Light rains expected. Please take your umbrella with you when you step out.</pre>";
            else if (possibleWeatherConditions[2].match(visibility))
                document.getElementById("message").innerHTML = "<pre>The weather seems to be clear. No signs of rains expected.</pre>";
            else if (possibleWeatherConditions[3].match(visibility))
                document.getElementById("message").innerHTML = "<pre>Few overhead clouds being sighted; windy day can be expected. Please carry a jacket with you when you step out.</pre>";
            else if (possibleWeatherConditions[4].match(visibility))
                document.getElementById("message").innerHTML = "<pre>It's been snowing! Please carry an overcoat and jacket when you step out.</pre>";
            else
                document.getElementById("message").innerHTML = "<pre>It's a bright and beautiful day.</pre>";
        }
    };
    xhr.send(null);
}
