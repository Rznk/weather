var coordLat,
  coordLon,
  cityLoc,
  unitS;

function getWeather(lon, lat) {
  $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&cluster=yes&units=metric&format=json&APPID=c734fd902437b538ae7b48444bebbd55", function(data) {
    var idWeather = data.weather[0].id;
    var dataCity = "<h1>Weather in " + data.name + "</h1>";
    unitS = Math.round(data.main.temp);
    var dataHtml = "<h3>" + '<span id="temp">' + unitS + '</span>' + "<sup> o</sup>" + '<button id="buttn">C</button>' + " " + "<div>" + data.weather[0].main + "</div>" + '</h3><div id="icon"><i id="iconWeath" class=""></i></div>';
    $("#city").html(dataCity);
    $("#data").html(dataHtml);
    $("#buttn").bind("click", convertUnits);
    setIcon(idWeather);
  });
}

function setIcon(idWeather) {
  if (idWeather == 800) {
    $("#iconWeath").attr("class", "pe-7w-sun pe-5x pe-va");
  } else if (idWeather >= 200 && idWeather <= 232) {
    $("#iconWeath").attr("class", "pe-7w-lightning pe-5x pe-va");
  } else if (idWeather >= 300 && idWeather <= 321) {
    $("#iconWeath").attr("class", "pe-7w-drizzle pe-5x pe-va");
  } else if (idWeather >= 500 && idWeather <= 531) {
    $("#iconWeath").attr("class", "pe-7w-rain pe-5x pe-va");
  } else if (idWeather >= 600 && idWeather <= 621) {
    $("#iconWeath").attr("class", "pe-7w-snow pe-5x pe-va");
  } else if (idWeather >= 701 && idWeather <= 781) {
    $("#iconWeath").attr("class", "pe-7w-fog pe-5x pe-va");
  } else if (idWeather >= 801 && idWeather <= 804) {
    $("#iconWeath").attr("class", "pe-7w-cloud pe-5x pe-va");
  } else if (idWeather >= 900 && idWeather <= 906) {
    $("#iconWeath").attr("class", "pe-7w-hurricane pe-5x pe-va");
  }
}

function getLoc() {
  $.getJSON('http://ipinfo.io/', function(data) {
    var loc = data.loc.split(",", 2);
    //cityLoc = data.city; // check city
    coordLon = loc[1];
    coordLat = loc[0];
    //console.log(loc + " " + coordLon + " " + coordLat+ " "+ cityLoc); // check correct coordinates
    getWeather(coordLon, coordLat);
  });
}

function convertUnits() {
  var temperature = document.getElementById("temp").innerHTML;
  var buttonTemp = document.getElementById("buttn").innerHTML;
  if (buttonTemp == "C") {
    temperature = Math.round(temperature * 1.8 + 32);
    buttonTemp = "F";
  } else {
    temperature = Math.round((temperature - 32) / 1.8);
    buttonTemp = "C";
  }
  //console.log(temperature + buttonTemp); //check the temp var
  $("#temp").text(temperature);
  $("#buttn").text(buttonTemp);
}
$(document).ready(function() {
  getLoc();
});