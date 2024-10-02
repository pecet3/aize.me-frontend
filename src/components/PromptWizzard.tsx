"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaMagic } from "react-icons/fa";

export const PromptWizzard = ({
  prompt,
  setPrompt,
}: {
  prompt: string;
  setPrompt: React.Dispatch<{ prompt: string; negative_prompt: string }>;
}) => {
  const handlePromptWizzard = async (): Promise<void> => {
    console.log("prompt");
    const response = await fetch("/api/v1/prompt-wizzard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    setPrompt(data);
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, rotate: 0 }}
      whileTap={{ scale: 1 }}
      animate={{
        backgroundColor: ["#790fb6", "#0f53b6", "#790fb6"],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="relative bottom-2 text-xs px-2 pl-1.5 font-mono p-0.5 flex items-center
border border-white rounded-lg justify-center gap-1 bg-purple-700 m-auto"
      onClick={handlePromptWizzard}
    >
      <FaMagic size={16} />
      Prompt Wizzard
    </motion.button>
  );
};

export const PromptWizzardComfy = ({
  prompt,
  setPrompt,
}: {
  prompt: string;
  setPrompt: React.Dispatch<{ prompt: string; negative_prompt: string }>;
}) => {
  const handlePromptWizzard = async (): Promise<void> => {
    console.log("prompt");
    const response = await fetch("/api/v1/prompt-wizzard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    setPrompt(data);
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, rotate: 0 }}
      whileTap={{ scale: 1 }}
      animate={{
        backgroundColor: ["#790fb6", "#0f53b6", "#790fb6"],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className=" relative top-0 text-xs pl-1.5 font-mono p-0.5 flex items-center
border border-white rounded-lg justify-center gap-1 bg-purple-700 m-auto"
      onClick={handlePromptWizzard}
    >
      <FaMagic size={16} />
      Prompt Wizzard
    </motion.button>
  );
};
