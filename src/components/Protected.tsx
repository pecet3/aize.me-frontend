"use client";
import { useDashboardContext } from "@/utils/dashboardContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Loading } from "./Loading";
interface ProtectedProps {
  children: ReactNode;
}

export function Protected({ children }: ProtectedProps) {
  const {
    user,
    setUser,
    setLastModelTraining,
    setWallet,
    setImages,
    selectedImg,
    setSelectedImg,
  } = useDashboardContext();
  const router = useRouter();
  useEffect(() => {
    if (user) return;
    let counter = 0;
    const fetchUserData = async () => {
      const response = await fetch(`/api/v1/auth/ping`);
      if (!response.ok) {
        console.log("unable to fetch an user");
        if (counter < 15) {
          counter++;
          setTimeout(() => fetchUserData(), 50);
        } else {
          router.push(`/auth/login`);
        }
      }
      const data = await response.json();
      console.log(data);
      setUser(data.user);
      setImages(data.images);
      setWallet(data.wallet);
      setLastModelTraining({
        model_training: data.last_model_training.model_training,
        images: data.last_model_training.images,
      });
    };

    fetchUserData();
  }, []);
  const closeModal = () => {
    setSelectedImg(null);
  };
  if (!user) {
    return <Loading />;
  } else {
    return (
      <>
        {children}
        {selectedImg && (
          <Modal selectedImg={selectedImg} onClose={closeModal} />
        )}
      </>
    );
  }
}
