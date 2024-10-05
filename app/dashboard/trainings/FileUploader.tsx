"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { X, Image } from "lucide-react";
import { useDashboardContext } from "@/utils/dashboardContext";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import { uuid } from "uuidv4";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModelTrainingImage } from "@/app/types";
import toast from "react-hot-toast";
import { MdOutlineDownloadDone } from "react-icons/md";
import Link from "next/link";
type displayImg = {
  uuid: string;
  src: string;
  fileName: string;
  isNew: boolean;
  file?: ExtendedFile;
  modelTrainingImg?: ModelTrainingImage;
};
interface ExtendedFile extends File {
  preview: string;
}
export const FileUploader = () => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [displayImgs, setDisplayImgs] = useState<displayImg[]>([]);

  const { lastModelTraining, setLastModelTraining } = useDashboardContext();
  const [objectName, setObjectName] = useState(
    lastModelTraining &&
      lastModelTraining.model_training.status === "initialized"
      ? lastModelTraining.model_training.object_name
      : ""
  );

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setUploadFiles((prevFiles) => [...prevFiles, ...newFiles]);
    newFiles.forEach((f) =>
      setDisplayImgs((prev) => [
        ...prev,
        {
          uuid: uuid(),
          src: f.preview,
          fileName: f.name,
          isNew: true,
          file: f,
        },
      ])
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    async function fetchAndTransferImgs() {
      for (let i = 0; i < lastModelTraining.images.length; i++) {
        const fileName = lastModelTraining.images[i].file_name;

        const src = `/api/v1/upload-training-photos/${fileName}`;

        setDisplayImgs(
          (prev) =>
            (prev = [
              ...prev,
              {
                uuid: uuid(),
                src: src,
                fileName: fileName,
                isNew: false,
                modelTrainingImg: lastModelTraining.images[i],
              },
            ])
        );
      }
    }
    if (
      lastModelTraining.images !== null &&
      lastModelTraining.images.length > displayImgs.length
    )
      fetchAndTransferImgs();
  }, [lastModelTraining.images]);

  const removeFile = (fileToRemove: displayImg) => {
    setUploadFiles((prev) => [...prev.filter((f) => f !== fileToRemove.file)]);
    const newImgs = displayImgs.filter(
      (f) => f.isNew === true && f.uuid !== fileToRemove.uuid
    );
    newImgs.map((f) =>
      Object.assign(f.file, {
        preview: URL.createObjectURL(f.file),
      })
    );
    if (!fileToRemove.isNew) {
      (async function () {
        const response = await fetch(
          `/api/v1/upload-training-photos/${fileToRemove.fileName}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          toast.error("Unable to delete an image");
          return;
        }
        toast.success("Deleted an image");
        const data: ModelTrainingImage[] = await response.json();
        setLastModelTraining((prev) => (prev = { ...prev, images: data }));
      })();
    }
    const uploaded = displayImgs.filter(
      (f) => f.isNew === false && f.uuid !== fileToRemove.uuid
    );
    setDisplayImgs((prev) => (prev = [...uploaded, ...newImgs]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploadFiles.length > 30) {
      toast.error("Maximum amount of images is 30");
      return;
    } else if (uploadFiles.length <= 0) {
      toast.error("No file picked");
      return;
    }
    const formData = new FormData();

    uploadFiles.forEach((file) => {
      formData.append("files", file);
    });
    console.log(objectName);
    formData.append("object_name", objectName);
    try {
      const response = await fetch("/api/v1/upload-training-photos", {
        method: "POST",
        body: formData,
      });
      const data: ModelTrainingImage[] = await response.json();
      console.log(data);
      toast.success("Upload succesful");
      setDisplayImgs([]);
      setUploadFiles([]);
      data.forEach((f) => {
        const src = `/api/v1/upload-training-photos/${f.file_name}`;
        setDisplayImgs((prev) => [
          ...prev,
          {
            uuid: uuid(),
            src: src,
            fileName: f.file_name,
            isNew: false,
          },
        ]);
      });
      setLastModelTraining((prev) => (prev = { ...prev, images: data }));
      console.log("Files uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  useEffect(() => {
    console.log(displayImgs);
    console.log(uploadFiles);
  }, [displayImgs, uploadFiles]);
  return (
    <>
      <div
        className="bg-sky-700 bg-opacity-20  rounded-xl pt-2 p-4 w-full
     flex flex-col items-center gap-2 border border-gray-500 shadow-lg shadow-slate-950 "
      >
        <div className="">
          <p className="text-xl">Object Name*</p>
          <input
            type="text"
            className="bg-white bg-opacity-15 
          font-ibm-plex
          text-center text-white text-xl rounded-xl my-2"
            value={objectName}
            disabled={
              lastModelTraining.model_training.status === "initialized"
                ? true
                : false
            }
            onChange={(e) => setObjectName(e.target.value.toUpperCase())}
          />
          {objectName.length < 1 ? (
            <p className="text-xs">
              *it should be an unique name. for example if I wanted to upload
              photos
              <br></br>
              of myself and my name is Nick, proper Obejct Name is NICK.
            </p>
          ) : null}
        </div>
        <div
          {...getRootProps()}
          className={`relative p-6 w-96  border-2 border-dashed 
          rounded-lg text-center cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500 w-full">Drag photos here</p>
          ) : (
            <p className="w-full"> Drag images or click here</p>
          )}
          <p className="absolute text-xs bottom-3 left-[9rem] text-gray-400">
            .png .jpg .jpeg
          </p>
        </div>
        <div className="w-full grid grid-cols-3 px-2">
          <p className="justify-self-start self-end text-sm">Abort</p>
          <motion.button
            type="button"
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
            className="px-2 p-1 flex items-center bg
border border-white rounded-lg justify-center gap-1 bg-purple-700 m-auto"
            onClick={handleSubmit}
          >
            Upload <FiUpload size={16} />
          </motion.button>
          <p className="justify-self-end self-end text-sm">
            {displayImgs.length}/30
          </p>
        </div>
        {displayImgs.length > 0 ? (
          <ul
            className="grid grid-cols-3 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-6 gap-2 mt-1  m-auto"
          >
            {displayImgs.map((file, index) => (
              <li
                key={index}
                className={`max-w-32 relative m-auto 
              ${
                !file.isNew ? "bg-gray-300 opacity-90" : "bg-white"
              } p-1 rounded`}
              >
                <img
                  src={!file.isNew ? file.src : file.file.preview}
                  alt={file.fileName}
                  className="w-full h-32 object-cover rounded"
                  onLoad={() => {
                    URL.revokeObjectURL(file.src);
                  }}
                />
                <p className="text-xs truncate text-black">{file.fileName}</p>

                {!file.isNew ? (
                  <>
                    <button
                      onClick={() => removeFile(file)}
                      className="text-black absolute -top-[0.0rem] right-[0.0rem] bg-gray-300 
               rounded-bl-lg rounded-tr-md p-1 hover:bg-gray-400"
                    >
                      <FaRegTrashAlt size={16} />
                    </button>
                    <p
                      className="text-purple-800 font-bold font-mono rounded-br-lg pr-1 bg-gray-300
              text-[10px]  absolute top-0.5 left-1 "
                    >
                      Uploaded
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => removeFile(file)}
                      className="text-black absolute -top-[0.0rem] right-[0.0rem] bg-white 
               rounded-bl-lg rounded-tr-md p-1 hover:bg-gray-300"
                    >
                      <FaRegTrashAlt size={16} />
                    </button>
                    <p
                      className="text-purple-800 font-bold font-mono rounded-br-lg pr-1 bg-white
              text-[10px]  absolute top-0.5 left-1 "
                    >
                      New
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-col items-center mt-32 gap-12">
        <p className="text-2xl font-thin widest">
          Upload at least 5 images to start a training
        </p>
        <p className="text-2xl font-thin widest">
          <span className="font-normal">First time? </span>
          <br></br>Check out{" "}
          <Link
            href={"/guides/training-custom-model"}
            className="underline font-normal text-sky-600"
          >
            the Guide
          </Link>
        </p>
      </div>
    </>
  );
};
