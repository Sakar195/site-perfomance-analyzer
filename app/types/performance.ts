export interface PerformanceMetrics {
  loadTime: number; // in milliseconds
  pageSize: number; // in bytes
  requestCount: number;
  performanceScore: number; // 0-100
  largestContentfulPaint: number; // in milliseconds
  cumulativeLayoutShift: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  normalizedUrl?: string;
}
