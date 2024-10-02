import Image from "next/image";

interface ModalProps {
    selectedImg: string;
    onClose: () => void;
}

export const Modal = ({ selectedImg, onClose }: ModalProps) => {
    console.log(selectedImg)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="max-w-4xl max-h-[90vh] relative">
                <Image
                    width={600}
                    height={600}
                    className="rounded-md"
                    src={selectedImg}
                    alt="modal photo"
                    layout="intrinsic"
                    objectFit="contain"
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
