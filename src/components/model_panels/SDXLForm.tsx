"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { Balance, BalanceSm } from "../Balance";
import { useDashboardContext } from "@/utils/dashboardContext";
import { ModelImage } from "@/app/types";
import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";
import { PromptWizzard } from "../PromptWizzard";

interface SDXLParams {
  prompt?: string;

  negative_prompt?: string | null;

  height?: number;

  width?: number;

  seed?: number | null;

  scheduler?: string;
  num_inference_steps?: number;

  refiner_inference_steps?: number;

  guidance_scale?: number;

  strength?: number;

  image_url?: string | null;

  num_images?: number;
  high_noise_frac?: number | null;
}

interface Response {
  images: ModelImage[];
}

export const SDXLForm: React.FC<{
  setImgs: React.Dispatch<React.SetStateAction<ModelImage[]>>;
  model: string;
}> = ({ setImgs, model }) => {
  const { user, decreaseBalance, setIsImgLoading, addImage } =
    useDashboardContext();
  const [input, setInput] = useState<SDXLParams>({
    prompt: "",
    negative_prompt: "",
    height: 1024,
    width: 1024,
    seed: 0,
    scheduler: "DDIM",
    num_inference_steps: 25,
    refiner_inference_steps: 50,
    guidance_scale: 7.5,
    strength: 0.3,
    image_url: "",
    num_images: 1,
    high_noise_frac: 0,
  });
  const [wizzardOutput, setWizzardOutput] = useState({
    prompt: "",
    negative_prompt: "",
  });

  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      prompt: wizzardOutput.prompt,
      negative_prompt: wizzardOutput.negative_prompt,
    }));
  }, [wizzardOutput]);

  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setInput((prevState) => ({
      ...prevState,
      [name]:
        type === "radio" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsImgLoading(true);
      setImgs([]);
      console.log(input);
      const response = await fetch(`/api/v1/models/sdxl`, {
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
      className="bg-sky-700 bg-opacity-20  shadow-lg shadow-slate-950 p-2.5
         rounded-xl border  border-gray-500 w-full max-w-3xl flex flex-col gap-2 text-sm"
    >
      <div className="flex flex-col justify-between  gap-2 ">
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-full">
            <label className="text-teal-400  " htmlFor="prompt">
              Prompt
            </label>
            <textarea
              className="rounded-xl border-white border backdrop-blur-sm px-2 p-1 text-white
            bg-blue-950  text-sm w-full"
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
              <label className="text-teal-400" htmlFor="seed">
                Seed
              </label>
              <input
                className="input"
                type="number"
                id="seed"
                name="seed"
                value={input.seed}
                onChange={handleChange}
              />
              <label className="text-teal-400" htmlFor="numOutputs">
                Quantity
              </label>
              <input
                className="input"
                type="number"
                id="num_images"
                name="num_images"
                value={input.num_images}
                onChange={handleChange}
                min="1"
                max="4"
              />
            </div>
          </div>
          <div className="flex justify-between flex-col items-end">
            <div className="flex flex-col">
              <label className="text-teal-400" htmlFor="width">
                Width:
              </label>
              <input
                className="input"
                type="number"
                id="width"
                name="width"
                value={input.width}
                onChange={handleChange}
                min="64"
                max="2048"
                step="64"
              />
              <label className="text-teal-400" htmlFor="height">
                Height:
              </label>
              <input
                className="input"
                type="number"
                id="height"
                name="height"
                value={input.height}
                onChange={handleChange}
                min="64"
                max="2048"
                step="64"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 justify-start m-auto items-center">
          <label className="text-teal-400" htmlFor="image_url">
            Image URL:
          </label>
          <input
            className="input w-96 m-0"
            type="text"
            id="image_url"
            name="image_url"
            value={input.image_url || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center w-full font-bold">
          {isAdvanced ? (
            <div
              onClick={() => setIsAdvanced((prev) => !prev)}
              className="text-teal-400 hover:cursor-pointer"
            >
              Advanced Options ▲
            </div>
          ) : (
            <div
              onClick={() => setIsAdvanced((prev) => !prev)}
              className="text-teal-400 hover:cursor-pointer"
            >
              Advanced Options ▼
            </div>
          )}
        </div>
        {isAdvanced ? (
          <>
            <div className="flex gap-2 items-center">
              <div className="flex  flex-col m-auto w-full">
                <label className="text-teal-400" htmlFor="image_url">
                  Negative Prompt
                </label>
                <textarea
                  className="rounded-xl border-white border backdrop-blur-sm px-2 p-1 text-white
            bg-blue-950  text-sm  w-full"
                  rows={3}
                  id="negative_prompt"
                  name="negative_prompt"
                  value={input.negative_prompt}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between flex-col items-end">
                <label className="text-teal-400" htmlFor="scheduler">
                  Scheduler:
                </label>
                <select
                  className="input"
                  id="scheduler"
                  name="scheduler"
                  value={input.scheduler}
                  onChange={handleChange}
                >
                  <option value="DDIM">DDIM</option>
                  {/* Add other scheduler options here */}
                </select>
              </div>
              <div className="flex justify-between flex-col items-end">
                <label className="text-teal-400" htmlFor="strength">
                  Strength:
                </label>
                <input
                  className="input"
                  type="number"
                  id="strength"
                  name="strength"
                  value={input.strength}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="1"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-teal-400" htmlFor="num_inference_steps">
                Inference Steps:
              </label>
              <input
                className="input"
                type="number"
                id="num_inference_steps"
                name="num_inference_steps"
                value={input.num_inference_steps}
                onChange={handleChange}
              />
              <label
                className="text-teal-400"
                htmlFor="refiner_inference_steps"
              >
                Refiner Inference Steps:
              </label>
              <input
                className="input"
                type="number"
                id="refiner_inference_steps"
                name="refiner_inference_steps"
                value={input.refiner_inference_steps}
                onChange={handleChange}
              />

              <label className="text-teal-400" htmlFor="high_noise_frac">
                High Noise Fraction:
              </label>
              <input
                className="input"
                type="number"
                id="high_noise_frac"
                name="high_noise_frac"
                value={input.high_noise_frac}
                onChange={handleChange}
                step="0.1"
                min="0.0"
                max="1"
              />
              <label className="text-teal-400" htmlFor="guidance_scale">
                Guidance Scale:
              </label>
              <input
                className="input"
                type="number"
                id="guidance_scale"
                name="guidance_scale"
                value={input.guidance_scale}
                onChange={handleChange}
                step="0.1"
              />
            </div>
          </>
        ) : null}
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
        className="px-2 p-1  flex items-center
border border-white rounded-lg justify-center gap-1  m-auto"
      >
        Generate
        <FaRegFileImage size={16} />
      </motion.button>
    </form>
  );
};
