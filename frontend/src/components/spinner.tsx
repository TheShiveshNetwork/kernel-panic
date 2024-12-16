// components/spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-t-purple-500 border-b-4 border-b-pink-500"></div>
        <div className="absolute rounded-full h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
};

export default Spinner;
