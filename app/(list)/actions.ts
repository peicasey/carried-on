"use server";

import { customModel } from "@/lib/ai";
import { generateText } from "ai";

const prompt = `. i need each item to be classified with the following output. no extraneous outputs such as "Here is the result" only provide the direct text that I am asking for.

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

function convertArrayToCommaSeparatedList(items: string[]): string {
  return items.join(", ");
}

export async function analyzeList(items: string[]) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in the environment variables");
    }

    const item_list = convertArrayToCommaSeparatedList(items);

    const result = await generateText({
      model: customModel("gpt-4o-mini"),
      prompt:
        "This is a list of items of items I'm planning on bringing on the plane: " +
        item_list +
        prompt,
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
