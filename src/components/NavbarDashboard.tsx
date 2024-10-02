"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDashboardContext } from "@/utils/dashboardContext";
import { BalanceLg } from "./Balance";
import { MdToken } from "react-icons/md";
import toast from "react-hot-toast";
import { Logo } from "./Logo";
import { FaUserAlt } from "react-icons/fa";

export const NavbarDashboard = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const { user, wallet } = useDashboardContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsBlurred(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropDown(false);
      }
    };
    if (isDropDown) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropDown]);
  if (!user) return;
  return (
    <>
      <div className="flex justify-between items-center w-full m-auto z-0 f">
        <motion.div
          animate={{
            backgroundColor: ["#075985", "#0f766e", "#075985"],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-32 flex justify-center m-auto sticky"
        >
          .
        </motion.div>
        <motion.div
          animate={{
            backgroundColor: ["#0f766e", "#ce01e8", "#0f766e"],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-72 flex justify-center m-auto sticky"
        >
          .
        </motion.div>
        <motion.div
          animate={{
            backgroundColor: ["#ce01e8", "#075985", "#ce01e8"],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-32 flex justify-center m-auto sticky"
        >
          .
        </motion.div>
      </div>
      <nav
        className={`bg-sky-700 backdrop-blur-3xl  bg-opacity-20 w-full 
            py-2 px-2 grid grid-cols-3 fixed top-0 z-50 text-center items-center
                transition-all duration-300`}
      >
        <motion.h1 className="relative text-3xl font-extralight tracking-widest font-ibm-plex">
          <Link href="/dashboard" className=" flex flex-col w-full">
            <Logo />
            <p className="text-[10px] absolute font-thin -bottom-4 left-[4.5rem]">
              Dashboard
            </p>
          </Link>
        </motion.h1>
        <div className="grid grid-cols-3 m-auto items-center gap-4 justify-center pl-1">
          <div className="relative dropdown flex items-center">
            <button
              title="Utilize embedeed models or your owns"
              onClick={() => setIsDropDown(!isDropDown)}
              className="flex relative z-10  font-light tracking-widest text-xl items-center gap-1 "
            >
              Models
            </button>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={
                isDropDown ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.3 }}
              className={`absolute top-9 w-32 -left-8 mt-2 bg-blue-950 border border-white
                                 text-white
                                 rounded-xl p-2 shadow-lg ${
                                   isDropDown ? "flex flex-col" : "hidden"
                                 }`}
            >
              <li className="py-1 px-2 hover:bg-gray-700 rounded-md duration-300 ">
                <Link href="/dashboard/models/sdxl">SDXL</Link>
              </li>
              <li className="py-1 px-2 hover:bg-gray-700 rounded-md duration-300">
                <Link href="/dashboard/models/flux-schnell">Flux-Schnell</Link>
              </li>
            </motion.ul>
          </div>
          <div className="flex flex-col justify-end relative  min-w-20">
            <BalanceLg quantity={0} />
          </div>
          <Link
            href="/dashboard/trainings"
            title="Train your own custom model"
            className="font-light tracking-widest text-xl pl-1"
          >
            Training
          </Link>
        </div>
        <div className="flex justify-end items-center gap-2">
          <FaUserAlt size={40} className="rounded-full border p-1" />
        </div>
      </nav>
    </>
  );
};
