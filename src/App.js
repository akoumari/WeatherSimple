import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import WeatherContainer from "./components/WeatherContainer";
import Navbar from "./components/Navbar";

function App() {
  const [city, setCity] = useState(2643743);
  const handleCity = (newCity) =>{
    setCity(newCity)
    console.log(newCity)
  }
  return (
    <>
      <Navbar handleCity={handleCity} />
      <div className={"container"}>
      
       
       
          <div className={"row d-flex justify-content-between p-5"}>
            <WeatherContainer city={"q=Toronto"} />
            <WeatherContainer city={"id=5128581"} />

          </div>
        
          <div className={"row  justify-content-center p-5"}>
            <WeatherContainer city={"q=Athens"} />
            <WeatherContainer city={`id=${city}`} />

          </div>
      </div>
    </>
  );
}

export default App;
