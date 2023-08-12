import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
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
