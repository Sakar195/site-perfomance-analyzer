"use client";

import { useState, lazy, Suspense } from "react";
import URLInput from "./URLInput";
import LazyLoadingFallback from "./LazyLoadingFallback";
import { analyzeWebsitePerformance } from "../services/performanceService";
import { PerformanceMetrics } from "../types/performance";

// Lazy load components that are conditionally rendered
const MetricsDisplay = lazy(() => import("./MetricsDisplay"));
const LoadingSpinner = lazy(() => import("./LoadingSpinner"));
const ErrorMessage = lazy(() => import("./ErrorMessage"));

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
    <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-gray-100 p-6 sm:p-8 md:p-10 mx-2 sm:mx-4 backdrop-blur-sm">
      {/* Header with subtle accent */}
      <div className="border-b border-gray-100 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">🔍</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Performance Analysis
          </h2>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          Enter a website URL to get comprehensive performance insights
        </p>
      </div>

      <URLInput onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <Suspense
          fallback={
            <LazyLoadingFallback
              type="spinner"
              message="Loading performance analysis..."
            />
          }
        >
          <LoadingSpinner />
        </Suspense>
      )}

      {error && (
        <Suspense
          fallback={
            <LazyLoadingFallback
              type="skeleton"
              message="Loading error details..."
            />
          }
        >
          <ErrorMessage message={error} />
        </Suspense>
      )}

      {metrics && !loading && (
        <Suspense
          fallback={
            <LazyLoadingFallback
              type="skeleton"
              message="Loading analysis results..."
            />
          }
        >
          <MetricsDisplay metrics={metrics} url={analyzedUrl} />
        </Suspense>
      )}

      {/* Enhanced disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">ℹ</span>
            </div>
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">
                Analysis Note
              </p>
              <p className="text-xs text-blue-800 leading-relaxed">
                Some websites may block analysis due to anti-bot protection,
                CORS policies, or rate limiting. Results are powered by Google
                PageSpeed Insights for accurate, real-world performance data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
