"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { BalanceSm } from "./Balance";
import { useDashboardContext } from "@/utils/dashboardContext";

export const Spin = () => {
  const { decreaseBalance, spinBalance } = useDashboardContext();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [numbers, setNumbers] = useState([
    3, 1, 2, 1, 1, 3, 3, 3, 2, 3, 4, 4, 1, 1, 1, 2, 1, 3, 1, 5, 4, 5, 3, 1, 3,
    1, 4, 1, 1, 2, 1, 3, 1, 1, 3, 1, 1, 1, 2, 1, 1, 3, 1, 2, 4, 3, 1, 2, 1, 1,
    3, 3, 3, 4, 3, 2, 1, 1, 2, 1, 1, 4, 1, 3, 4, 1, 4, 3, 2, 3, 3, 1, 3, 1, 1,
    3, 3, 3, 3,
  ]);
  const controls = useAnimation();
  const controlsWrapper = useAnimation();
  const winIndex = 17;
  async function fetchSpinData() {
    const response = await fetch(`/api/v1/spin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ ...input, model }),
    });

    if (!response.ok) {
      throw new Error(`Błąd HTTP! status: ${response.status}`);
    }
    const data = await response.json();

    return data.numbers;
  }

  const spinCase = async () => {
    if (!spinning) {
      const numbers = await fetchSpinData();
      setNumbers(numbers);
      setSpinning(true);
      setResult(null);

      const winningItem = await numbers[winIndex];
      spinBalance(numbers[winIndex]);
      controls.start({
        x: [`-100%`, `-20%`],
        transition: {
          duration: 4,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
      controlsWrapper.start({
        scale: [1, 1.08, 1.05, 1],
        transition: {
          duration: 4,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
      console.log(numbers[winIndex]);
      setResult(winningItem);
      setSpinning(false);
    }
  };

  return (
    <motion.div
      animate={controlsWrapper}
      className="flex flex-col p-2 border border-white items-center justify-center rounded-xl bg-opacity-40 bg-black text-white"
    >
      <div className="relative w-[25rem] h-32 rounded-xl  border border-white bg-white bg-opacity-5 overflow-hidden mb-8">
        <motion.div className="flex absolute -left-4 " animate={controls}>
          {numbers.length > 30 &&
            numbers.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-1 border-x text-5xl
                                  border-white w-36 h-36 flex gap-2 flex-col items-center justify-center "
                >
                  {item === 1 ? (
                    <p>💩</p>
                  ) : item === 2 ? (
                    <p>👍</p>
                  ) : item === 3 ? (
                    <p>🩵</p>
                  ) : item === 4 ? (
                    <p>💎</p>
                  ) : item === 5 ? (
                    <p>🎲</p>
                  ) : (
                    <p></p>
                  )}

                  <BalanceSm quantity={item} />
                </div>
              );
            })}
        </motion.div>
        <div className="text-4xl relative top-24 flex flex-col">▲</div>
      </div>
      <button
        onClick={() => {
          decreaseBalance(2);
          spinCase();
        }}
        disabled={spinning}
        className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Open Case"}
      </button>
    </motion.div>
  );
};
