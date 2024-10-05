import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { NavbarDashboard } from "@/components/NavbarDashboard";
import { LeftPanel, RightPanel } from "./Panels";
import { ContextProvider } from "../../utils/dashboardContext";
import { Protected } from "@/components/ProtectedWrapper";
import { Notifications } from "@/components/NotificationsWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Protected>
      <Notifications>
        <NavbarDashboard />
        <LeftPanel />
        <RightPanel />
        {children}
      </Notifications>
    </Protected>
  );
}
