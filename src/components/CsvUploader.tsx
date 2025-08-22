"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import Papa from "papaparse"; // 1. Import Papa Parse
import { SocialPost } from "@/types"; // Import our type

// 2. Define the "shape" of the props our component expects
interface CsvUploaderProps {
  onDataUpload: (data: SocialPost[]) => void;
}

// 3. Update the component to accept the props
export default function CsvUploader({ onDataUpload }: CsvUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // 4. Use Papa Parse to read the file
        Papa.parse(file, {
          header: true, // This tells Papa Parse the first row of the CSV is the header
          skipEmptyLines: true,
          complete: (results) => {
            // The parsed data is in results.data
            // We cast it to our SocialPost[] type so TypeScript knows its shape
            const parsedData = results.data as SocialPost[];

            // 5. Call the function from the parent to send the data up
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

  // ... the rest of the JSX is the same
  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-lg p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
      ${
        isDragActive
          ? "border-blue-500 bg-blue-950"
          : "border-gray-600 hover:border-gray-400 hover:bg-gray-800"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        <FileUp className="w-12 h-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg font-semibold text-blue-300">
            Drop the file here ...
          </p>
        ) : (
          <p className="text-lg text-gray-400">
            Drag & drop your CSV file here, or click to select a file
          </p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Only .csv files are accepted
        </p>
      </div>
    </div>
  );
}
