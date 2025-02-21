"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, menuSlide, slideIn } from "../utils/animations";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className="relative"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="flex justify-between items-center p-4 md:p-8">
        <motion.div className="flex items-center gap-2" variants={slideIn}>
          <Image src="/images/logo.svg" alt="logo" height={100} width={100} />
          <nav className="md:flex items-center gap-6 hidden">
            {["Register Land", "Inspect Land", "Buy Land"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href="https://demo.landver.net/"
                    className="hover:text-gray-600 transition-colors text-sm"
                    target="_blank"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </nav>
        </motion.div>

        <motion.div
          className="hidden md:flex items-center gap-8"
          variants={fadeIn}
        >
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/signin"
                className="text-[#6364d5] hover:text-[#4e4fb8] transition-colors text-sm"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                className="text-white rounded text-sm py-3 px-6 bg-[#6364d5]"
                href="/signup"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white border-t md:hidden"
            variants={menuSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <nav className="flex flex-col p-4 gap-4">
              {/* Mobile menu items */}
              {["Register Land", "Inspect Land", "Buy Land"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href="https://demo.landver.net"
                      target="_blank"
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
              <motion.div
                className="flex flex-col gap-2 pt-2 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/signin"
                  className="p-2 text-[#6364d5] hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <div className="px-2">
                  <Link
                    className="text-white rounded text-sm py-3 px-6 bg-[#6364d5] block text-center"
                    href="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
