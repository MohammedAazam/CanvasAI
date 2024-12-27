"use client";
import React, { useState, useRef } from "react";
import Canvas, { CanvasRef } from "@/components/Canvas";
import Header from "@/components/Header";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Line {
  points: { x: number; y: number }[];
}

const Main = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<CanvasRef>(null);
  const [color, setColor] = useState("black");

  const handleReset = () => {
    setLines([]);
    setResult(null);
  };

  const handleChangeColor = (color: string) => {
    setColor(color); // Update the color in the parent state
  };

  const handleGetResult = async () => {
    if (canvasRef.current) {
      const imageData = canvasRef.current.getCanvasImage();

      if (imageData) {
        setIsLoading(true);
        try {
          const response = await axios.post("/api/process", {
            image: imageData,
          });
          setResult(response.data.result);
        } catch (error) {
          console.error("Error processing image:", error);
          setResult(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("No image data found");
      }
      toast({
        title: "Calculation Result",
        description: `= ${result}`,
      });
    }
  };

  return (
    <><Header handleReset={handleReset} handleGetResult={handleGetResult}   handleChangeColor={handleChangeColor} /><Canvas selectedColor={color} lines={lines} setLines={setLines} ref={canvasRef} result={result} /></>
  );
};

export default Main;
