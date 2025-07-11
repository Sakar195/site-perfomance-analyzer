export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      <div className="relative">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-700 font-semibold mt-4 text-base sm:text-lg text-center px-4">
        Analyzing website performance...
      </p>
      <p className="text-gray-500 text-xs sm:text-sm mt-1 text-center px-4">
        This may take up to 60 seconds for complex websites
      </p>
    </div>
  );
}
