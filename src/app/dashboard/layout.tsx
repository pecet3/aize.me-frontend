import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { NavbarDashboard } from "@/components/NavbarDashboard";
import { LeftPanel, RightPanel } from "./Panels";
import { ContextProvider } from "../../utils/dashboardContext";
import { Protected } from "@/components/Protected";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Protected>
      <NavbarDashboard />
      <LeftPanel />
      <RightPanel />
      {children}
    </Protected>
  );
}
