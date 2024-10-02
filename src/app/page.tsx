"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import React from "react";
import { FaArrowRight, FaRegFileImage } from "react-icons/fa6";
import { MainGrid } from "@/components/MainGrid";
import { PiFileTxtBold } from "react-icons/pi";

import { TrainingInfoSection } from "@/components/TrainingInfoSection";
import { BalanceLg } from "@/components/Balance";
import { OtherProducts } from "@/components/OtherProductsSection";
import { BsGoogle } from "react-icons/bs";

export default function Home() {
  return (
    <main>
      <section
        className="m-auto h-screen flex flex-col-reverse md:flex-row
      gap-4 sm:gap-16 items-center justify-end sm:justify-center 
      p-2 sm:p-4 max-w-4xl sm:max-w-7xl"
      >
        <div
          className="justify-center text-2xl 
            font-bold   flex  flex-col gap-2
                items-center"
        >
          <TypeAnimation
            sequence={[100, "We Will AiZE You", 1000]}
            wrapper="span"
            speed={20}
            cursor={false}
            className=" m-auto md:-top-16 font-extrabold 
            tracking-widest md:mt-auto w-96
       text-white col-span-4 left-1.5 text-center text-7xl "
          />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.3 }}
          >
            <p className="italic text-gray-300">And other cool things</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, rotate: 0 }}
              whileTap={{ scale: 1 }}
              color={"black"}
              animate={{
                backgroundColor: ["#0d9488", "#0f53b6", "#0d9488"],
                y: [0],
                scale: [1, 1.05, 1],
                rotate: [0],
                transition: {
                  duration: 2,
                  delay: 1,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              disabled={true}
              className="flex px-4 text-2xl font-ibm-plex tracking-tight
                items-center border-2 border-white rounded-lg
                 bg-teal-600 m-auto shadow-lg hover:shadow-slate-900"
            >
              <BsGoogle className="mx-2" /> Sign Up
            </motion.button>
          </motion.div>
        </div>

        <MainGrid />
      </section>
      <h1 className="text-6xl">Opening Soon...</h1>
      {/* <TrainingInfoSection />
      <OtherProducts /> */}
    </main>
  );
}
