"use client";

import { ContextProvider } from "@/utils/dashboardContext";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ContextProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName="font-ibm-plex"
        containerStyle={{ marginRight: "5rem" }}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#172554",
            color: "#ffff",
            fontSize: "16px",
            borderWidth: "1px",
            padding: "0px 8px",
            borderColor: "white",
          },

          success: {
            duration: 3000,
          },
        }}
      />
      {children}
    </ContextProvider>
  );
}
