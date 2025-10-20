"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Notification } from "../layout/navbar/hooks/useNotificationsData";

interface NotificationsContextType {
  notifications: Notification[];
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({
  children,
  notifications,
}: {
  children: ReactNode;
  notifications: Notification[];
}) => {
  return (
    <NotificationsContext.Provider value={{ notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return context;
};
