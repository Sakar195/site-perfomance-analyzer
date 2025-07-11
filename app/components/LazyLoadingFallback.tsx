interface LazyLoadingFallbackProps {
  type?: "spinner" | "skeleton" | "card";
  message?: string;
}

export default function LazyLoadingFallback({
  type = "spinner",
  message = "Loading...",
}: LazyLoadingFallbackProps) {
  if (type === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    );
  }

  if (type === "skeleton") {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
        </div>
      </div>
    );
  }

  return null;
}
