import { ImageAnnotatorClient } from "@google-cloud/vision";

export async function POST(req: Request) {
  try {
    const client = new ImageAnnotatorClient();

    // Read the body as plain text and then parse it as JSON
    const body = await req.text();
    const { imageURL } = JSON.parse(body);
    console.log(JSON.parse(body));

    if (!imageURL) {
      return new Response(JSON.stringify({ error: "No image URL provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Perform label detection on the image from the provided URL
    const [result] = await client.labelDetection(imageURL);
    const labels = result.labelAnnotations;

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
