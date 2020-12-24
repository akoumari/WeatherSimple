import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import cities from "../city.list.json";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { matchSorter } from "match-sorter";

function NavBar(props) {
  const { handleCity } = props;
  const cityOptions = cities
    .filter(
      (indvCity) =>
        indvCity.id == "292223" ||
        indvCity.id == "5368361" ||
        indvCity.id == "2968815" ||
        indvCity.name == "Tokyo"
    )
    .map((indvCity) => ({
      key: indvCity.id,
      value: indvCity.id,
      flag: "",
      text: indvCity.name,
    }));
  const [options, setOptions] = useState(cityOptions);
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [drop, setDrop] = useState(false);

  const handleChange = (value) => setValue(value);
  const sendHandleCity = (city) => {
    handleCity(city.value);
  };

  const updateList = async (searchQuery) => {
    setIsFetching(true)
    let tmp = cities.map((indvCity) => ({
      key: indvCity.id,
      value: indvCity.id,
      flag: "",
      text: indvCity.name + ", " + indvCity.country,
    }));
    tmp = matchSorter(tmp, searchQuery, { keys: ["text"] }).slice(
      0,
      tmp.length > 10 ? 10 : tmp.length
    );
    return tmp;
  }
  useEffect(() => {
    console.log(searchQuery);

      if (searchQuery !== "") {
        updateList(searchQuery).then((tmp)=>{
            setIsFetching(false)
            setDrop(true)
            setOptions(tmp);
          }

        )
      }

  }, [searchQuery]);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <div className={"container"}>
          <Navbar.Brand href="/">
            <FontAwesomeIcon
              icon={faCloud}
              width="70"
              height="30"
              color={"#00bdba"}
              className="d-inline-block mr-2"
            />{" "}
            Weather Simple GmbH
          </Navbar.Brand>
          <div className={"row align-items-center justify-content-between"}>

          <input className={"form-input m-1"} onChange={(e)=>handleChange(e.target.value)} value={value} /><button className={"btn btn-primary"} onClick={()=> {setSearchQuery(value)}}>{isFetching?<div class="spinner-border">Get Cities</div>:"Get Cities"}</button>
          <DropdownButton
            variant={"btn-dark text-light"}
            as="h1"
            id="dropdown-item-button"
            title={"Cities"}
            onClick={()=>setDrop(!drop)}
            show={drop}
          >
            {options.map((indvCity) => (
                <Dropdown.Item
                  onClick={() => sendHandleCity(indvCity)}
                  as="button"
                >
                  {indvCity.text}
                </Dropdown.Item>
              ))}
          </DropdownButton>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
