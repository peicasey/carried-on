"use server";

import { generateText } from "ai";
import { customModel } from "./ai";

export async function analyzeImage(imageUrl: string) {
  try {
    console.log("Analyzing image URL:", imageUrl);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in the environment variables");
    }

    const result = await generateText({
      model: customModel("gpt-4o-mini"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What items are in this photo and do they comply with TSA guidelines?",
            },
            {
              type: "image",
              image: imageUrl,

              // OpenAI specific extension - image detail:
              experimental_providerMetadata: {
                openai: { imageDetail: "low" },
              },
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
