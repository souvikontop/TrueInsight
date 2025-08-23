"use client";

import { useState, useEffect } from "react"; // 1. Import useEffect
import Header from "@/components/Header";
import CsvUploader from "@/components/CsvUploader";
import Dashboard from "@/components/Dashboard";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import DateRangePicker from "@/components/DateRangePicker"; // 2. Import the new component
import { SocialPost } from "@/types";
import { cleanData } from "@/lib/data-utils";

export default function Home() {
  const [data, setData] = useState<SocialPost[]>([]); // This will hold the original, full dataset
  const [displayData, setDisplayData] = useState<SocialPost[]>([]); // This will hold the data to be displayed
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 3. This effect runs whenever the dateRange or original data changes
  useEffect(() => {
    if (!dateRange || !dateRange.start || !dateRange.end) {
      setDisplayData(data); // If no date range, display all data
      return;
    }

    const filtered = data.filter((post) => {
      const postDate = post.date;
      return postDate >= dateRange.start && postDate <= dateRange.end;
    });
    setDisplayData(filtered);
  }, [data, dateRange]);

  const handleDataUpload = async (parsedData: any[]) => {
    setIsLoading(true);
    setError(null);
    setDateRange(null);

    // ... validation logic remains the same
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
    setData(cleanedData); // Set the original data
    setDisplayData(cleanedData); // Initially, display all data
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
  };

  return (
    <div className="flex flex-col min-h-screen items-center w-full p-4 sm:p-8 md-p-12">
      <Header />

      <main className="flex flex-col items-center flex-grow w-full max-w-6xl mt-16 sm:mt-24">
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

        {/* 4. Conditionally render the DateRangePicker */}
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
            // 5. Pass the 'displayData' to the Dashboard
            <Dashboard data={displayData} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}
