"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDashboardContext } from "../../utils/dashboardContext";
import { ModelImage } from "../../app/types";
import { Modal } from "@/components/Modal";

// Define the props for the SDXLPanel component
interface SDXLPanelProps {
  FormComponent: React.ComponentType<{
    setImgs: React.Dispatch<React.SetStateAction<ModelImage[]>>;
    model: string;
  }>;
}

export const ImagePanel: React.FC<SDXLPanelProps> = ({ FormComponent }) => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") || "";
  const [imgs, setImgs] = useState<ModelImage[]>([]);

  const { isImgLoading, setSelectedImg, selectedImg } = useDashboardContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isImgLoading);
  }, [isImgLoading]);

  const openModal = (img: string) => {
    setSelectedImg(img);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <main className="flex items-center flex-col gap-6">
      <FormComponent setImgs={setImgs} model="sdxl" />
      {imgs && imgs.length === 1 ? (
        <Image
          width={600}
          height={600}
          alt="ai generated image"
          src={imgs[0].image_url}
          className="h-auto w-auto rounded-md cursor-pointer"
          onClick={() => openModal(imgs[0].image_url)}
        />
      ) : imgs && imgs.length > 1 ? (
        <div className="h-[50vh] grid grid-cols-2 max-w-6xl gap-2 ">
          {imgs.map((i) => (
            <Image
              width={600}
              height={600}
              alt="ai generated image"
              key={i.file_name}
              src={i.file_name}
              className="duration-300 hover:scale-[101%] w-full rounded-md cursor-pointer"
              onClick={() => openModal(i.image_url)}
            />
          ))}
        </div>
      ) : null}

      {isLoading && <p>loading</p>}
    </main>
  );
};
