"use client";

import React, { createContext, useContext, useState } from "react";
import {
  LastModelTraining,
  ModelImage,
  ModelTraining,
  User,
  Wallet,
} from "../app/types";

type DashboardContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isImgLoading: boolean;
  setIsImgLoading: (state: boolean) => void;
  images: ModelImage[] | null;
  setImages: React.Dispatch<React.SetStateAction<ModelImage[] | null>>;
  addImage: (image: ModelImage) => void;
  removeImage: (imageId: string) => void;
  selectedImg: string | null;
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  wallet: Wallet | null;
  setWallet: React.Dispatch<React.SetStateAction<Wallet>>;
  increaseBalance: (amount: number) => void;
  spinBalance: (amount: number) => void;
  decreaseBalance: (amount: number) => void;
  lastModelTraining: LastModelTraining | null;
  setLastModelTraining: React.Dispatch<
    React.SetStateAction<LastModelTraining | null>
  >;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isImgLoading, _setIsImgLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ModelImage[] | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [model, setModel] = useState("sdxl");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [lastModelTraining, setLastModelTraining] =
    useState<LastModelTraining | null>(null);

  const increaseBalance = (amount: number) => {
    if (user) {
      setWallet({ ...wallet, balance: wallet.balance + amount });
    }
  };
  const spinBalance = (amount: number) => {
    if (user) {
      setTimeout(() => {
        setWallet({ ...wallet, balance: wallet.balance + amount - 2 });
      }, 5000);
    }
  };
  const decreaseBalance = (amount: number) => {
    if (user) {
      setWallet({ ...wallet, balance: wallet.balance - amount });
    }
  };

  const setIsImgLoading = (state: boolean) => {
    _setIsImgLoading(state);
  };

  const addImage = (image: ModelImage) => {
    if (user) {
      setImages([image, ...(images || [])]);
    }
  };

  const removeImage = (imageId: string) => {
    if (user && images) {
      setImages(images.filter((img) => img.uuid !== imageId));
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        setUser,
        isImgLoading,
        setIsImgLoading,
        images,
        setImages,
        addImage,
        removeImage,
        selectedImg,
        setSelectedImg,
        model,
        setModel,
        wallet,
        setWallet,
        increaseBalance,
        decreaseBalance,
        spinBalance,
        lastModelTraining,
        setLastModelTraining,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
