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
      className={`bg-white border-2 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
        isGood !== undefined
          ? isGood
            ? "border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/30"
            : "border-orange-200 bg-gradient-to-br from-orange-50/50 to-amber-50/30"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            {title}
          </h3>
          {isGood !== undefined && (
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                isGood
                  ? "text-green-700 bg-green-100"
                  : "text-orange-700 bg-orange-100"
              }`}
            >
              {isGood ? "✓ Excellent" : "⚠ Needs Work"}
            </div>
          )}
        </div>
      </div>

      <div className="text-center pt-2">
        <div
          className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}
        >
          {value}
        </div>
        <p className="text-gray-600 text-sm font-medium">{description}</p>
      </div>
    </div>
  );
}
