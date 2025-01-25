"use client";
// In a React component (for example, pages/index.js)
import { useState } from "react";

export default function Home() {
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
    <div>
      <h1>Image Label Detection</h1>
      <button onClick={fetchLabels} disabled={loading}>
        {loading ? "Loading..." : "Fetch Labels"}
      </button>

      <ul>
        {labels.map((label, index) => (
          <li key={index}>{label}</li>
        ))}
      </ul>
    </div>
  );
}
