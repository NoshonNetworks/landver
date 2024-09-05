import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WalletConnection from "./WalletConnection";
import LandVerSVG from "../assets/map.svg";

const Header = () => {
  const navigate = useNavigate();
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
        <ul className="flex space-x-4 md:space-x-6 text-sm md:text-base mt-2 md:mt-0">
          <li>
            <button
              onClick={() => scrollToSection("/", "home")}
              className="hover:text-gray-200 focus:outline-none"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("/register", "register")}
              className="hover:text-gray-200 focus:outline-none"
            >
              Register Land
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("/lands", "lands")}
              className="hover:text-gray-200 focus:outline-none"
            >
              Land List
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("/about", "about")}
              className="hover:text-gray-200 focus:outline-none"
            >
              About Us
            </button>
          </li>
        </ul>
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
          <Link
            to="/lands"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-full text-sm md:text-lg font-semibold transition transform hover:scale-105 hover:shadow-lg"
          >
            View Lands
          </Link>
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
