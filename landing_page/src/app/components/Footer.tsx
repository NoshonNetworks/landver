import React from "react";
import { FaTelegram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FaTelegram,
      href: "https://t.me/+e3pDyYQQerk3NjFk",
      label: "Telegram",
    },
    {
      icon: FaGithub,
      href: "https://github.com/NoshonNetworks/landver",
      label: "GitHub",
    },
    { icon: FaTwitter, href: "https://x.com/landver0", label: "Twitter (X)" },
  ];

  return (
    <footer className="w-full py-8 px-4 mt-16 text-[#6e62e5]">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6">
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
              className="hover:text-gray-900 transition-colors"
              aria-label={social.label}
              target="_blank"
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
