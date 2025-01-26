"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visionResult, setVisionResult] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Error accessing the camera", err ?? "");
      setError(
        "Failed to access the camera. Please make sure you've granted the necessary permissions."
      );
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, 640, 480);
      const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setImageUrl(imageDataUrl);
    }
  };

  async function imageUrlToBlob(imageUrl: string): Promise<Blob | null> {
    try {
      // Fetch the image from the local URL
      const response = await fetch(imageUrl);

      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      // Convert the response into a Blob
      const imageBlob = await response.blob();

      // Return the Blob
      return imageBlob;
    } catch (error) {
      console.error("Error converting image URL to Blob:", error);
      return null;
    }
  }

  async function uploadImage() {
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
      return uploadData; // The response data (e.g., file URL or metadata)
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }

  //   const processImageWithVision = async (imageUrl: string) => {
  //     setProcessing(true);
  //     setError(null);
  //     try {
  //       const response = await fetch("/api/vision", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ imagePath: imageUrl }),
  //       });

  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         throw new Error(errorText || "Failed to process image with vision API");
  //       }

  //       const result = await response.json();
  //       setVisionResult(result.result);
  //     } catch (error) {
  //       toast.error("Error processing image with vision:", error ?? "");
  //       setError(
  //         error instanceof Error
  //           ? error.message
  //           : "Error processing image with vision"
  //       );
  //     } finally {
  //       setProcessing(false);
  //     }
  //   };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-md" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      <div className="flex space-x-2">
        <button
          onClick={takePhoto}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Take Photo
        </button>
        <button
          onClick={uploadImage}
          disabled={!imageUrl || uploading || processing}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading
            ? "Uploading..."
            : processing
            ? "Processing..."
            : "Upload and Process"}
        </button>
      </div>
      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Captured"
            className="max-w-md rounded-lg shadow-md"
          />
        </div>
      )}
      {visionResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Vision API Result:</h3>
          <p>{visionResult}</p>
        </div>
      )}
    </div>
  );
}
