import { PerformanceMetrics } from "../types/performance";

export const analyzeWebsitePerformance = async (
  url: string
): Promise<PerformanceMetrics> => {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `API request failed: ${response.status}`
      );
    }

    const metrics: PerformanceMetrics = await response.json();
    return metrics;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to analyze website: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while analyzing the website");
  }
};
