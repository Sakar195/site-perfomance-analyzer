import PerformanceAnalyzer from "./components/PerformanceAnalyzer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-4">
      <header className="text-center py-6 sm:py-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <span className="text-3xl sm:text-4xl">⚡</span>
          <span className="leading-tight">Website Performance Analyzer</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
          Analyze any website's performance metrics instantly and get detailed
          insights about load times, page size, and resource optimization.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-2 sm:px-4">
        <PerformanceAnalyzer />
      </main>
    </div>
  );
}
