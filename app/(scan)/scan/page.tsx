"use client";

import FancyList from "@/components/fancy-list";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [analysis, setAnalysis] = useState<string | null>(null);

  const router = useRouter();

  return (
    <div className="w-[100vw] min-h-[100vh] p-10 flex justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-center">From Image</h1>
          <Button variant="ghost" size="icon">
            <InfoIcon />
          </Button>
        </div>

        <ImageUploader analysis={analysis} setAnalysis={setAnalysis} />

        {analysis && <FancyList jsonString={analysis}></FancyList>}

        {analysis && (
          <Button onClick={() => router.push("/chat")}>
            Have more questions?
          </Button>
        )}
      </div>
    </div>
  );
}
