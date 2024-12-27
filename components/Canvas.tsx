"use client";
import React, { useState, useEffect, useRef, useImperativeHandle, MouseEvent, TouchEvent, forwardRef } from "react";
import { Dispatch, SetStateAction } from "react";

interface Line {
  points: { x: number; y: number }[];
  color: string;
}

interface CanvasProps {
  lines: Line[];
  setLines: Dispatch<SetStateAction<Line[]>>;
  result?: number | null;
  selectedColor: string;
}

export interface CanvasRef {
  getCanvasImage: () => string;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(function Canvas({ lines, setLines, result, selectedColor }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);

  const displayResult = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, result: number) => {
    // Calculate scaled dimensions
    const scale = window.devicePixelRatio;
    const displayWidth = canvas.width / scale;
    const displayHeight = canvas.height / scale;

    // Create result box
    const padding = 20;
    const boxWidth = displayWidth * 0.8;
    const boxHeight = 120;
    const boxX = (displayWidth - boxWidth) / 2;
    const boxY = displayHeight - boxHeight - padding;

    // Draw background box with shadow
    ctx.save();
    ctx.fillStyle = "black";
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw title
    ctx.fillStyle = "white";
    ctx.font = "bold 24px arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "Computed Result",
      displayWidth / 2,
      boxY + padding + 24
    );

    // Draw result
    ctx.fillStyle = "white";
    ctx.font = "32px arial";
    ctx.fillText(
      result.toString(),
      displayWidth / 2,
      boxY + padding + 70
    );
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to the window's width and height
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    // Adjust for high DPI displays
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

    // Draw all lines with their respective color
    lines.forEach((line) => {
      if (line.points.length < 2) return;

      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);

      line.points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.stroke();
    });

    // Display the result on the canvas
    if (result !== null && result !== undefined) {
      displayResult(ctx, canvas, result);
    }
  }, [lines, result]);

  // Rest of your component code remains the same...
  const getLineIntermediatePoints = (x1: number, y1: number, x2: number, y2: number) => {
    // Interpolate more points between x1, y1 and x2, y2 to make the line smoother
    const points = [];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.round(distance / 5), 5); // Control how smooth the lines are

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const xt = x1 + t * dx;
      const yt = y1 + t * dy;
      points.push({ x: xt, y: yt });
    }

    return points;
  };

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    isDrawing.current = true;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    lastTouch.current = { x: clientX, y: clientY };
    setLines((prevLines) => [
      ...prevLines,
      { points: [{ x: clientX, y: clientY }], color: selectedColor }, // Add the color to the new line
    ]);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing.current || !lastTouch.current) return;

    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;

    // Get intermediate points between the last touch and the current touch
    const newPoints = getLineIntermediatePoints(lastTouch.current.x, lastTouch.current.y, clientX, clientY);
    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      const newLastLine = {
        ...lastLine,
        points: [...lastLine.points, ...newPoints],
      };
      return [...prevLines.slice(0, -1), newLastLine];
    });

    lastTouch.current = { x: clientX, y: clientY };
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastTouch.current = null;
  };

  useImperativeHandle(ref, () => ({
    getCanvasImage: () => {
      const canvas = canvasRef.current;
      if (!canvas) return "";

      // Create a temporary canvas to ensure white background
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return "";

      // Fill white background
      tempCtx.fillStyle = "white";
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the original canvas content
      tempCtx.drawImage(canvas, 0, 0);

      // Convert to base64 with JPEG format
      return tempCanvas.toDataURL("image/jpeg", 1.0);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
      className="fixed top-0 left-0 w-screen h-screen border-none bg-white cursor-crosshair z-10"
    />
  );
});

export default Canvas;