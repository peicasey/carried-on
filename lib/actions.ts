"use server";

import { generateText } from "ai";
import { customModel } from "./ai";

export async function analyzeImage(imageUrl: string) {
  try {
    // console.log("helllloooo?");
    console.log("Analyzing image URL:", imageUrl);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in the environment variables");
    }

    const result = await generateText({
      model: customModel("gpt-4o-mini"),
      messages: [
        {
          role: "user",
          content: "can you tell me what is in this image?",
          experimental_attachments: [
            {
              url: imageUrl,
              name: "test-packing.jpeg",
              contentType: "image/jpeg",
            },
          ],
        },
      ],
    });

    console.log("API Response:", result.text);

    return result.text;
  } catch (error) {
    console.error("Error in analyzeImage:", error);
    throw new Error(
      "Failed to analyze image: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
