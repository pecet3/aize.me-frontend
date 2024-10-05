import Image from "next/image";

interface ModalProps {
  selectedImg: string;
  onClose: () => void;
}

export const Modal = ({ selectedImg, onClose }: ModalProps) => {
  console.log(selectedImg);
  return (
    <div
      className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40 flex items-center 
      justify-center z-50 "
      onClick={onClose}
    >
      <div className="max-w-4xl max-h-[90vh] relative">
        <img
          className="rounded-md obje w-full max-h-[80vh]"
          height={1280}
          width={720}
          src={selectedImg}
          alt="modal photo"
        />
        <button
          className="absolute bg-white bg-opacity-15 rounded-full w-8 h-8 -top-8 -right-8 text-white text-2xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};
