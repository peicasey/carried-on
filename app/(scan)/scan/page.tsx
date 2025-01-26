"use client";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLabels = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vision", {
        method: "POST",
      });

      const data = await response.json();
      setLabels(data.labels || []);
    } catch (error) {
      console.error("Error fetching labels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-10 flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-center">From Image</h1>
          <Button variant="outline" size="icon">
            <InfoIcon />
          </Button>
        </div>

        <ImageUploader />

        <Button onClick={fetchLabels} disabled={loading}>
          {loading ? "Loading..." : "Submit Images"}
        </Button>

        <ul>
          {labels.map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
