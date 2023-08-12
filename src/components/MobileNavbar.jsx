import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";



function MobileNavbar() {
 const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <nav className="lg:hidden bg-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-white hover:text-gray-300 font-semibold text-lg"
            >
              Diyke SASS
            </Link>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white hover:text-gray-300 font-semibold text-lg focus:outline-none"
              >
                <FaBars />
              </button>
              {dropdownOpen && (
                <div className="absolute bg-gray-800 mt-2 py-2 w-48 rounded shadow-lg">
                  <Link
                    to="/summerize"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Summerize Text
                  </Link>
                  <Link
                    to="/translate"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Translate Your Text
                  </Link>

                  <Link
                    to="/business-name-generator"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Generate Business Name
                  </Link>
                  <Link
                    to="/prompt-generator"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Generate AI Prompt
                  </Link>
                  <Link
                    to="/sql-generator"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Generate SQL Qurey
                  </Link>
                  {/* Add more links here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MobileNavbar
