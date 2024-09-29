import { useState } from "react";
import { FaGithub } from "react-icons/fa"; // Install react-icons if you haven't
import landverImg from "/LANDVER_LOGO_WHITE-removebg-preview.png";

import { SunDim,Home,Search } from "lucide-react";
import {  FaX } from "react-icons/fa6";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  let [isSearchIconClicked, setIsSearchIconClicked] = useState<boolean>(false);
  return (
    <header className="text-black ">
      <nav className="flex items-center justify-between  border ">
        <div className="flex items-center ">
          <div className="md:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <img src={landverImg} alt="" className="w-[3.5em] ml-3" />
          {isSearchIconClicked ? (
            <Home size={40} />
          ) : (
            <ul>
              <li className="hover:text-gray-400 font-bold ">Home</li>
            </ul>
          )}

          <ul className="hidden md:flex space-x-6 items-center ml-2">
            <li className="hover:text-gray-400">API</li>
            <li className="hover:text-gray-400">GUIDES</li>
            <select
              name=""
              id=""
              className="border-2 border-black rounded p-2 bg-inherit"
            >
              <option value="">0.3</option>
              <option value="">0.2</option>
              <option value="">0.1</option>
            </select>
          </ul>
        </div>
        <div className="flex items-center p-2 ">
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/NoshonNetworks/landver/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <FaGithub className="w-8 h-8 inline mr-2" />
              <span>Github</span>
            </a>
          </div>

          <div>
            <button>
              <SunDim className="p-3 h-[60px] hidden md:block" size={60} />
            </button>
          </div>
          {/* Search bar */}
          <div className="">
            <input
              type="search"
              name=""
              id=""
              className="border-2  border-gray-800 p-3 bg-inherit rounded hidden md:block"
              placeholder="Search"
            />
            {isSearchIconClicked ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Docs"
                  className={`p-3 rounded-lg bg-inherit  text-black border-2 border-black  placeholder:text-center  w-[80%] block ${
                    isSearchIconClicked
                      ? "sm:absolute smLtop-2 sm:left-1 md:block lg:block"
                      : ""
                  } md:w-fit`}
                />
                <FaX
                  onClick={() => setIsSearchIconClicked(false)}
                  className=" p-4 rounded text-gray-700"
                  size={45}
                />
              </div>
            ) : (
              <Search
                className="h-[50px] md:hidden"
                size={30}
                onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-[80%] h-full bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full "
        }`}
      >
        <div className="flex items-center justify-around border">
          <div className="grid grid-cols-2 items-center justify-evenly p-3 py-0  ">
            <img src={landverImg} alt="" className="w-[3.5em]" />
            <ul>
              <li className="hover:text-gray-400 font-bold ">Home</li>
            </ul>
          </div>
          <div>
            <button>
              <SunDim className=" h-[77px] " size={40} />
            </button>
          </div>
          <FaX onClick={() => setIsOpen(false)} className=" h-[75px]" />
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-6 text-2xl">
          <a href="#" onClick={() => setIsOpen(false)}>
            API
          </a>
          <a href="#" onClick={() => setIsOpen(false)}>
            GUIDES
          </a>
          <select
            name=""
            id=""
            className="border-2 border-black rounded p-2 bg-inherit"
          >
            <option value="">0.3</option>
            <option value="">0.2</option>
            <option value="">0.1</option>
          </select>

          <a
            href="https://github.com/NoshonNetworks/landver/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <FaGithub className="w-8 h-8" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
