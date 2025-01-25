export const submitToGoogle = async (imageUri: string) => {
  try {
    const response = await fetch(
      `/api/vision?imageUri=${encodeURIComponent(imageUri)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result); // Logs the result from Google Vision API
  } catch (error) {
    console.error("Error:", error);
  }
};
