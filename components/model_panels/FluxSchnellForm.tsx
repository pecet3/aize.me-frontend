"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { useDashboardContext } from "@/utils/dashboardContext";
import { ModelImage } from "@/app/types";
import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";
import { PromptWizzard } from "../PromptWizzard";

interface FluxSchnellParams {
  prompt: string;
  go_fast: boolean;
  megapixels: string;
  num_outputs: number;
  aspect_ratio: string;
  output_format: string;
  output_quality: number;
}

interface Response {
  images: ModelImage[];
}

export const FluxSchnellForm: React.FC<{
  setImgs: React.Dispatch<React.SetStateAction<ModelImage[]>>;
  model: string;
}> = ({ setImgs, model }) => {
  const { user, decreaseBalance, setIsImgLoading, addImage } =
    useDashboardContext();
  const [input, setInput] = useState<FluxSchnellParams>({
    prompt: "",
    go_fast: true,
    megapixels: "1",
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 80,
  });
  const [wizzardOutput, setWizzardOutput] = useState({
    prompt: "",
  });

  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      prompt: wizzardOutput.prompt,
    }));
  }, [wizzardOutput]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setInput((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsImgLoading(true);
      setImgs([]);
      console.log(input);
      const response = await fetch(`/api/v1/models/flux-schnell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...input }),
      });
      console.log(JSON.stringify({ ...input }));
      if (!response.ok) {
        throw new Error(`Błąd HTTP! status: ${response.status}`);
      }
      const data: ModelImage[] = await response.json();
      setImgs(data);
      decreaseBalance(10);
      setIsImgLoading(false);
      data.forEach((i) => addImage(i));
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-sky-700 bg-opacity-20 shadow-lg shadow-slate-950 p-2.5 rounded-xl border
       border-gray-500 w-full max-w-3xl flex flex-col gap-2 text-sm"
    >
      <div className="flex flex-col justify-between gap-2">
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-full">
            <label className="text-teal-400" htmlFor="prompt">
              Prompt
            </label>
            <textarea
              className="rounded-xl border-white border backdrop-blur-sm px-2 p-1 text-white bg-blue-950 text-sm w-full"
              id="prompt"
              name="prompt"
              value={input.prompt}
              onChange={handleChange}
              rows={3}
              required
            />
            <PromptWizzard prompt={input.prompt} setPrompt={setWizzardOutput} />
          </div>
          <div className="flex justify-between flex-col items-end">
            <div className="flex flex-col">
              <label className="text-teal-400" htmlFor="go_fast">
                Go Fast
              </label>
              <input
                className="input"
                type="checkbox"
                id="go_fast"
                name="go_fast"
                checked={input.go_fast}
                onChange={handleChange}
              />
              <label className="text-teal-400" htmlFor="num_outputs">
                Quantity
              </label>
              <input
                className="input"
                type="number"
                id="num_outputs"
                name="num_outputs"
                value={input.num_outputs}
                onChange={handleChange}
                min="1"
                max="4"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 justify-start m-auto items-center">
          <label className="text-teal-400" htmlFor="megapixels">
            Megapixels:
          </label>
          <input
            className="input w-96 m-0"
            type="text"
            id="megapixels"
            name="megapixels"
            value={input.megapixels}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-teal-400" htmlFor="aspect_ratio">
            Aspect Ratio:
          </label>
          <input
            className="input"
            type="text"
            id="aspect_ratio"
            name="aspect_ratio"
            value={input.aspect_ratio}
            onChange={handleChange}
          />
          <label className="text-teal-400" htmlFor="output_format">
            Output Format:
          </label>
          <select
            className="input"
            id="output_format"
            name="output_format"
            value={input.output_format}
            onChange={handleChange}
          >
            <option value="webp">WebP</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
          <label className="text-teal-400" htmlFor="output_quality">
            Output Quality:
          </label>
          <input
            className="input"
            type="number"
            id="output_quality"
            name="output_quality"
            value={input.output_quality}
            onChange={handleChange}
            min="1"
            max="100"
          />
        </div>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02, rotate: 0 }}
        whileTap={{ scale: 1 }}
        animate={{
          backgroundColor: ["#9333ea", "#4f46e5", "#9333ea"],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="px-2 p-1 items-center flex
border border-white rounded-lg justify-center gap-1 bg-purple-700 m-auto"
      >
        Generate
        <FaRegFileImage size={16} />
      </motion.button>
    </form>
  );
};
