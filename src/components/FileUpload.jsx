import React, { useState, useEffect } from "react";
import Icon from "@icons";

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    const enterListener = (e) => {
      if (e.target.id != "dropzone-file") {
        e.preventDefault();
        e.dataTransfer.effectAllowed = "none";
        e.dataTransfer.dropEffect = "none";
      }
      setDrag(true);
    };

    const overListener = (e) => {
      if (e.target.id != "dropzone-file") {
        e.preventDefault();
        e.dataTransfer.effectAllowed = "none";
        e.dataTransfer.dropEffect = "none";
      }
      setDrag(true);
    };

    const dropListener = (e) => {
      if (e.target.id != "dropzone-file") {
        e.preventDefault();
        e.dataTransfer.effectAllowed = "none";
        e.dataTransfer.dropEffect = "none";
      }
      setDrag(false);
    };

    window.addEventListener("dragenter", enterListener, false);
    window.addEventListener("dragover", overListener);
    window.addEventListener("drop", dropListener);

    return () => {
      window.removeEventListener("dragenter", enterListener);
      window.removeEventListener("dragover", overListener);
      window.removeEventListener("drop", dropListener);
    };
  });

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDrag(true);
    } else if (e.type === "dragleave") {
      setDrag(false);
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const { name, size } = e.target.files[0];
      console.log("name: ", name);
      console.log("size: ", size);
    }
  };

  // triggers when file is dropped
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // validate file type
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setDrag(false);
      console.log(files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <>
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        htmlFor="dropzone-file"
        className=" flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <Icon
            type="Upload"
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {drag ? "drop your files here" : "SVG, PNG, JPG"}
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </>
  );
};

export default FileUpload;
