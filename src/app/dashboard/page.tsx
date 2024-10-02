"use client";

import { useDashboardContext } from "../../utils/dashboardContext";
import { User } from "../types";
import { useRouter } from "next/navigation";
import { NavbarDashboard } from "@/components/NavbarDashboard";
import { Spin } from "@/components/Spin";

export default function Page() {
  const { user, setUser, isImgLoading, setImages } = useDashboardContext();

  return (
    <main className="flex flex-col justify-center items-center mt-24 max-w-4xl text-center m-auto"></main>
  );
}
