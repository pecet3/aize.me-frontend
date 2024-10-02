"use client";
import React from "react";
import { useDashboardContext } from "@/utils/dashboardContext";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModelTrainingImage } from "@/app/types";
import toast from "react-hot-toast";

export const Trainer = () => {
  const { lastModelTraining } = useDashboardContext();

  const variants = {
    hidden: { opacity: 0.5, y: 100, scale: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <>
      {lastModelTraining.model_training.status === "initialized" &&
      lastModelTraining.images &&
      lastModelTraining.images.length > 4 ? (
        <motion.div
          animate="visible"
          variants={variants}
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-4 flex flex-col gap-2 items-center px-16 rounded-t-xl fixed bottom-0 border-t 
          border-x border-white bg-teal-700 backdrop-blur-md  bg-opacity-20"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, rotate: 0 }}
            whileTap={{ scale: 1 }}
            animate={{
              backgroundColor: ["#00ced1", "#0f53b6", "#ce01e8", "#00ced1"],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="text-2xl font-ibm-plex p-0.5 px-2 flex items-center
border border-white rounded-lg justify-center gap-1 bg-purple-700 m-auto"
          >
            Start Training
          </motion.button>
          <p className="text-xs ">It usually takes around 30 minutes</p>
        </motion.div>
      ) : null}
    </>
  );
};
