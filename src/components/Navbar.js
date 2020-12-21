import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import cities from "../city.list.json";
import { Dropdown, DropdownButton } from "react-bootstrap";
function NavBar(props) {
  const {handleCity}= props;
const sendHandleCity= (city) =>{
  handleCity(city)
}
  return (
    <>
      <Navbar bg="dark" variant="dark">
          <div className={"container"}>

        <Navbar.Brand href="/">
        <FontAwesomeIcon icon={faCloud}
            width="70"
            height="30"
            color={"#00bdba"}
            className="d-inline-block mr-2"
          />{" "}
          Weather Simple GmbH
        </Navbar.Brand>
          <DropdownButton variant={"btn-dark text-light"} as="h1" id="dropdown-item-button" title="Cities">
        
        {cities.filter(indvCity=> indvCity.id == "292223"||indvCity.id == "5368361"|| indvCity.id == "2968815"||indvCity.name == "Tokyo" ).map((indvCity) => (
          <Dropdown.Item
            onClick={() => sendHandleCity(indvCity.id)}
            as="button"
          >
            {indvCity.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
          </div>
      </Navbar>
    </>
  );
}

export default NavBar;
