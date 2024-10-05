import { FaArrowRight } from "react-icons/fa"
import { IoMdImage } from "react-icons/io"
import { IoText } from "react-icons/io5"

export const ImageTile = () => {
    return (
        <div className="rounded-xl ring-black ring-2 h-64 w-56  grid grid-rows-3 bg-black">
            
        </div>
    )
}

// export const Tile = () => {
//     return (
//         <div className="rounded-xl ring-black ring-2 h-64 w-56  grid grid-rows-3 bg-black">
//             <div className="flex gap-4 items-center justify-center row-span-2">
//                 <IoText size={64} />
//                 <FaArrowRight size={32} />
//                 <IoMdImage size={64} />
//             </div>

//             <h2 className="text-xl row-span-1 text-center border-t">Text to image</h2>
//         </div>
//     )
// }