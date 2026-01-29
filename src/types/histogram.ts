/**
 * Histogram Types
 */

export interface HistogramBin {
  label: number; // Number from 1-100
  count: number; // Frequency of this number
}

export type HistogramData = HistogramBin[];
