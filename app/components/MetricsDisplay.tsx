import { PerformanceMetrics } from "../types/performance";
import MetricCard from "./MetricCard";

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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="text-center border-b pb-4 sm:pb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Performance Analysis Results
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm break-all mb-3 sm:mb-4 px-2">
          {url}
        </p>
        <div
          className={`inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full ${scoreInfo.bgColor}`}
        >
          <span className="font-semibold text-gray-800 text-sm sm:text-base">
            Performance Score:
          </span>
          <span className={`font-bold text-lg sm:text-xl ${scoreInfo.color}`}>
            {metrics.performanceScore}/100
          </span>
          <span className={`text-xs sm:text-sm font-medium ${scoreInfo.color}`}>
            ({scoreInfo.label})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          title="Load Time"
          value={`${(metrics.loadTime / 1000).toFixed(2)}s`}
          icon="⚡"
          description="First Contentful Paint"
          color="from-blue-500 to-blue-600"
          isGood={metrics.loadTime <= 1800}
        />

        <MetricCard
          title="Page Size"
          value={formatSize(metrics.pageSize)}
          icon="📊"
          description="Total resource size"
          color="from-green-500 to-green-600"
          isGood={metrics.pageSize <= 1024 * 1024 * 2} // 2MB threshold
        />

        <MetricCard
          title="Requests"
          value={metrics.requestCount.toString()}
          icon="🔄"
          description="HTTP requests made"
          color="from-purple-500 to-purple-600"
          isGood={metrics.requestCount <= 50}
        />
      </div>

      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Core Web Vitals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <span className="text-gray-600 font-medium text-sm sm:text-base">
                Largest Contentful Paint:
              </span>
              <span
                className={`font-bold text-sm sm:text-base ${getMetricColor(
                  metrics.largestContentfulPaint,
                  { good: 2500, poor: 4000 }
                )}`}
              >
                {(metrics.largestContentfulPaint / 1000).toFixed(2)}s
              </span>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <span className="text-gray-600 font-medium text-sm sm:text-base">
                Cumulative Layout Shift:
              </span>
              <span
                className={`font-bold text-sm sm:text-base ${getMetricColor(
                  metrics.cumulativeLayoutShift,
                  { good: 0.1, poor: 0.25 }
                )}`}
              >
                {metrics.cumulativeLayoutShift.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Core Web Vitals:</strong> Google's metrics for user
            experience.
            <span className="text-green-600"> Good</span> •
            <span className="text-yellow-600"> Needs Improvement</span> •
            <span className="text-red-600"> Poor</span>
          </p>
        </div>
      </div>
    </div>
  );
}
