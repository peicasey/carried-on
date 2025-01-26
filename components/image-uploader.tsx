"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeImage } from "@/lib/actions";

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function imageUrlToBlob(imageUrl: string): Promise<Blob | null> {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const imageBlob = await response.blob();

      return imageBlob;
    } catch (error) {
      console.error("Error converting image URL to Blob:", error);
      return null;
    }
  }

  async function uploadImage() {
    try {
      const imageBlob = await imageUrlToBlob(image ?? "");

      // Prepare the FormData object with the image Blob
      const formData = new FormData();
      if (imageBlob !== null) {
        formData.append("file", imageBlob, "camera_item.jpg"); // You can adjust the file name as needed
      }

      // Send the request to the upload endpoint
      const uploadResponse = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
        headers: {
          // Add any necessary headers here, like authorization tokens if needed
          // 'Authorization': 'Bearer your_token', // if authentication is required
        },
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error("Upload failed:", errorData.error);
        return null;
      }

      const uploadData = await uploadResponse.json();
      console.log("Upload successful:", uploadData);
      setImageURL(uploadData.url);
      console.log(imageURL);
      console.log(uploadData.url);
      return uploadData; // The response data (e.g., file URL or metadata)
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
      uploadImage();
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
    console.log(imageURL);
    if (imageURL) {
      setIsLoading(true);
      try {
        const result = await analyzeImage(imageURL);
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
