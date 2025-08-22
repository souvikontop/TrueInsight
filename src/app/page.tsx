"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CsvUploader from "@/components/CsvUploader";
import Dashboard from "@/components/Dashboard";
import { SocialPost } from "@/types";
import { cleanData } from "@/lib/data-utils";

export default function Home() {
  const [data, setData] = useState<SocialPost[]>([]);

  const handleDataUpload = (parsedData: any[]) => {
    const cleanedData = cleanData(parsedData);
    setData(cleanedData);
  };

  // 1. Create a function to reset the data state
  const handleReset = () => {
    setData([]);
  };

  return (
    <div className="flex flex-col min-h-screen items-center w-full p-4 sm:p-8 md:p-12">
      <Header />

      <main className="flex flex-col items-center flex-grow w-full max-w-6xl mt-16 sm:mt-24">
        {data.length === 0 && (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              TrueInsight Analyzer
            </h1>
            <p className="text-lg text-gray-400 mt-2">
              Turn your social media data into actionable insights.
            </p>
          </div>
        )}

        <div className="mt-12 w-full flex justify-center">
          {data.length === 0 ? (
            <CsvUploader onDataUpload={handleDataUpload} />
          ) : (
            // 2. Pass the reset function as a prop to the Dashboard
            <Dashboard data={data} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}
