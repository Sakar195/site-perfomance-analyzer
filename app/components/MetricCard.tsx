interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
  description: string;
  color: string;
  isGood?: boolean;
}

export default function MetricCard({
  title,
  value,
  icon,
  description,
  color,
  isGood,
}: MetricCardProps) {
  return (
    <div
      className={`bg-white border rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
        isGood !== undefined
          ? isGood
            ? "border-green-200 bg-green-50/30"
            : "border-orange-200 bg-orange-50/30"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${color} rounded-full flex items-center justify-center text-white text-lg sm:text-xl shadow-md`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {title}
          </h3>
          {isGood !== undefined && (
            <div
              className={`text-xs font-medium ${
                isGood ? "text-green-600" : "text-orange-600"
              }`}
            >
              {isGood ? "✓ Good" : "⚠ Needs Improvement"}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div
          className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1 sm:mb-2`}
        >
          {value}
        </div>
        <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
      </div>
    </div>
  );
}
