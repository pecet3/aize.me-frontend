"use client";

import { useEffect, useState } from "react";
import { ImagePanel } from "../../../../components/model_panels/ModelPanel";
import { FluxSchnellForm } from "../../../../components/model_panels/FluxSchnellForm";
import { useDashboardContext } from "../../../../utils/dashboardContext";
import {
  NotificationPayload,
  useNotificationsContext,
} from "../../../../utils/notificationsContext";

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
      <ImagePanel
        FormComponent={FluxSchnellForm}
        StatusComponent={DisplayStatusFluxSchnell}
      />
    </div>
  );
}

export const DisplayStatusFluxSchnell = () => {
  const { statusFluxSchnell } = useNotificationsContext();
  const [status, setStatus] = useState<NotificationPayload>({
    status: "a",
    time: "",
  });

  useEffect(() => {
    setStatus(statusFluxSchnell);
  }, [statusFluxSchnell]);
  return (
    <div className="flex text-xl justify-center items-center">
      {status.status}
    </div>
  );
};
