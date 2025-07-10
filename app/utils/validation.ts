import { ValidationResult } from "../types/performance";

export const validateUrl = (input: string): ValidationResult => {
  if (!input.trim()) {
    return { isValid: false, error: "URL is required" };
  }

  try {
    // Add protocol if missing
    let normalizedUrl = input.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const url = new URL(normalizedUrl);

    // Basic validation
    if (!url.hostname) {
      return { isValid: false, error: "Invalid URL format" };
    }

    // Check for valid protocol
    if (!["http:", "https:"].includes(url.protocol)) {
      return { isValid: false, error: "URL must use HTTP or HTTPS protocol" };
    }

    return {
      isValid: true,
      normalizedUrl: url.toString(),
    };
  } catch (error) {
    return { isValid: false, error: "Invalid URL format" };
  }
};
