import Image from "next/image";
import { BiWindows } from "react-icons/bi";
import { HiOutlineCursorClick } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";
import { animate, delay, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useLayoutEffect } from "react";

export const TrainingInfoSection = () => {
  const controlBrowser = useAnimation();
  const [refBrowser, inViewBrowser] = useInView();
  const browserVariants = {
    visible: { opacity: 1, scale: [0.2, 1, 1.05, 1], y: 0 },
    hidden: { opacity: 0, scale: 0, y: 100 },
  };
  useEffect(() => {
    if (inView) {
      controlBrowser.start("visible");
    } else {
      controlBrowser.start("hidden");
    }
    console.log(inView);
  }, [controlBrowser, inViewBrowser]);

  const control = useAnimation();
  const [ref, inView] = useInView();

  const [finalRef, inFinalView] = useInView();
  const image1Variants = {
    visible1: { opacity: 1, scale: 1, y: -10, rotate: -12 },
    hidden: { opacity: 0, scale: 0.2, y: -50, rotate: 0 },
  };
  const image2Variants = {
    visible2: { opacity: 1, scale: 1, y: -15 },
    hidden: { opacity: 0, scale: 0, y: -50 },
  };
  const image3Variants = {
    visible3: { opacity: 1, scale: 1, y: -9, rotate: 12 },
    hidden: { opacity: 0, scale: 0, y: -30 },
  };

  const controlFinal = useAnimation();

  const finalStepVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 1 },
  };
  const finalButtonVariants = {
    clicked: { opacity: 1, scale: [1, 0.9, 1] },
  };
  useEffect(() => {
    if (inView) {
      control.start("visible1");
      control.start("visible2");
      control.start("visible3");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  useEffect(() => {
    if (inFinalView) {
      controlFinal.start("visible");
      controlFinal.start("clicked");
    }
    console.log(inFinalView, true);
  }, [controlFinal, inFinalView]);
  return (
    <section
      id="offer"
      className="h-auto bg-noise3 flex flex-col 
        w-full pb-24 lg:px-0 px-4
        justify-start items-center 
       "
    >
      <motion.h2
        className="underline decoration-4 decoration-wavy underline-offset-2 py-16 px-4
       decoration-teal-400 font-ibm-plex text-4xl md:text-5xl text-center m-auto tracking-wider"
      >
        How it Works?
      </motion.h2>
      <div
        className="bg-white bg-opacity-5 rounded-xl pb-4 px-4 flex flex-col 
      md:max-w-6xl w-full items-start justify-start gap-4"
      >
        <div className="flex md:flex-row flex-col w-full  justify-between items-end my-0 gap-0">
          <div
            className="flex flex-col w-full md:w-auto items-center justify-center
           bg-black bg-opacity-30 rounded-2xl mt-4"
          >
            <span className="flex m-auto items-center translate-x-4 -translate-y-6">
              <motion.div
                ref={ref}
                variants={image1Variants}
                initial="hidden"
                animate={control}
                whileInView="visible1"
                whileHover={{ scale: 1.03, y: -15 }}
                transition={{ duration: 0.5 }}
                className="h-auto right-10 bg-gray-300 shadow-lg
                 shadow-black 
                p-1 rounded-xl 
              pb-6"
              >
                <Image
                  alt=""
                  src={"/example1.png"}
                  height={400}
                  width={400}
                  className="rounded-md h-40 w-32"
                />
              </motion.div>
              <motion.div
                ref={ref}
                variants={image2Variants}
                initial="hidden"
                animate={control}
                whileInView="visible2"
                whileHover={{
                  scale: 1.03,
                  y: -30,
                }}
                transition={{ duration: 0.5 }}
                className="bg-gray-300 shadow-lg shadow-black 
                 p-1 z-30 rounded-xl pb-6
              "
              >
                <Image
                  alt=""
                  src={"/example7.png"}
                  height={400}
                  width={400}
                  className="rounded-md h-60 w-48"
                />
              </motion.div>
              <motion.div
                ref={ref}
                variants={image3Variants}
                initial="hidden"
                animate={control}
                whileInView="visible3"
                whileHover={{
                  scale: 1.03,
                  y: -20,
                }}
                transition={{ duration: 0.5 }}
                className=" bg-gray-300 shadow-lg
                 shadow-black p-1 rounded-xl pb-6 "
              >
                <Image
                  alt=""
                  src={"/example2.png"}
                  height={400}
                  width={400}
                  className="rounded-md h-40 w-40"
                />
              </motion.div>
            </span>
            <span className="-translate-y-6 flex items-center flex-col">
              <p className="text-xs ">Object Name</p>
              <p className="text-2xl px-2 font-ibm-plex rounded-xl  bg-white bg-opacity-20 ">
                CLIFFORD
              </p>
            </span>
          </div>
          <h3 className="text-center italic font-thin m-auto text-5xl p-2">
            1. Upload the images for <br></br> the training via form.
          </h3>
        </div>
        <Image
          alt=""
          src={"/arrow.png"}
          height={400}
          width={400}
          className="rounded-xl h-32 w-32 self-center opacity-80 mr-40"
        />
        <div
          className="flex md:flex-row flex-col-reverse justify-center 
        gap-12 items-center m-auto w-full"
        >
          <h3 className="text-left font-light text-4xl m-0 ">
            2. Start training and wait <br></br>~30min for the complete
          </h3>
          {"   "}
          <motion.div
            ref={refBrowser}
            variants={browserVariants}
            initial="hidden"
            animate={controlBrowser}
            whileInView="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-96 h-64 grid grid-rows-9 bg-blue-950
            rounded-xl border-2 border-white backdrop-blur-sm hover:scale-[1.01]
             shadow-lg  hover:shadow-gray-900"
          >
            <span
              className="border-b flex items-center justify-between
               border-white w-full px-1"
            >
              <span className="flex items-center gap-0.5">
                {"< >"}
                <IoMdRefresh size={16} />
              </span>
              <span className="w-48 h-4 border border-white text-[10px] tracking-tighter">
                https://aize.me/dashboard/trainings
              </span>
              <span className="flex items-center gap-0.5 ">
                _<BiWindows size={12} /> X
              </span>
            </span>
            <span
              className="text-sm w-full h-full flex flex-col m-auto items-center 
              justify-end"
            >
              <div className="flex items-center justify-between w-full h-full bg-white bg-opacity-10">
                <span className="flex items-center">
                  {" "}
                  <p
                    className="font-light text-center pl-0 sm:pl-1.5 mx-0.5 rounded-md bg-opacity-20
                         bg-white p-0.5 px-[0.40rem]"
                  >
                    Ai
                  </p>
                  <p className="font-ibm-plex  text-white">ZE</p>
                  <p className="italic font-ibm-plex text-gray-400">.</p>
                  <p className="italic font-ibm-plex text-gray-200">me</p>
                </span>
                <p className="text-2xl">☺</p>
              </div>
            </span>
            <span className="flex w-full row-start-6 justify-between items-center">
              <span className="rounded-r-xl bg-white w-16 h-32  bg-opacity-10"></span>
              <button className="opacity-80 border font-bold text-2xl border-white p-1 px-2 rounded-xl">
                Start Training
              </button>
              <span className="rounded-l-xl bg-white w-16 h-32  bg-opacity-10"></span>
            </span>
            <HiOutlineCursorClick
              size={72}
              className="absolute top-36 right-20 "
            />
          </motion.div>
        </div>
        <Image
          alt=""
          src={"/arrow_w.png"}
          height={400}
          width={400}
          className="rounded-xl -rotate-12 h-48 w-48 self-center opacity-90 mt-4 "
        />
        <div className="flex flex-col-reverse md:flex-col items-center m-auto">
          <h3 className="text-center font-extrabold text-4xl m-auto my-6">
            3. Voilà! Your custom model is ready<br></br> to usage*
          </h3>
          <div className="flex m-auto flex-col max-w-lg md:max-w-xl bg-opacity-15 bg-black p-4 rounded-xl">
            <motion.div
              variants={finalStepVariants}
              initial="hidden"
              animate={controlFinal}
              transition={{ duration: 0.7, delay: 5.2 }}
              className="rounded-xl  border-2 "
            >
              <Image
                alt=""
                src={"/example12.png"}
                height={400}
                width={400}
                className="rounded-xl z-0
              object-center w-full h-80 self-center"
              />
            </motion.div>
            <div
              className="text-sm rounded-t-xl px-2 w-fit justify-between items-center
             flex text-teal-400 mt-2
           mr-0 bg-black bg-opacity-30 font-mono font-extrabold py-1"
            >
              prompt
            </div>
            <div
              className="flex w-80 sm:w-[28rem] h-24 m-0  max-w-lg pl-2
            rounded-xl rounded-tl-none bg-white backdrop-blur-sm bg-opacity-15"
            >
              <div ref={finalRef} className="w-full">
                {inFinalView ? (
                  <TypeAnimation
                    sequence={[
                      0,
                      `A realistic photo of CLIFFORD sitting on the roof.
                Tropical Beach in the background and sunny weather.`,
                      ,
                    ]}
                    wrapper="p"
                    speed={70}
                    cursor={true}
                    className="w-full "
                  />
                ) : null}
              </div>
              <motion.button
                initial="hidden"
                variants={finalButtonVariants}
                animate={controlFinal}
                transition={{ duration: 0.7, delay: 4.4 }}
                className="rounded-xl border border-white m-2 bg-teal-600"
              >
                Generate
              </motion.button>
            </div>
          </div>
        </div>
        <p className="text-lg text-right self-end">
          *You can use a Custom Model<br></br> in commercial purpouses
        </p>
      </div>
    </section>
  );
};
