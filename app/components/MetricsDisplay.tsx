import { lazy, Suspense } from "react";
import { PerformanceMetrics } from "../types/performance";
import LazyLoadingFallback from "./LazyLoadingFallback";

// Lazy load MetricCard component
const MetricCard = lazy(() => import("./MetricCard"));

interface MetricsDisplayProps {
  metrics: PerformanceMetrics;
  url: string;
}

export default function MetricsDisplay({ metrics, url }: MetricsDisplayProps) {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getPerformanceScore = (
    score: number
  ): { color: string; label: string; bgColor: string } => {
    if (score >= 90)
      return {
        color: "text-green-600",
        label: "Excellent",
        bgColor: "bg-green-100",
      };
    if (score >= 70)
      return {
        color: "text-yellow-600",
        label: "Good",
        bgColor: "bg-yellow-100",
      };
    if (score >= 50)
      return {
        color: "text-orange-600",
        label: "Needs Improvement",
        bgColor: "bg-orange-100",
      };
    return { color: "text-red-600", label: "Poor", bgColor: "bg-red-100" };
  };

  const getMetricColor = (
    value: number,
    thresholds: { good: number; poor: number }
  ): string => {
    if (value <= thresholds.good) return "text-green-600";
    if (value <= thresholds.poor) return "text-yellow-600";
    return "text-red-600";
  };

  const scoreInfo = getPerformanceScore(metrics.performanceScore);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section with enhanced styling */}
      <div className="text-center border-b border-gray-100 pb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">📊</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Analysis Complete
          </h2>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
          <p className="text-gray-600 text-sm font-medium mb-1">
            Analyzed Website
          </p>
          <p className="text-gray-900 text-sm break-all font-mono bg-white px-3 py-2 rounded-lg border">
            {url}
          </p>
        </div>

        <div
          className={`inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-6 py-4 rounded-2xl border-2 ${scoreInfo.bgColor} ${
            scoreInfo.color === "text-green-600"
              ? "border-green-200"
              : scoreInfo.color === "text-yellow-600"
                ? "border-yellow-200"
                : scoreInfo.color === "text-orange-600"
                  ? "border-orange-200"
                  : "border-red-200"
          }`}
        >
          <span className="font-semibold text-gray-900 text-lg">
            Performance Score:
          </span>
          <span className={`font-bold text-2xl sm:text-3xl ${scoreInfo.color}`}>
            {metrics.performanceScore}/100
          </span>
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              scoreInfo.color === "text-green-600"
                ? "bg-green-100 text-green-800"
                : scoreInfo.color === "text-yellow-600"
                  ? "bg-yellow-100 text-yellow-800"
                  : scoreInfo.color === "text-orange-600"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
            }`}
          >
            {scoreInfo.label}
          </span>
        </div>
      </div>

      {/* Metrics grid with enhanced styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<LazyLoadingFallback type="card" />}>
          <MetricCard
            title="Load Time"
            value={`${(metrics.loadTime / 1000).toFixed(2)}s`}
            icon="⚡"
            description="First Contentful Paint"
            color="from-blue-500 to-blue-600"
            isGood={metrics.loadTime <= 1800}
          />
        </Suspense>

        <Suspense fallback={<LazyLoadingFallback type="card" />}>
          <MetricCard
            title="Page Size"
            value={formatSize(metrics.pageSize)}
            icon="📦"
            description="Total resource size"
            color="from-emerald-500 to-green-600"
            isGood={metrics.pageSize <= 1024 * 1024 * 2}
          />
        </Suspense>

        <Suspense fallback={<LazyLoadingFallback type="card" />}>
          <MetricCard
            title="Requests"
            value={metrics.requestCount.toString()}
            icon="🔄"
            description="HTTP requests made"
            color="from-purple-500 to-indigo-600"
            isGood={metrics.requestCount <= 50}
          />
        </Suspense>
      </div>

      {/* Core Web Vitals section with premium styling */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">🎯</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Core Web Vitals
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <span className="text-gray-900 font-semibold text-base block">
                  Largest Contentful Paint
                </span>
                <span className="text-gray-500 text-sm">
                  Main content loading time
                </span>
              </div>
              <span
                className={`font-bold text-xl ${getMetricColor(
                  metrics.largestContentfulPaint,
                  { good: 2500, poor: 4000 }
                )} bg-white px-3 py-1 rounded-lg border`}
              >
                {(metrics.largestContentfulPaint / 1000).toFixed(2)}s
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <span className="text-gray-900 font-semibold text-base block">
                  Cumulative Layout Shift
                </span>
                <span className="text-gray-500 text-sm">
                  Visual stability score
                </span>
              </div>
              <span
                className={`font-bold text-xl ${getMetricColor(
                  metrics.cumulativeLayoutShift,
                  { good: 0.1, poor: 0.25 }
                )} bg-white px-3 py-1 rounded-lg border`}
              >
                {metrics.cumulativeLayoutShift.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">📈</span>
            </div>
            <div>
              <p className="text-blue-900 font-semibold mb-2">
                Understanding Core Web Vitals
              </p>
              <p className="text-blue-800 text-sm leading-relaxed mb-3">
                These metrics reflect real user experience and directly impact
                your Google search rankings.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Excellent</span>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-700 font-medium">Good</span>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-700 font-medium">
                    Needs Improvement
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-medium">Poor</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
