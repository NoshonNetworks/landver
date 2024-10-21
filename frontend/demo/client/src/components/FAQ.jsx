import React from 'react'
import LandVerSVG from "../assets/map.svg";
import HowItWorksSVG from "../assets/how_landver_works.svg";
const FAQ = () => {
  return (
    <>
      <section className="bg-white text-gray-800 py-12 px-4 md:py-16 md:px-6">
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
    </>
  );
}

export default FAQ