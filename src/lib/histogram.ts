import type { HistogramData } from "@/types/histogram";

/**
 * Initialize a histogram with 100 bins (1-100), all starting at count 0
 */
export function initializeHistogram(): HistogramData {
  return Array.from({ length: 100 }, (_, i) => ({
    label: i + 1,
    count: 0,
  }));
}

/**
 * Increment the count for a specific number in the histogram
 * Returns a new array (immutable update)
 */
export function incrementBin(data: HistogramData, number: number): HistogramData {
  // Validate number is in range
  if (number < 1 || number > 100) {
    console.warn(`Number ${number} out of range for histogram`);
    return data;
  }

  // Find the index (number - 1 because array is 0-indexed)
  const index = number - 1;

  // Create new array with updated count
  return data.map((bin, i) =>
    i === index ? { ...bin, count: bin.count + 1 } : bin
  );
}

/**
 * Reset histogram to all zeros
 */
export function resetHistogram(data: HistogramData): HistogramData {
  return data.map((bin) => ({ ...bin, count: 0 }));
}
