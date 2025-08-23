import { AlertTriangle } from "lucide-react";
import React from "react";

interface AlertProps {
  message: string;
}

export default function Alert({ message }: AlertProps) {
  return (
    <div
      className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative w-full max-w-lg"
      role="alert"
    >
      <div className="flex items-center">
        <div className="py-1">
          <AlertTriangle className="h-6 w-6 text-red-400 mr-4" />
        </div>
        <div>
          <p className="font-bold">An error occurred</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
