"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDashboardContext } from "../../utils/dashboardContext";
import Image from "next/image";
import { MdToken } from "react-icons/md";

export const LeftPanel = ({ color }: { color?: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, images, setSelectedImg } = useDashboardContext();
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  const openModal = (img: string) => {
    setSelectedImg(img);
  };
  return (
    <motion.div
      className={`z-50 fixed left-0 top-0 my-20 h-[86vh] ${
        color ? color : "bg-teal-700"
      } bg-opacity-20 backdrop-blur-md 
            border-y border-r border-white rounded-r-xl text-white`}
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <h2
        className="border-b border-white 
      text-2xl font-light text-center tracking-wide px-2"
      >
        Generated Content
      </h2>
      <motion.div className="w-80 h-full  flex flex-col items-start justify-start">
        <div className="grid grid-cols-3 row-auto gap-1 overflow-y-auto h-96 m-1">
          {images?.map((i) => (
            <Image
              alt="photo"
              key={i.uuid}
              src={i.image_url}
              width={200}
              height={200}
              className="rounded-md object-cover w-full h-full"
              onClick={() => setSelectedImg(i.image_url)}
            />
          ))}
        </div>
        <h2
          className="border-t border-white  w-full
      text-2xl font-light text-center tracking-wide px-2"
        >
          Trained Models
        </h2>
      </motion.div>

      <button
        className="absolute top-1/2 -right-[2.1rem] 
        bg-purple-700 bg-opacity-50
        sm:border-y sm:border-r border-y-2 border-r-2 border-white 
        rounded-r-xl text-white p-2 "
        onClick={togglePanel}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </motion.div>
  );
};

export const RightPanel = ({ color }: { color?: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useDashboardContext();
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <motion.div
        className={`z-50 fixed right-0 top-0 my-20 h-[86vh] ${
          color ? color : "bg-teal-700"
        } bg-opacity-20 backdrop-blur-md 
            border-y border-l border-white rounded-l-xl text-white`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="w-80 h-full flex flex-col justify-end">
          <div className="">
            <h2
              className="border-t border-white 
      text-2xl font-light text-center tracking-wide px-2"
            >
              Chat
            </h2>
          </div>
        </motion.div>
        <button
          className="absolute top-1/2 -left-[2.1rem]  bg-purple-700 bg-opacity-50 
        sm:border-y sm:border-l border-y-2 border-l-2 border-white rounded-l-xl text-white p-2 "
          onClick={togglePanel}
        >
          {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </motion.div>
    </>
  );
};
