import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 px-4">
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
    );
};

export default Footer;
