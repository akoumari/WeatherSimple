import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";

function WeatherContainer(props) {
  const { city } = props;
  const api = process.env.REACT_APP_API_KEY;

  const [appState, setAppState] = useState("");

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${api}`;
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
            exactDirection: currWeather.wind.deg,
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
    <div style={{minHeight: "100%"}} className={"col-xl-6 my-3 col-12"}>
      <div
      style={{minHeight: "100%"}}
        className={
          "col-12 row p-2 shadow p-3 mb-5  d-flex align-self-center align-items-center justify-content-center round-box bg-zero useBorder"
        }
      >
        {appState.loading == false && appState.weather != "" ? (
          <>
          <div className={
          "col-12 "
        }>
            <h1 className={""}>
              <img
                className="icons"
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
              ></img>
              {weather.location}
            </h1>

          </div>
          <div className={
            "col-12 d-flex justify-content-center align-items-center"
          }>
            <div className={"d-flex justify-content-center ml-lg-1 row mt-3"}>
              {console.log(weather)}

              <div
             
                className={"col-lg-6 col-12  p-1"}
                >
              <div
              style={{height: "100%"}}
                className={"col-12 bg-cleard useBorder rounded my-1 py-1 align-self-center d-flex row align-items-center"}
                >
                <div
             
                className={"col-12 "}
                >
                <h6>Weather: {weather.description}</h6>
                </div>
                 <div
             
                className={"col-12 "}
                >
                <h6>Humidity: {weather.humidity}</h6>
                   </div>
                    <div
             
                className={"col-12 "}
                >
                <h6>
                  <Tooltip
                    title={`${weather.windDir.exactDirection}°  ${getDirection(
                      weather.windDir
                      )}`}
                      placement="top-end"
                      
                      >
                    <div className={" align-items-center"}>
                      Wind Speed: {weather.windSpeed}{" "}
                      <div className={" d-inline "}>
                        <FontAwesomeIcon
                          icon={faAngleDoubleUp}
                          width="40"
                          height="40"
                          color={"#000"}
                          transform={{ rotate: weather.windDir.exactDirection }}
                          />
                      </div>
                    </div>
                  </Tooltip>
                </h6>
   </div> <div
             
                className={"col-12 "}
                >
                <h6>Sunrise: {weather.rise}</h6>
                   </div> <div
             
                className={"col-12 "}
                >
                <h6>Sunset: {weather.set}</h6>
   </div>
              </div>
              </div>
              
              <div
             
                className={"col-lg-6 col-12 p-1"}
                >
              <div
              style={{minHeight: "100%"}}
                className={
                  " col-12 row my-1 shadow-lg px-3 py-2 justify-content-center bg-cleard useBorder text-light rounded "
                }
                >
                <div className={" row "}>
                  <h4>Tempurature</h4>
                </div>
                <div className={"row d-flex justify-content-center"}>
                  <div className={"col col-6 justify-content-between"}>
                    <div className={"align-self-center "}>Current:</div>
                    </div>
                  <div className={"col col-xl-5 col-4  justify-content-between"}>
                    <div className={"m-1 btn-sm active py-0  col col-8  col-xl-12 text-center btn-success "}>
                      {~~weather.currTemp + " °C"}
                    </div>
                  </div>
               
                  <div className={"col col-6 justify-content-between"}>
                    <div className={"align-self-center "}>Feels Like:</div>
                    </div>
                  <div className={"col col-xl-5 col-4  justify-content-between"}>
                    <div className={"m-1 btn-sm active py-0 col col-8  col-xl-12 text-center btn-outline-success"
                      }
                      >
                      {~~weather.feels_like + " °C"}
                    </div>
                  </div>
        
                  <div className={"col col-6 justify-content-between"}>
                    <div className={"align-self-center "}>Low:</div>
                    </div>
                  <div className={"col col-xl-5 col-4 justify-content-between"}>
                    <div className={"m-1 btn-sm active py-0 col col-8  col-xl-12 text-center btn-outline-primary"
                      }
                      >
                     {~~weather.minTemp + " °C"}
                    </div>
                  </div>
               
                  <div className={"col col-6 justify-content-between"}>
                    <div className={"align-self-center "}>High:</div>
                    </div>
                  <div className={"col col-xl-5 col-4  justify-content-between"}>
                    <div className={"m-1 btn-sm active py-0  col col-8  col-xl-12 text-center btn-outline-danger"
                      }
                      >
                       {~~weather.maxTemp + " °C"}
                    </div>
                  </div>
                 
                </div>
                <div className={"row "}></div>
        </div> </div>
              </div>
            </div>
          </>
        ) : (
          <div className={""}>
            <span class="spinner-grow spinner-grow-sm mx-1"></span>
            Loading..
          </div>
        )}
      </div>
    </div>
    );
  }
  
export default WeatherContainer;
