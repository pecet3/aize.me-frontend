"use client";
import { useDashboardContext } from "@/utils/dashboardContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { Loading } from "./Loading";
import {
  NotificationPayload,
  useNotificationsContext,
} from "@/utils/notificationsContext";

interface ProtectedProps {
  children: ReactNode;
}
const MAX_RETRIES = 5;
const RECONNECT_INTERVAL = 5000;

export function Notifications({ children }: ProtectedProps) {
  const ws = useRef<null | WebSocket>(null);
  const [isError, setIsError] = useState(false);
  const [retries, setRetries] = useState(0);
  const { updateSchnell, updateTraining, updateSdxl } =
    useNotificationsContext();

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8090/api/v1/notifications");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");

      if (!ws.current) return;
      ws.current.send(JSON.stringify(event));
    };

    ws.current.onmessage = (event) => {
      console.log("reveiced:", event.data);
      try {
        const newEvent = JSON.parse(event.data);
        console.log(newEvent);
        switch (newEvent.type) {
          case "status_sdxl":
            updateSdxl(newEvent.payload);
            console.log("SDXL status setd:", newEvent.payload);
            break;
          case "status_flux_schnell":
            updateSchnell(newEvent.payload);
            console.log("Flux Schnell status setd:", newEvent.payload);
            break;
          case "status_flux_training":
            updateTraining(newEvent.payload);
            console.log("Flux Training status setd:", newEvent.payload);
            break;
          default:
            console.warn("Unknown event type:", newEvent.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setIsError(true);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      attemptReconnect();
    };
  };
  const attemptReconnect = () => {
    if (retries < MAX_RETRIES) {
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${retries + 1})`);
        setRetries((prev) => prev + 1);
        connectWebSocket();
      }, 10000);
    } else {
      console.error("Max reconnection attempts reached");
    }
  };
  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return <>{children}</>;
}
