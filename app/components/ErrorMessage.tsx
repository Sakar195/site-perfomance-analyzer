interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 my-4 sm:my-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
          ❌
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-red-800 text-center sm:text-left">
          Analysis Failed
        </h3>
      </div>

      <p className="text-red-700 mb-3 sm:mb-4 text-sm sm:text-base text-center sm:text-left">
        {message}
      </p>

      <div className="bg-white p-3 sm:p-4 rounded-lg border border-red-200">
        <p className="font-semibold text-red-800 mb-2 text-sm sm:text-base">
          Possible solutions:
        </p>
        <ul className="list-disc list-inside text-red-700 space-y-1 text-sm sm:text-base">
          <li>Ensure the URL is correct and accessible</li>
          <li>Check if the website is online</li>
          <li>Try again in a few moments</li>
        </ul>
      </div>
    </div>
  );
}
