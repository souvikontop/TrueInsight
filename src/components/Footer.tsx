import { Heart } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto border-t border-gray-700/60 mt-12 py-8">
      <div className="flex items-center justify-center text-sm text-gray-500">
        Made with
        <Heart className="w-4 h-4 mx-1.5 fill-red-500 stroke-red-500" />
        by
        <a
          href="https://github.com/your-github-username" // Change this to your link
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 font-semibold text-gray-400 hover:text-gray-200 transition-colors"
        >
          Souvik Dutta
        </a>
      </div>
    </footer>
  );
}
