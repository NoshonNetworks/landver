import React from "react";
import { Facebook, Twitter,  Youtube } from "lucide-react";

const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="w-full py-8 px-4 mt-16 b] text-[#6e62e5]">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 ">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#6e62e5] hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex justify-center items-center gap-6 mb-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className=" hover:text-gray-900 transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© Landver {new Date().getFullYear()} | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
