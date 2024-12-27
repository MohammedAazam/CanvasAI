"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brush } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  handleReset: () => void;
  handleGetResult: () => void;
  result?: string;
  handleChangeColor: (color: string) => void;
}

const Header = ({ handleReset, handleGetResult, result, handleChangeColor }: HeaderProps) => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const colors = ["black", "red", "green", "blue", "purple", "orange"];

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session, token, etc.)
    router.push('/login');
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    handleChangeColor(color);
  };

  const handleFetchResult = async () => {
    setLoading(true);
    await handleGetResult();
    setLoading(false);
  };

  return (
    <header className="fixed top-4 left-4 right-4 bg-black bg-opacity-90 shadow-lg backdrop-blur-md z-50 rounded-lg">
      <div className="relative flex items-center justify-between px-6 py-3">
        <div className="flex items-center text-2xl font-bold text-white">
          <Brush className="mr-2 text-white" />
          CanvasAI
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-white" : "border-transparent"}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <Button variant="destructive" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" className="bg-green-600 text-white border-none" onClick={handleFetchResult} disabled={loading}>
            {loading ? "Fetching result..." : "Get Result"}
          </Button>
          <Button variant="link" className="text-white" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {result && (
        <div className="text-white mt-4 px-6 text-sm">
          {result}
        </div>
      )}
    </header>
  );
};

export default Header;
