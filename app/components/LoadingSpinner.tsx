export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16">
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 rounded-full"></div>
        {/* Inner spinning ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        {/* Center dot */}
        <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing Performance
        </h3>
        <p className="text-gray-600 font-medium mb-1">
          Running comprehensive analysis...
        </p>
        <p className="text-gray-500 text-sm">
          This may take up to 60 seconds for complex websites
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-2 mt-6">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
