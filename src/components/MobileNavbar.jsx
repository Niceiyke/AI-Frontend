import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const links = [
  { to: "/chat", text: "Chat" },
  { to: "/summerize", text: "Summerize Text" },
  { to: "/translate", text: "Translate Your Text" },
  { to: "/business-name-generator", text: "Generate Business Name" },
  { to: "/prompt-generator", text: "Generate AI Prompt" },
  { to: "/sql-generator", text: "Generate SQL Query" },
  // Add more links here
];

function MobileNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownStyles = {
    container: "fixed  bg-gray-800 mt-2 py-2 w-48 rounded shadow-lg right-0",
    link: "block px-4 py-2 text-white hover:bg-gray-700",
  };

  return (
    <React.Fragment>
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
                <div className={dropdownStyles.container}>
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className={dropdownStyles.link}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MobileNavbar;
