"use client";

import { useState } from "react";
import URLInput from "./URLInput";
import MetricsDisplay from "./MetricsDisplay";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { analyzeWebsitePerformance } from "../services/performanceService";
import { PerformanceMetrics } from "../types/performance";

export default function PerformanceAnalyzer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>("");

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setError(null);
    setMetrics(null);
    setAnalyzedUrl(url);

    try {
      const result = await analyzeWebsitePerformance(url);
      setMetrics(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-4">
      <URLInput onAnalyze={handleAnalyze} loading={loading} />

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {metrics && !loading && (
        <MetricsDisplay metrics={metrics} url={analyzedUrl} />
      )}

      {/* Disclaimer for certain websites */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-500 text-center">
          <span className="font-medium">Note:</span> Some websites (YouTube,
          Amazon, Facebook, etc.) may block analysis due to anti-bot protection
          or CORS policies.
        </p>
      </div>
    </div>
  );
}
