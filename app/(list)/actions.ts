"use server";

import { customModel } from "@/lib/ai";
import { generateText } from "ai";

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
      messages: [
        {
          role: "user",
          content:
            "Can you say yes or no, and explain why each of the following items are appropriate given TSA guidelines? Items: " +
            item_list,
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
