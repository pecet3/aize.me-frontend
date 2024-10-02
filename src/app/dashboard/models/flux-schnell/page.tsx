"use client";
import { FluxSchnellForm } from "@/components/model_panels/FluxSchnellForm";
import { ImagePanel } from "@/components/model_panels/ImagePanel";
import { useDashboardContext } from "@/utils/dashboardContext";

export default function Page() {
  const { user, setUser, isImgLoading, setImages } = useDashboardContext();
  return (
    <div className="flex mt-12 flex-col">
      <h1 className="text-center mb-1 text-xl tracking-widest text-teal-400 font-semibold">
        Flux-Schnell
        <p className="text-sm tracking-tighter font-thin font-mono text-white">
          0.05$/Image
        </p>
      </h1>
      <ImagePanel FormComponent={FluxSchnellForm} />
    </div>
  );
}
