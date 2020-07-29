import React, { Component } from "react";

function WeatherInit() {
  const apiKey = "fe87d2db4c789eedcaf2f90c1fa980b8";
  const weather = document.querySelector(
    "#root .App #weather .container .weather"
  );

  //strage key name
  const coords = "coords";

  function getweather(broughtInfo) {
    const lat = broughtInfo.laPosition;
    const log = broughtInfo.loPosition;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
      });
  }

  function savePosition(coord) {
    localStorage.setItem(coords, JSON.stringify(coord));
  }

  function dropPosition(position) {
    const laPosition = position.coords.latitude;
    const loPosition = position.coords.longitude;
    const positionObj = {
      laPosition,
      loPosition
    };

    savePosition(positionObj);
    getweather(laPosition, loPosition);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(dropPosition);
    } else {
      weather.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function init() {
    const bringInfo = localStorage.getItem(coords);
    if (bringInfo === null) {
      getLocation();
    } else {
      const broughtInfo = JSON.parse(bringInfo);
      getweather(broughtInfo);
    }
  }

  init();
}

class Weather extends Component {
  componentDidMount() {
    WeatherInit();
  }

  render() {
    return (
      <div id="weather">
        <div className="container">
          <div className="weather"></div>
        </div>
      </div>
    );
  }
}

export default Weather;
