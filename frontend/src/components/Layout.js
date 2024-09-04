import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WalletConnection from "./WalletConnection";
import LandVerSVG from "../assets/map.svg";
import HowItWorksSVG from '../assets/how_landver_works.svg'

function Layout({ children }) {
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
    <div className="flex flex-col min-h-screen">
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
            <li>
              <button
                onClick={() => scrollToSection("/verify", "verify")}
                className="hover:text-gray-200 focus:outline-none"
              >
                Verify Land
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

      <section
        
        className="bg-white text-gray-800 py-12 px-4 md:py-16 md:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 transition transform hover:scale-105">
            Why Choose LandVer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-4 md:p-6 shadow-lg rounded-lg transition transform hover:scale-105">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Decentralized & Secure
              </h3>
              <p className="text-sm md:text-base">
                LandVer utilizes blockchain technology to ensure that your land
                records are tamper-proof and secure, offering peace of mind.
              </p>
            </div>
            <div className="text-center p-4 md:p-6 shadow-lg rounded-lg transition transform hover:scale-105">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Transparent Transactions
              </h3>
              <p className="text-sm md:text-base">
                All transactions are recorded on the blockchain, providing
                transparency and eliminating the need for intermediaries.
              </p>
            </div>
            <div className="text-center p-4 md:p-6 shadow-lg rounded-lg transition transform hover:scale-105">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Global Accessibility
              </h3>
              <p className="text-sm md:text-base">
                Access your land records from anywhere in the world with
                LandVer's intuitive and user-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="lands"
        className="bg-blue-50 text-gray-800 py-12 px-4 md:py-16 md:px-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition transform hover:scale-105">
              How It Works
            </h2>
            <p className="text-sm md:text-base mb-4">
              LandVer simplifies the process of land registration and management
              by leveraging blockchain technology. Here's how:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base">
              <li className="mb-2 transition transform hover:scale-105">
                <span className="font-semibold">Register:</span> Sign up and
                submit your land details.
              </li>
              <li className="mb-2 transition transform hover:scale-105">
                <span className="font-semibold">Verification:</span> Our system
                verifies and secures your land data on the blockchain.
              </li>
              <li className="mb-2 transition transform hover:scale-105">
                <span className="font-semibold">Management:</span> Manage,
                transfer, or sell your land with ease and security.
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={HowItWorksSVG}
              alt="How LandVer Works"
              className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-gray-100 text-gray-800 py-12 px-4 md:py-16 md:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 transition transform hover:scale-105">
            About Us
          </h2>
          <p className="text-sm md:text-base mb-4">
            LandVer is committed to transforming the land registration process
            with cutting-edge blockchain technology. Our mission is to provide a
            secure, transparent, and accessible platform for managing land
            records worldwide.
          </p>
          <p className="text-sm md:text-base">
            Our team consists of industry experts in blockchain technology, real
            estate, and software development, working together to create a
            reliable and user-friendly platform. We believe in the power of
            decentralization to enhance trust and security in land transactions.
          </p>
        </div>
      </section>

      <main className="flex-1" id="register">{children}</main>

      <footer className="bg-blue-800 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm md:text-base mb-2 md:mb-0">
            © {new Date().getFullYear()} LandVer. All rights reserved.
          </p>
          <div className="text-sm md:text-base">
            <a href="/privacy" className="hover:text-gray-300 mx-2">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-300 mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
