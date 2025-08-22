// The "use client" directive is necessary for components that use React Hooks for interactivity.
// In our case, we'll eventually add interactive elements, so it's good practice to include it now.
"use client";

import React from "react";

// This is a functional component in React.
// It's a JavaScript function that returns JSX (HTML-like syntax).
export default function Header() {
  return (
    <header className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* We'll replace this with a real logo later */}
          <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
          <h1 className="text-xl font-bold text-gray-50">TrueInsight</h1>
        </div>
        <p className="text-sm text-gray-400">
          Social Content Performance Analyzer
        </p>
      </div>
    </header>
  );
}
