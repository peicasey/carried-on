import { ImageAnnotatorClient } from "@google-cloud/vision";

export async function POST(req: Request) {
  try {
    const client = new ImageAnnotatorClient();

    // Ensure you have the correct path to the image file or process the request for a file upload.
    // const imagePath = "public/test.png"; // Path to your local image (ensure this file exists)
    const imagePath =
      "https://cloud.google.com/vision/docs/images/bicycle_example.png"; // Path to your local image (ensure this file exists)

    // Perform label detection on the image
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations;

    // Return the labels as JSON response
    return new Response(
      JSON.stringify({ labels: labels?.map((label) => label.description) }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process image for label detection." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
