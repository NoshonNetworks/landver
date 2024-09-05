import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WalletConnection from "./WalletConnection";
import LandVerSVG from "../assets/map.svg";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (path, id) => {
    navigate(path);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-700 text-white">
      <nav className="flex justify-between items-center p-4 md:p-6 flex-wrap">
        <div
          className="text-xl md:text-2xl font-bold cursor-pointer"
          onClick={() => scrollToSection("/", "home")}
        >
          LandVer
        </div>

        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:w-auto md:flex md:space-x-6 text-sm md:text-base mt-2 md:mt-0`}
        >
          <li className="md:inline-block">
            <button
              onClick={() => scrollToSection("/", "home")}
              className="block hover:text-gray-200 focus:outline-none py-2 md:py-0"
            >
              Home
            </button>
          </li>
          <li className="md:inline-block">
            <button
              onClick={() => scrollToSection("/register", "register")}
              className="block hover:text-gray-200 focus:outline-none py-2 md:py-0"
            >
              Register Land
            </button>
          </li>
          <li className="md:inline-block">
            <button
              onClick={() => scrollToSection("/verify", "register")}
              className="block hover:text-gray-200 focus:outline-none py-2 md:py-0"
            >
              Verify Land
            </button>
          </li>
          <li className="md:inline-block">
            <button
              onClick={() => scrollToSection("/lands", "lands")}
              className="block hover:text-gray-200 focus:outline-none py-2 md:py-0"
            >
              How it works
            </button>
          </li>
          <li className="md:inline-block">
            <button
              onClick={() => scrollToSection("/about", "about")}
              className="block hover:text-gray-200 focus:outline-none py-2 md:py-0"
            >
              About Us
            </button>
          </li>
        </ul>

        {/* Wallet Connection */}
        <div className="mt-4 md:mt-0">
          <WalletConnection />
        </div>
      </nav>

      <div
        id="home"
        className="flex flex-col items-center text-center py-12 px-4 md:py-16 md:px-6"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 transition transform hover:scale-105">
          Secure Your Land, Secure Your Future with LandVer
        </h1>
        <p className="text-base md:text-lg mb-6 md:mb-8">
          The most trusted platform for decentralized land registration and
          management.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4 mb-8">
          <button
            onClick={() => scrollToSection("/register", "register")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-full text-sm md:text-lg font-semibold transition transform hover:scale-105 hover:shadow-lg"
          >
            Register Your Land
          </button>
          <button
            onClick={() => scrollToSection("/lands", "register")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-full text-sm md:text-lg font-semibold transition transform hover:scale-105 hover:shadow-lg"
          >
           View Lands
          </button>
        </div>
        <img
          src={LandVerSVG}
          alt="LandVer Map"
          className="w-3/4 md:w-1/2 transition transform hover:scale-105"
        />
      </div>
    </header>
  );
};

export default Header;
