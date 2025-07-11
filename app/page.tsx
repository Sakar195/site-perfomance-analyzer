import PerformanceAnalyzer from "./components/PerformanceAnalyzer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-2 sm:p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184)_1px,transparent_0)] bg-[size:24px_24px] opacity-[0.03]"></div>

      <header className="relative text-center py-8 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-6">
            <span className="text-2xl sm:text-3xl text-white">⚡</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 tracking-tight">
            Website Performance
            <span className="block">Analyzer</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Analyze any website&apos;s performance metrics instantly with
            <span className="text-blue-600 font-semibold">
              {" "}
              Google PageSpeed Insights
            </span>
            . Get detailed insights about load times, Core Web Vitals, and
            optimization opportunities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Core Web Vitals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Performance Score</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-2 sm:px-4">
        <PerformanceAnalyzer />
      </main>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  );
}
