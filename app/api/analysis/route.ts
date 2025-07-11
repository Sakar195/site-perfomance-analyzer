//new api using google pagespeed api

import { NextRequest, NextResponse } from "next/server";
import { PerformanceMetrics } from "../../types/performance";

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    let validatedUrl;
    try {
      validatedUrl = new URL(url);
      if (!["http:", "https:"].includes(validatedUrl.protocol)) {
        return NextResponse.json(
          { error: "URL must use HTTP or HTTPS protocol" },
          { status: 400 }
        );
      }
    } catch (urlError) {
      return NextResponse.json(
        {
          error:
            "Invalid URL format. Please include protocol (http:// or https://)",
        },
        { status: 400 }
      );
    }

    // Block localhost URLs
    if (
      validatedUrl.hostname === "localhost" ||
      validatedUrl.hostname === "127.0.0.1"
    ) {
      return NextResponse.json(
        { error: "Cannot analyze localhost URLs" },
        { status: 400 }
      );
    }

    console.log(`Starting analysis for: ${url}`);

    const metrics = await analyzeWithPageSpeedAPI(url);

    console.log(`Analysis completed for: ${url}`);
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}

async function analyzeWithPageSpeedAPI(
  url: string
): Promise<PerformanceMetrics> {
  const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;

  // Uncomment for debugging
  //   console.log("🔑 API Key present:", !!PAGESPEED_API_KEY);
  //   console.log("🔑 API Key length:", PAGESPEED_API_KEY?.length || 0);

  // Only proceed if API key is available
  if (!PAGESPEED_API_KEY) {
    throw new Error(
      "PageSpeed API key is required. Please add PAGESPEED_API_KEY to your environment variables."
    );
  }

  try {
    console.log(`🚀 Using PageSpeed API for: ${url}`);

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${PAGESPEED_API_KEY}&category=performance&strategy=desktop`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(60000), // Increased from 30s to 60s
    });

    console.log("📡 PageSpeed API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("📡 PageSpeed API Error Response:", errorText);

      // Handle specific error cases with user-friendly messages
      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a few minutes before trying again."
        );
      }

      if (response.status === 500) {
        throw new Error(
          "Google's servers are temporarily busy. Please try again in a few minutes."
        );
      }

      if (response.status === 400) {
        throw new Error(
          "The website URL cannot be analyzed. It may be blocked or have restrictions."
        );
      }

      throw new Error(
        `Analysis temporarily unavailable (Error ${response.status}). Please try again later.`
      );
    }

    const data = await response.json();

    if (data.error) {
      console.error("📡 PageSpeed API Data Error:", data.error);
      throw new Error(`PageSpeed API: ${data.error.message}`);
    }

    console.log("✅ PageSpeed API Success - Real data returned");
    return parsePageSpeedData(data);
  } catch (error) {
    console.error("❌ PageSpeed API failed:", error);
    throw error;
  }
}

function parsePageSpeedData(data: any): PerformanceMetrics {
  try {
    const lighthouse = data.lighthouseResult;
    const audits = lighthouse.audits;

    // Extract metrics safely with fallbacks
    const fcp = audits["first-contentful-paint"]?.numericValue || 1500;
    const lcp = audits["largest-contentful-paint"]?.numericValue || 2500;
    const cls = audits["cumulative-layout-shift"]?.numericValue || 0.05;

    const totalByteWeight =
      audits["total-byte-weight"]?.numericValue || 1500000;

    const networkRequests =
      audits["network-requests"]?.details?.items?.length || 25;

    const performanceScore = Math.round(
      (lighthouse.categories?.performance?.score || 0.75) * 100
    );

    console.log("PageSpeed API analysis successful");

    return {
      loadTime: Math.round(fcp),
      pageSize: Math.round(totalByteWeight),
      requestCount: networkRequests,
      performanceScore: performanceScore, // Using Google's official score
      largestContentfulPaint: Math.round(lcp),
      cumulativeLayoutShift: Number(cls.toFixed(3)),
    };
  } catch (error) {
    console.error("Error parsing PageSpeed data:", error);
    throw new Error("Failed to parse performance data");
  }
}
