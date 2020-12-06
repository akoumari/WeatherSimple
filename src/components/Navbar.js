import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
function NavBar() {
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
          </div>
      </Navbar>
    </>
  );
}

export default NavBar;
