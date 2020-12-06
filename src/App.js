import logo from './logo.svg';
import './App.css';
import WeatherContainer from './components/WeatherContainer';
import Navbar from "./components/Navbar" 

function App() {
  return (
    <>
    
        <Navbar/>
      <div className={"container"}>
        <WeatherContainer/>
      </div>
    </>
  );
}

export default App;
