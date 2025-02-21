"use client";
import React from "react";
import { FaTelegram, FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

const Footer: React.FC = () => {
  const links = [
    { name: "Home", href: "#" },
    { name: "Experience", href: "#experience" },
    { name: "About us", href: "#about" },
    { name: "Contact", href: "#contact" },
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

  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.1,
      color: "#4e4fb8",
      transition: { duration: 0.2 },
    },
  };

  const socialIconVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.2,
      rotate: 8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      className="w-full py-8 px-4 mt-16 text-[#6e62e5]"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <motion.div className="max-w-6xl mx-auto" variants={staggerContainer}>
        <motion.nav
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6"
          variants={fadeInUp}
        >
          {links.map((link) => (
            <motion.div
              key={link.name}
              variants={linkVariants}
              whileHover="hover"
            >
              <Link
                href={link.href}
                className="text-[#6e62e5] transition-colors text-sm"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          className="flex justify-center items-center gap-6 mb-6"
          variants={fadeInUp}
        >
          {socialLinks.map((social) => (
            <motion.div
              key={social.label}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Link
                href={social.href}
                scroll={false}
                className="text-sm"
                aria-label={social.label}
                target="_blank"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center text-sm"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <p>© Landver {new Date().getFullYear()} | All Rights Reserved</p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
