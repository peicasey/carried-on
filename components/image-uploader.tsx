"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeImage } from "@/lib/actions";
import { Camera, LoaderCircle, Sparkles } from "lucide-react";

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

  async function uploadImage(imageUrl: string) {
    try {
      const imageBlob = await imageUrlToBlob(imageUrl ?? "");

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
    setShowWebcam(false); // Hides the webcam interface (if used)

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Read the file as Data URL
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string; // This is the base64-encoded image

        // Update the image state after reading the file
        setImage(imageUrl);

        // Now that image has been set, proceed with uploading
        const uploadData = await uploadImage(imageUrl);
        // Handle the uploaded data if needed, e.g., updating UI
      };

      // Start reading the file
      reader.readAsDataURL(file);
    }
  };

  const captureWebcam = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      setShowWebcam(false);
      const uploadData = await uploadImage(imageSrc);
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
    <div className="space-y-4 h-full">
      <div className="w-full flex gap-4 justify-between">
        <Button
          onClick={() => setShowWebcam(true)}
          size="icon"
          disabled={showWebcam}
          className="px-4"
        >
          <Camera />
        </Button>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hover:cursor-pointer text-sm"
        />
      </div>
      {showWebcam ? (
        <div className="w-full space-y-4">
          <div className="flex items-center justify-center w-[calc(100vw-5rem)] h-[calc(75vw-5rem)] rounded-md z-10 absolute overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              classID="w-full"
            />
          </div>
          <div className="bg-neutral-300 dark:bg-neutral-600 rounded-md flex items-center justify-center w-[calc(100vw-5rem)] h-[calc(75vw-5rem)] z-[-2]">
            <LoaderCircle className="animate-spin" />
          </div>
          <div className="w-full flex items-center justify-center">
            <Button onClick={captureWebcam}>
              <Camera /> Capture Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          {image ? (
            <div className="flex items-center justify-center rounded-md w-[calc(100vw-5rem)] h-[calc(75vw-5rem)] overflow-hidden">
              <img
                src={image || "/placeholder.png"}
                alt="Uploaded"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-md w-[calc(100vw-5rem)] h-[calc(75vw-5rem)] overflow-hidden">
              <img
                src="/placeholder.png"
                alt="Uploaded"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          <Button
            onClick={handleAnalyze}
            disabled={!image || isLoading}
            size="lg"
            className=""
          >
            <Sparkles /> {isLoading ? "Analyzing..." : "Analyze Image"}
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
