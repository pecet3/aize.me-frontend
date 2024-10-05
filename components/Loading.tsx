import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 my-72">
      <AiOutlineLoading size={96} className="animate-spin" />

      <h1 className="text-4xl font-ibm-plex tracking-wider">Loading</h1>
    </div>
  );
};
