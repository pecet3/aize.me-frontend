import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

// export const MainGridold = () => {
//     return (
//         <div className="
//         grid grid-cols-1 sm:grid-cols-12 grid-rows-5 px-4
//         items-start gap-4 text-black w-full text-xs absolute -top-[4.8rem]">
//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 className="col-span-2 row-span-5 self-center flex flex-col gap-4"
//             >
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="rounded-xl w-full col-span-2 row-span-2 self-start">
//                     <Image src={"/example7.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="rounded-xl w-full col-span-2 row-span-2 self-start">
//                     <Image src={"/example6.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>
//             </motion.div>
//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="col-span-2 row-span-5 self-center flex flex-col gap-4"
//             >
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example1.png"} width={400} height={400} alt=""
//                         className="rounded-xl w-full " />
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="rounded-xl w-full col-span-2 row-span-2 self-start">
//                     <Image src={"/example10.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>
//             </motion.div>
//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className=" col-span-4 row-span-2 self-end"
//             >
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example2.png"} width={400} height={400} alt=""
//                         className="rounded-xl w-full" />
//                 </motion.div>
//             </motion.div>
//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 className="rounded-xl w-full col-span-2 row-span-5 self-center flex flex-col gap-4"
//             >
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example4.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example3.png"} width={400} height={400} alt=""
//                         className="rounded-xl w-full" />
//                 </motion.div>

//             </motion.div>
//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.25 }}
//                 className="rounded-xl w-full col-span-2 row-span-4 flex flex-col justify-end self-end gap-4 "
//             >

//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
//                     <Image src={"/example11.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example12.png"} width={400} height={400} alt=""
//                         className="rounded-xl" />
//                 </motion.div>

//             </motion.div>

//             <TypeAnimation
//                 sequence={[
//                     1000,
//                     'Generate',
//                     1000,
//                     'Edit',
//                     1000,
//                     'Images with AI',
//                     1000
//                 ]}
//                 wrapper="span"
//                 speed={80}
//                 style={{ fontSize: '4em', display: 'inline-block' }}
//                 className="font-extrabold my-12 py-16 text-white col-span-4 text-center"
//             />

//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="rounded-xl w-full col-span-2 row-span-4 "
//             >
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example9.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>
//             </motion.div>

//             <motion.div
//                 initial={{ opacity: 0, y: 80 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="rounded-xl w-full col-span-2 row-span-4 "
//             >
//                 <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
//                     <Image src={"/example8.png"} width={400} height={400} alt=""
//                         className="rounded-xl " />
//                 </motion.div>

//             </motion.div>

//         </div>
//     )
// }

export const MainGrid = () => {
  return (
    <>
      <div
        className="md:grid hidden grid-cols-5 grid-rows-2 m-auto pb-12
    gap-4 "
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full self-end"
        >
          <Image
            src={"/example7.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl "
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full self-end"
        >
          <Image
            src={"/example6.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-2 self-end"
        >
          <Image
            src={"/example2.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl "
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-1 self-end "
        >
          <Image
            src={"/example11.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl w-48"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-1 "
        >
          <Image
            src={"/example1.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl w-48"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-2 "
        >
          <Image
            priority
            src={"/example5.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl self-end justify-start "
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-2 j"
        >
          <Image
            src={"/example12.png"}
            width={400}
            height={400}
            alt=""
            priority
            className="rounded-xl self-end justify-start"
          />
        </motion.div>
      </div>
      <div
        className="m-0 mt-16 sm:mt-12 lg:m-auto md:hidden grid grid-cols-4 
    gap-2 h-[60vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full self-end"
        >
          <Image
            src={"/example6.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-2 self-end"
        >
          <Image
            src={"/example2.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl "
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full self-end"
        >
          <Image
            src={"/example7.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl "
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-1 "
        >
          <Image
            src={"/example1.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl w-48"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-1 self-start"
        >
          <Image
            src={"/example11.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl w-48"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl w-full col-span-2 "
        >
          <Image
            priority
            src={"/example5.png"}
            width={400}
            height={400}
            alt=""
            className="rounded-xl self-end justify-start "
          />
        </motion.div>
      </div>
    </>
  );
};
