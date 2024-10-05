import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Typy dla powiadomień
export interface NotificationPayload {
  status: string;
  time: string;
}

interface Notification {
  type: string;
  payload: NotificationPayload;
}

// Typ stanu kontekstu powiadomień
interface NotificationsContextType {
  statusSdxl: NotificationPayload;
  statusFluxSchnell: NotificationPayload;
  statusFluxTraining: NotificationPayload;
  notifications: Notification[]; // Lista powiadomień
  updateNotification: (type: string, payload: NotificationPayload) => void; // Funkcja aktualizująca stan
  updateSdxl: (payload: NotificationPayload) => void; // Specyficzna funkcja dla SDXL
  updateSchnell: (payload: NotificationPayload) => void; // Specyficzna funkcja dla FluxSchnell
  updateTraining: (payload: NotificationPayload) => void; // Specyficzna funkcja dla FluxTraining
}
// Stworzenie kontekstu z domyślną wartością undefined
const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

// Provider kontekstu
interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  // 3 stany dla poszczególnych typów powiadomień
  const [statusSdxl, setStatusSdxl] = useState<NotificationPayload>({
    status: "",
    time: new Date().toISOString(),
  });
  const [statusFluxSchnell, setStatusFluxSchnell] = useState<
    NotificationPayload | any
  >({
    status: "",
    time: new Date().toISOString(),
  });
  const [statusFluxTraining, setStatusFluxTraining] =
    useState<NotificationPayload>({
      status: "",
      time: new Date().toISOString(),
    });

  // Stan dla wszystkich powiadomień
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Funkcja ogólna do aktualizacji powiadomień
  const updateNotification = (type: string, payload: NotificationPayload) => {
    const newNotification: Notification = { type, payload };
    console.log(newNotification, "responsse ws");
    switch (type) {
      case "SDXL":
        setStatusSdxl(payload);
        break;
      case "FluxSchnell":
        setStatusFluxSchnell(payload);
        break;
      case "FluxTraining":
        setStatusFluxTraining(payload);
        break;
      default:
        console.warn(`Unknown notification type: ${type}`);
    }

    // Dodanie nowego powiadomienia do listy
    setNotifications((prev) => [...prev, newNotification]);
  };
  const updateSdxl = (payload: NotificationPayload) => {
    console.log(payload);
    setStatusSdxl(payload);
    setNotifications((prev) => [...prev, { type: "status_sdxl", payload }]);
  };

  // Specyficzna funkcja do aktualizacji statusu FluxSchnell
  const updateSchnell = (payload: NotificationPayload) => {
    setStatusFluxSchnell(payload);
    setNotifications((prev) => [
      ...prev,
      { type: "status_FluxSchnell", payload },
    ]);
  };

  // Specyficzna funkcja do aktualizacji statusu FluxTraining
  const updateTraining = (payload: NotificationPayload) => {
    setStatusFluxTraining(payload);
    setNotifications((prev) => [...prev, { type: "FluxTraining", payload }]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        statusSdxl,
        statusFluxSchnell,
        statusFluxTraining,
        notifications,
        updateNotification,
        updateSdxl,
        updateSchnell,
        updateTraining,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook do użycia kontekstu powiadomień
export const useNotificationsContext = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider"
    );
  }
  return context;
};

// Hook zwracający powiadomienia posortowane po dacie
export const useSortedNotifications = () => {
  const { notifications } = useNotificationsContext();
  // Sortowanie powiadomień według daty (malejąco)
  return [...notifications].sort(
    (a, b) =>
      new Date(b.payload.time).getTime() - new Date(a.payload.time).getTime()
  );
};
