import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherContainer() {
  const [appState, setAppState] = useState("");
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=85c7db7f42d6af038fe9dced342805b3";
    axios.get(apiUrl).then((weather) => {
      const currWeather = weather.data;
      console.log(weather.data);
      setAppState({ loading: false, weather: currWeather });
      setWeather({
        description: currWeather.weather[0].description,
        icon: currWeather.weather[0].icon,
        currTemp: currWeather.main.temp - 273.15,
        minTemp: currWeather.main.temp_min - 273.15,
        maxTemp: currWeather.main.temp_max - 273.15,
        feels_like: currWeather.main.feels_like - 273.15,
        humidity: currWeather.main.humidity + "%",
        windSpeed: currWeather.wind.speed + " km/h",
        windDir: {
          direction: Math.floor(currWeather.wind.deg / 45),
          isExact: currWeather.wind.deg % 45 == 0,
        },
        rise: new Date(currWeather.sys.sunrise * 1000).toLocaleTimeString(
          "en-CA"
        ),
        set: new Date(currWeather.sys.sunset * 1000).toLocaleTimeString(
          "en-CA"
        ),
        location: currWeather.name + ", " + currWeather.sys.country,
      });
    });
  }, [setAppState]);
  const [weather, setWeather] = useState(
    {
      description: "",
      currTemp: "",
      minTemp: "",
      maxTemp: "",
      feels_like: "",
      humidity: "",
      windSpeed: "",
      windDir: "",
      rise: "",
      set: "",
      location: "",
    },
    []
  );
  const getDirection = (windD) => {
    switch (windD.direction) {
      case 1:
        return windD.isExact ? "NE" : "ENE";
        break;

      case 2:
        return windD.isExact ? "E" : "ESE";
        break;

      case 3:
        return windD.isExact ? "SE" : "SSE";
        break;

      case 4:
        return windD.isExact ? "S" : "SSW";
        break;

      case 5:
        return windD.isExact ? "SW" : "WSW";
        break;

      case 6:
        return windD.isExact ? "W" : "WNW";
        break;

      case 7:
        return windD.isExact ? "NW" : "NNW";
        break;
      case 0:
        return windD.isExact ? "N" : "NNE";
        break;

      default:
        break;
    }
  };
  return (
    <div className={"row  justify-content-center p-5"}>
      {appState.loading == false && (
        <div className={"col-6  shadow-lg p-3 mb-5 bg-white rounded align-self-center align-items-center card"}>
            <h1 className={""}>Location: {weather.location}</h1>
          {appState.weather != "" && (
              <div className={" row mt-3"}>
              {console.log(weather)}

              <div className={"col-6"}>
                <img
                  className="icons"
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                ></img>
                <h6>Weather: {weather.description}</h6>
                <h6>Humidity: {weather.humidity}</h6>
                <h6>
                  Wind Speed: {weather.windSpeed}{" "}
                  {getDirection(weather.windDir)}
                </h6>

                <h6>Sunrise: {weather.rise}</h6>
                <h6>Sunset: {weather.set}</h6>
              </div>
              <div className={"col-6  align-self-center"}>
                <div className={" shadow p-3 mb-5 bg-white rounded card"}>
                  <div className={" card-header"}>
                    <h4>Tempurature</h4>
                  </div>
                  <div className={" card-body"}>

                  <div className={"row justify-content-between"}>
                  <div className={"align-self-center "}>
                      Current: 
                      </div>
                    <div className={"m-1 btn-sm active btn-success "}>
                      {~~weather.currTemp + " °C"}
                    </div>
                  </div>
                  <div className={"row justify-content-between"}>
                  <div className={"align-self-center"}>
                  Feels Like: 
                      </div>
                    <div className={"m-1 btn-sm active  btn-outline-success"}>
                      {~~weather.feels_like + " °C"}
                    </div>
                  </div>
                  <div className={"row justify-content-between"}>
                  <div className={"align-self-center"}>
                  Min/Max:
                      </div>
                    <div className={"m-1 btn-sm active  btn-primary"}>
                      {~~weather.minTemp + " °C"}
                    </div>
                    <div className={"align-self-center"}>
                  |
                      </div>
                    <div className={"m-1 btn-sm active  btn-danger"}>
                      {~~weather.maxTemp + " °C"}
                    </div>
                  </div>
                  </div>
                  <div className={"row"}>
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherContainer;
