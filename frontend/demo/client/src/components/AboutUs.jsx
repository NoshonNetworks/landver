import React from 'react'

const AboutUs = () => {
  return (
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
          secure, transparent, and accessible platform for managing land records
          worldwide.
        </p>
        <p className="text-sm md:text-base">
          Our team consists of industry experts in blockchain technology, real
          estate, and software development, working together to create a
          reliable and user-friendly platform. We believe in the power of
          decentralization to enhance trust and security in land transactions.
        </p>
      </div>
    </section>
  );
}

export default AboutUs