import React, { useState } from "react";
import { Link } from "react-router-dom";

import MobileNavbar from "./MobileNavbar";
import ComputerNavBar from "./ComputerNavBar";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <ComputerNavBar/>
     <MobileNavbar/>
    </>
  );
}

export default Navbar;
