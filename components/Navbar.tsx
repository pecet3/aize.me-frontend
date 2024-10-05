"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { motion, scroll, scrollInfo, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; // Ikony hamburger i zamknięcia
import { Logo } from "./Logo";
import { useInView } from "react-intersection-observer";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const [ref, inView] = useInView();

  useEffect(() => {
    setTimeout(() => {
      let y = scrollY.get();
      if (y > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 50);
  }, [inView]);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  if (pathname[1] === "d") {
    return;
  }

  return (
    <>
      <motion.nav
        className={`bg-black w-full py-4 sm:py-6 px-4 md:px-16 lg:px-32 fixed top-0 z-50 flex justify-between items-center
                transition-all duration-300 text-xl ${
                  isVisible && !isMenuOpen
                    ? "bg-opacity-25 backdrop-blur-lg"
                    : "bg-opacity-0"
                }`}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className=" text-4xl sm:text-3xl font-extralight tracking-wide md:tracking-widest "
        >
          <Link href="/" className="flex items-center m-auto">
            <Logo />
          </Link>
        </motion.h1>

        {/* Desktop Links */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="hidden md:flex gap-2 sm:gap-4  items-center font-extralight tracking-widest"
        >
          <Link href="/blog">Blog</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </motion.div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}{" "}
            {/* Zmiana ikony w zależności od stanu */}
          </button>
        </div>
        <Link
          href="/dashboard"
          className="tracking-wide absolute top-0 right-0 text-sm font-extralight 
          bg-white bg-opacity-10  rounded-bl-lg px-2"
        >
          Dashboard
        </Link>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden text-2xl font-ibm-plex backdrop-blur-md bg-black bg-opacity-40 
          w-full fixed top-0 z-40 py-8 pt-16 px-6"
        >
          <div className="flex flex-col items-center space-y-4 text-white">
            <Link href="/blog" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/pricing" onClick={toggleMenu}>
              Pricing
            </Link>
            <Link href="/about" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/dashboard" onClick={toggleMenu}>
              Dashboard
            </Link>
          </div>
        </motion.div>
      )}
      <div ref={ref}></div>
    </>
  );
};
