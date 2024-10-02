import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
export const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-12 my-72">
      <div className="flex flex-wrap justify-center  gap-8 items-center">
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            transition: {
              delay: 0,
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <GoDotFill size={80} />
        </motion.div>
        <motion.div
          animate={{
            scale: [0.9, 1.2, 0.9],
            transition: {
              delay: 0.05,
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <GoDotFill size={80} />
        </motion.div>
        <motion.div
          animate={{
            scale: [0.9, 1.2, 0.9],
            transition: {
              delay: 0.1,
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <GoDotFill size={80} />
        </motion.div>
      </div>
      <h1 className="text-4xl font-ibm-plex tracking-wider">Loading</h1>
    </div>
  );
};
