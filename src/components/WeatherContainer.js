import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherContainer(props) {
  const { city } = props;
  const api = process.env.REACT_APP_API_KEY;

  const [appState, setAppState] = useState("");

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?${city}&appid=${api}`;
    axios.get(apiUrl).then((weather) => {
      const currWeather = weather.data;
      console.log(weather.data);
      setTimeout(() => {
       
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
      }, 300);
    });
  }, [setAppState, city]);
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
    <div className={"col-6"}>
        <div
          className={
            "col-12 p-2 shadow p-3 mb-5 bg-white rounded align-self-center align-items-center card"
          }
          >
          {appState.loading == false && appState.weather != ""? (
            <>
          <h1 className={""}><img
                  className="icons"
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                ></img>{weather.location}</h1>
            <div className={" justify-content-between row mt-3"}>
              {console.log(weather)}

              <div className={"col-auto bg-white rounded m-1 align-self-center"}>
                
                <h6>Weather: {weather.description}</h6>
                <h6>Humidity: {weather.humidity}</h6>
                <h6>
                  Wind Speed: {weather.windSpeed}{" "}
                  {getDirection(weather.windDir)}
                </h6>

                <h6>Sunrise: {weather.rise}</h6>
                <h6>Sunset: {weather.set}</h6>
              </div>
              <div
                className={
                  " col-auto mb-3  shadow-lg px-3 py-2 justify-content-center bg-dark text-light rounded "
                }
              >
                <div className={" "}>
                  <h4>Tempurature</h4>
                </div>
                <div className={"col "}>
                  <div className={"row justify-content-between"}>
                    <div className={"align-self-center "}>Current:</div>
                    <div className={"m-1 btn-sm active btn-success "}>
                      {~~weather.currTemp + " °C"}
                    </div>
                  </div>
                  <div className={"row justify-content-between"}>
                    <div className={"align-self-center"}>Feels Like:</div>
                    <div className={"m-1 btn-sm active rounded   btn-outline-success"}>
                      {~~weather.feels_like + " °C"}
                    </div>
                  </div>
                  <div className={"row justify-content-between"}>
                    <div className={"align-self-center"}>Min/Max:</div>
                    <div className={"m-1 btn-sm active  btn-primary"}>
                      {~~weather.minTemp + " °C"}
                    </div>
                    <div className={"align-self-center"}>|</div>
                    <div className={"m-1 btn-sm active  btn-danger"}>
                      {~~weather.maxTemp + " °C"}
                    </div>
                  </div>
                </div>
                <div className={"row "}></div>
              </div>
            </div></>
          ):
          <div className={""}>
            <span class="spinner-grow spinner-grow-sm mx-1"></span>
   Loading..
          </div>
          
          }
        </div>
      
    </div>
  );
}

export default WeatherContainer;
