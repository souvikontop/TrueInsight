"use client";

import React, { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { FileUp } from "lucide-react";
import Papa from "papaparse";
import { SocialPost } from "@/types";

interface CsvUploaderProps {
  onDataUpload: (data: SocialPost[]) => void;
  onError: (message: string) => void;
}

export default function CsvUploader({
  onDataUpload,
  onError,
}: CsvUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onError("");
      const file = acceptedFiles[0];
      if (file) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            onDataUpload(results.data as SocialPost[]);
          },
        });
      }
    },
    [onDataUpload, onError]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const errorMessage =
        fileRejections[0]?.errors[0]?.message || "Invalid file type.";
      onError(
        `Upload failed: ${errorMessage}. Please upload a valid .csv file.`
      );
    },
    [onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
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

      {/* This instruction section is now correctly nested inside the main div */}
      <div className="mt-6 text-left text-sm text-gray-400 space-y-3">
        <div>
          <h4 className="font-semibold text-gray-200">Required Headers:</h4>
          <div className="mt-1 p-3 bg-gray-800 rounded-md flex flex-wrap gap-x-4 gap-y-2">
            <code className="text-blue-300">date</code>
            <code className="text-blue-300">platform</code>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-200">
            Metric Headers (include as many as you have):
          </h4>
          <p>Missing metric columns will be treated as 0.</p>
          <div className="mt-1 p-3 bg-gray-800 rounded-md flex flex-wrap gap-x-4 gap-y-2">
            <code className="text-gray-300">reach</code>
            <code className="text-gray-300">likes</code>
            <code className="text-gray-300">comments</code>
            <code className="text-gray-300">shares</code>
            <code className="text-gray-300">saves</code>
          </div>
        </div>
      </div>
    </div> // This is the corresponding closing tag for the main parent div
  );
}
