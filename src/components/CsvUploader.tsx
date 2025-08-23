"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import Papa from "papaparse"; // Make sure Papa Parse is imported
import { SocialPost } from "@/types";

// This interface defines the props the component expects
interface CsvUploaderProps {
  onDataUpload: (data: SocialPost[]) => void;
}

// The component needs to accept the 'onDataUpload' prop
export default function CsvUploader({ onDataUpload }: CsvUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // This is the key part: using Papa Parse
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data as SocialPost[];
            // This calls the function from the parent page to send the data up
            onDataUpload(parsedData);
          },
        });
      }
    },
    [onDataUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  return (
    <div className="w-full max-w-lg text-center">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-blue-500 bg-blue-950"
            : "border-gray-600 hover:border-gray-400 hover:bg-gray-800"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <FileUp className="w-12 h-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg font-semibold text-blue-300">
              Drop the file here ...
            </p>
          ) : (
            <p className="text-lg text-gray-400">
              Drag & drop your CSV file here, or click to select
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Only .csv files are accepted
          </p>
        </div>
      </div>
      <div className="mt-6 text-left text-sm text-gray-400">
        <h4 className="font-semibold text-gray-200 mb-2">
          Required CSV Format:
        </h4>
        <p>Your file must contain the required column headers:</p>
        <div className="mt-2 p-3 bg-gray-800 rounded-md flex flex-wrap gap-x-4 gap-y-2">
          <code className="text-blue-300">date</code>
          <code className="text-blue-300">platform</code>
          <code className="text-blue-300">reach</code>
          <code className="text-blue-300">likes</code>
          <code className="text-blue-300">comments</code>
          <code className="text-blue-300">shares</code>
          <code className="text-blue-300">saves</code>
        </div>
      </div>
    </div>
  );
}
