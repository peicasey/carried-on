"use server";

import { generateText } from "ai";
import { customModel } from "./ai";

const prompt = `i need each item that you see in this image to be classified with the following output. no extraneous outputs such as "Here is the result" only provide the direct text that I am asking for.

Below is the strict format for you to follow.

{
    "total": int,
    "valid": int,
    "items": [
        {
            "item_name": string,
            "isValid": bool,
            "desc": string
        }
    ]
 }

i need this to be strictly based on TSA guidelines, if it can't fly nationally, just say it cant fly`;

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
          content: prompt,
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
