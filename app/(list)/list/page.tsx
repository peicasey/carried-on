"use client";
import { ImageUploader } from "@/components/image-uploader";
import { ItemList } from "@/components/item-list";
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
    <div className="w-[100vw] min-h-[100vh] p-10 flex justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-center">From List</h1>
          {/* <Button variant="ghost" size="icon">
            <InfoIcon />
          </Button> */}
        </div>

        <ItemList />
      </div>
    </div>
  );
}
