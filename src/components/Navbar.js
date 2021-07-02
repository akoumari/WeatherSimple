import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import cities from "../city.list.json";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { matchSorter } from "match-sorter";
import useInterval from '@use-it/interval';
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
function NavBar(props) {
  const { handleCity, locButt } = props;
  const [options, setOptions] = useState(cityOptions);
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [drop, setDrop] = useState(false);
  useInterval(() => {
   if(value!=searchQuery){
     setDrop(false)
     setSearchQuery(value)
   }else if(value!=""&&!drop){setDrop(true)}
  }, 500);
  const handleChange = async (value) => {
    setValue(value)
    if(value==""){
      setOptions(cityOptions)
    }
  };
  const sendHandleCity = (city) => {
    handleCity(city.value);
  };
 
  const updateList = async (dis) => {
    //setIsFetching(true)
    console.log(`${dis.legnth}`)
    let tmp = cities
    
      setOptions([...matchSorter(tmp, dis, { keys: ["name"] }).slice(
        0,
        tmp.length > 10 ? 10 : tmp.length
        ).map((indvCity) => ({
          key: indvCity.id,
          value: indvCity.id,
          flag: "",
          text: indvCity.name + ", " + indvCity.country,
        }))])
      
    }
    // useEffect(() => {
    //   console.log(searchQuery);
      
    //   if (searchQuery !== "") {
    //     updateList(searchQuery)
    //   }
      
    // }, [searchQuery]);
    useEffect(async () => {
      console.log(searchQuery);
      
      if (searchQuery !== ""&&searchQuery.length>3) {
        if(drop)updateList(searchQuery)
        
        
      }
      else{
        setOptions(cityOptions)
      }

  }, [searchQuery, drop]);
  return (
    <>
      <Navbar className={"w-100 bg-clear useBorderB pb-0"} variant="dark">
        <div className={"row d-flex mx-2 mb-0 pb-0 w-100 align-items-center justify-content-between"}>
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
          <div className={"row mr-3 align-items-center justify-content-between"}>
          <DropdownButton
            variant={"btn-dark mr-5 text-light"}
            as="h1"
            id="dropdown-item-button"
            title={"Cities"}
            
            // onClick={()=>setDrop(!drop)}
            // show={drop}
            >
            <div className={"row m-1 align-items-center justify-content-center"}>

          <input className={"form-input mb-1 w-100 shadow-sm bg-white rounded"} onChange={async (e)=>{
            handleChange(e.target.value)
          }} value={value} />
            </div>
            {options.map((indvCity) => (
              <Dropdown.Item
              onClick={() => sendHandleCity(indvCity)}
              as="button"
              >
                  {indvCity.text}
                </Dropdown.Item>
              ))}
          </DropdownButton>
              {locButt}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
