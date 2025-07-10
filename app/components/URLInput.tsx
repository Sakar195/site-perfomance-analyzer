"use client";

import { useState } from "react";
import { validateUrl } from "../utils/validation";

interface URLInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export default function URLInput({ onAnalyze, loading }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError(validation.error || "Invalid URL");
      return;
    }

    setError(null);
    onAnalyze(validation.normalizedUrl!);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="space-y-3 sm:space-y-4">
        <label
          htmlFor="url-input"
          className="block text-base sm:text-lg font-semibold text-gray-800"
        >
          Website URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-base sm:text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-2 bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
