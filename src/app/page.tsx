"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CsvUploader from "@/components/CsvUploader";
import Dashboard from "@/components/Dashboard";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import DateRangePicker from "@/components/DateRangePicker";
import { SocialPost } from "@/types";
import { cleanData } from "@/lib/data-utils";

export default function Home() {
  const [data, setData] = useState<SocialPost[]>([]);
  const [displayData, setDisplayData] = useState<SocialPost[]>([]);
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("savedData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData && parsedData.length > 0) {
          setData(parsedData);
        }
      }
    } catch (error) {
      console.error("Failed to load or parse data from localStorage", error);
      localStorage.removeItem("savedData");
    }
  }, []);

  useEffect(() => {
    if (!dateRange || !dateRange.start || !dateRange.end) {
      setDisplayData(data);
      return;
    }
    const filtered = data.filter(
      (post) => post.date >= dateRange.start && post.date <= dateRange.end
    );
    setDisplayData(filtered);
  }, [data, dateRange]);

  const handleDataUpload = (parsedData: Record<string, any>[]) => {
    setIsLoading(true);
    setError(null);

    if (parsedData.length === 0) {
      setError(
        "Validation failed: The CSV file is empty or contains no data rows."
      );
      setIsLoading(false);
      return;
    }

    const firstRow = parsedData[0];
    const hasRequiredHeaders = "date" in firstRow && "platform" in firstRow;

    if (!hasRequiredHeaders) {
      setError(
        "Validation failed: The CSV file is missing the required 'date' and/or 'platform' headers."
      );
      setIsLoading(false);
      return;
    }

    const cleanedData = cleanData(parsedData);
    setData(cleanedData);

    try {
      localStorage.setItem("savedData", JSON.stringify(cleanedData));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      setError("Could not save data to your browser's storage.");
    }

    setIsLoading(false);
  };

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end });
  };

  const handleReset = () => {
    setData([]);
    setDisplayData([]);
    setError(null);
    setDateRange(null);
    localStorage.removeItem("savedData");
  };

  return (
    <div className="flex flex-col min-h-screen items-center w-full p-4 sm:p-8 md:p-12">
      <Header />

      <main className="flex flex-col items-center flex-grow w-full max-w-6xl mt-8 sm:mt-12">
        {displayData.length === 0 && !isLoading && (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              TrueInsight Analyzer
            </h1>
            <p className="text-lg text-gray-400 mt-2">
              Turn your social media data into actionable insights.
            </p>
          </div>
        )}

        <div className="mt-8 w-full flex justify-center">
          {error && <Alert message={error} />}
        </div>

        {data.length > 0 && !isLoading && (
          <div className="my-4 w-full flex justify-center">
            <DateRangePicker onDateChange={handleDateChange} />
          </div>
        )}

        <div className="mt-4 w-full flex justify-center">
          {isLoading ? (
            <Spinner />
          ) : data.length === 0 ? (
            <CsvUploader onDataUpload={handleDataUpload} onError={setError} />
          ) : (
            <Dashboard data={displayData} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}
