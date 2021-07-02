import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import WeatherContainer from "./components/WeatherContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import cities from "./city.list.json";


function App() {
  const [city, setCity] = useState(2643743);
  const [locCity, setLocCity] = useState(2643743);
  const [locCityBox, setLocCityBox] = useState(<WeatherContainer city={`id=${locCity}`} />);
  const handleCity = (newCity) =>{
    setCity(newCity)
    console.log(newCity)
  }
  let local = []
  const checkPos = (currLon, currLat, checkLon, checkLat) => {
    if(!(currLon<0&&checkLon<0)&&!(currLon>0&&checkLon>0)||!(currLat<0&&checkLat<0)&&!(currLat>0&&checkLat>0)){
      //Different hemisphere 
      return {diffLon:5000,diffLat:5000}
    }
    let abCurrLon = Math.abs(currLon)
    let abCurrLat = Math.abs(currLat)
    let abCheckLat = Math.abs(checkLat)
    let abCheckLon = Math.abs(checkLon)
    return {diffLon:Math.abs(abCurrLon - abCheckLon),diffLat:Math.abs(abCurrLat - abCheckLat)}

  } 
 const getLocal = () => {
   navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);

      cities.map(city => {

        if(city.coord){
          let dif = checkPos(position.coords.longitude, position.coords.latitude, city.coord.lon, city.coord.lat )
          if(dif.diffLat<0.1 && dif.diffLon<0.1){
            console.log(`${city.name} lat: ${dif.diffLat} lon: ${dif.diffLon}`)

        local.push({...city,...dif})
        local.sort((a,b)=>{
          return (a.diffLat+a.diffLon) - (b.diffLat+b.diffLon);
        })
          }
        }
        
      } )
      console.log(local)
      if(local.length>1){
        if(locCity==local[0].id){
          setLocCity("")
          setTimeout(() => {
            
            setLocCity(local[0].id)
          },50)
        }else{
          setLocCity(local[0].id)

        }
      }
      
    });
  }
  useEffect(() => {
  setLocCityBox("")
setLocCityBox(<WeatherContainer city={`id=${locCity}`} />)
console.log(locCity)
}, [locCity])
  return (
    <>
      <Navbar locButt={ <button className={"btn mt-1 btn-sm btn-info"} onClick={getLocal}><FontAwesomeIcon
              icon={faMapMarkerAlt}
              width="70"
              height="30"
              color={"000"}
              className="d-inline-block mr-2"
            />Use location</button>} handleCity={handleCity} />
      <div className={"container"}>
      
      
       
          <div className={"row d-flex justify-content-between p-5"}>
            {locCityBox}
            <WeatherContainer city={"id=5128581"} />
            <WeatherContainer city={"q=Athens"} />
            <WeatherContainer city={`id=${city}`} />

          </div>
        
          <div className={"row  justify-content-center p-5"}>

          </div>
      </div>
    </>
  );
}

export default App;
