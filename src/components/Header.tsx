"use client";

import React from "react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-700/60">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-blue-500"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.6"
            />
            <path
              d="M2 12L12 17L22 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.3"
            />
          </svg>

          <h1 className="text-xl font-semibold text-gray-50">TrueInsight</h1>
        </a>
      </div>
    </header>
  );
}
