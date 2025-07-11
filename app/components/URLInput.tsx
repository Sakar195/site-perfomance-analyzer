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
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="space-y-4">
        <label
          htmlFor="url-input"
          className="block text-lg font-semibold text-gray-900 mb-2"
        >
          Website URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={`w-full px-4 py-4 border-2 rounded-xl text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-300"
              } ${loading ? "bg-gray-50 cursor-not-allowed" : "bg-white shadow-sm"}`}
              disabled={loading}
            />
            {!error && url.trim() && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🚀</span>
                Analyze
              </span>
            )}
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">!</span>
              </div>
              <div>
                <p className="text-red-900 font-medium text-sm">Invalid URL</p>
                <p className="text-red-800 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
