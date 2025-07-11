interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 my-6 sm:my-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5">
        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
          <span className="text-white">🚫</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-red-900 mb-2">
            Analysis Failed
          </h3>
          <p className="text-red-700 text-base leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <h4 className="font-bold text-red-900 text-lg">
            Troubleshooting Steps
          </h4>
        </div>

        <ul className="space-y-3 text-red-800">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Verify the URL is correct and publicly accessible</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Check if the website is currently online and responsive</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Wait a few moments and try analyzing again</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Some websites block automated analysis tools</span>
          </li>
        </ul>

        <div className="mt-5 pt-4 border-t border-red-200">
          <p className="text-red-700 text-sm leading-relaxed">
            <strong>Note:</strong> If the issue persists, the website may have
            anti-bot protection or rate limiting enabled that prevents automated
            performance analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
