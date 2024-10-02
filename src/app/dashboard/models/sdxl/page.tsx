"use client";
import { ImagePanel } from "@/components/model_panels/ImagePanel";
import { SDXLForm } from "@/components/model_panels/SDXLForm";
import { useDashboardContext } from "@/utils/dashboardContext";

export default function Page() {
  const { user, setUser, isImgLoading, setImages } = useDashboardContext();
  return (
    <div className="flex mt-12flex-col">
      <h1 className="text-center text-xl mb-1 tracking-widest text-teal-400 font-semibold">
        SDXL
        <p className="text-sm tracking-tighter font-thin font-mono text-white">
          0.05$/Image
        </p>
      </h1>
      <ImagePanel FormComponent={SDXLForm} />
    </div>
  );
}
