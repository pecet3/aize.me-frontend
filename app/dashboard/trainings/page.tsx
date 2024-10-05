"use client";
import { FileUploader } from "./FileUploader";
import { Trainer } from "./Trainer";

export default function Page() {
  return (
    <main className="main-container">
      <h1 className="text-center mb-1 text-xl tracking-widest text-teal-400 font-semibold">
        Flux-Training
        <p className="text-sm tracking-tighter font-thin font-mono text-gray-300">
          6.00$/Model
        </p>
      </h1>
      <FileUploader />
      <Trainer />
    </main>
  );
}
