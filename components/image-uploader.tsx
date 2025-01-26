"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeImage } from "@/lib/actions";

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const captureWebcam = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      setShowWebcam(false);
    }
  };

  const handleAnalyze = async () => {
    if (image) {
      setIsLoading(true);
      try {
        const result = await analyzeImage(image);
        setAnalysis(result);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setAnalysis("An error occurred while analyzing the image.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {showWebcam ? (
        <div className="space-y-2">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
          <Button onClick={captureWebcam}>Capture Photo</Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
          <Button onClick={() => setShowWebcam(true)}>Use Webcam</Button>
        </div>
      )}
      {image && (
        <div className="space-y-2">
          <img
            src={image || "/placeholder.svg"}
            alt="Uploaded"
            className="max-w-full h-auto"
          />
          <Button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Image"}
          </Button>
        </div>
      )}
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Analysis Result:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}
