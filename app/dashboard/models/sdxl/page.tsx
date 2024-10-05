"use client";
import { ImagePanel } from "@/components/model_panels/ModelPanel";
import { SDXLForm } from "@/components/model_panels/SDXLForm";
import { useDashboardContext } from "@/utils/dashboardContext";
import {
  NotificationPayload,
  useNotificationsContext,
} from "@/utils/notificationsContext";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  return (
    <div className="flex mt-12 flex-col">
      <h1 className="text-center text-xl mb-1 tracking-widest text-teal-400 font-semibold">
        SDXL
        <p className="text-sm tracking-tighter font-thin font-mono text-white">
          0.03$/Image
        </p>
      </h1>
      <ImagePanel
        FormComponent={SDXLForm}
        StatusComponent={DisplayStatusSdxl}
      />
    </div>
  );
}
export const DisplayStatusSdxl = () => {
  const { statusSdxl } = useNotificationsContext();

  return (
    <div className="flex text-xl justify-center items-center">
      {statusSdxl.status}
    </div>
  );
};
