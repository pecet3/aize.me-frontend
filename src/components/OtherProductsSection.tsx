import { FaArrowRight, FaRegFileImage } from "react-icons/fa6";
import { BalanceLg } from "./Balance";
import { PiFileTxtBold } from "react-icons/pi";

export const OtherProducts = () => {
  return (
    <section
      id="pricing"
      className="h-auto bg-noise4 flex flex-col 
        w-full pb-24 lg:px-0 px-4
        justify-start items-center 
       "
    >
      <h2
        className="underline decoration-4 decoration-wavy underline-offset-2 py-16 px-4
       decoration-teal-400 font-ibm-plex text-4xl md:text-5xl text-center m-auto tracking-wider"
      >
        Other Products <div className="">&</div> Features
      </h2>
      <div
        className="grid grid-cols-1 lg:grid-cols-3 max-w-6xl
          md:flex-row justify-start items-center
        gap-4 sm:gap-8  text-base sm:text-xl"
      >
        <div
          className="grid grid-rows-6 p-4 gap-4 bg-black backdrop-blur-lg
              hover:scale-[1.02] h-96 md:h-[56vh]
  duration-500 hover:shadow-2xl hover:cursor-pointer shadow-black
  bg-opacity-10 border-2 border-white  rounded-xl  max-w-lg"
        >
          <h3 className="text-3xl text-center font-bold row-span-1">
            Txt2Img Models
          </h3>
          <div className="row-span-3 self-center flex justify-center items-center gap-1">
            <PiFileTxtBold size={96} />
            <FaArrowRight size={40} />

            <FaRegFileImage size={96} />
          </div>
          <p>
            Currently available models: Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nostrum nesciunt reprehenderit quod
          </p>
        </div>
        <div
          className=" flex-col p-4 gap-4 bg-black backdrop-blur-lg
              hover:scale-[1.02] h-full
  duration-500 hover:shadow-2xl hover:cursor-pointer shadow-black 
  bg-opacity-10 border-2 border-white  rounded-xl flex max-w-lg "
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          nesciunt reprehenderit quod illo praesentium aliquid velit alias
          assumenda. Odio, sapiente porro, magni voluptas asperiores earum
          provident dolore, enim minus repellat in quos eos corrupti
          necessitatibus consequatur explicabo officiis esse nam veniam maiores.
          Eaque quod et nesciunt illum labore officia molestiae?
          <BalanceLg quantity={400} />
        </div>
        <div
          className=" flex-col p-4 gap-4 bg-black backdrop-blur-lg
              hover:scale-[1.02] h-full
  duration-500 hover:shadow-lg hover:cursor-pointer shadow-black
  bg-opacity-10 border-2 border-white  rounded-xl flex max-w-lg "
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          nesciunt reprehenderit quod illo praesentium aliquid velit alias
          assumenda. Odio, sapiente porro, magni voluptas asperiores earum
          provident dolore, enim minus repellat in quos eos corrupti
          necessitatibus consequatur explicabo officiis esse nam veniam maiores.
          Eaque quod et nesciunt illum labore officia molestiae?
          <BalanceLg quantity={400} />
        </div>
      </div>
    </section>
  );
};
