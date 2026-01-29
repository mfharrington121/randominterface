"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsPanelProps {
  rawNumbers: number[];
  histogramData: Array<{ label: number; count: number }>;
}

export function StatsPanel({ rawNumbers, histogramData }: StatsPanelProps) {
  if (rawNumbers.length === 0) {
    return null; // Don't show stats if no numbers generated
  }

  // Calculate statistics
  const total = rawNumbers.length;
  const average = (rawNumbers.reduce((sum, num) => sum + num, 0) / total).toFixed(1);

  // Find most frequent numbers
  const nonZeroCounts = histogramData.filter((bin) => bin.count > 0);
  const maxCount = Math.max(...nonZeroCounts.map((bin) => bin.count));

  const mostFrequent = nonZeroCounts.filter((bin) => bin.count === maxCount);

  // Count unique numbers
  const uniqueNumbers = nonZeroCounts.length;

  return (
    <Card className="p-8 bg-white border-2 border-gray-300 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Statistics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Numbers - BIGGER */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 shadow-md">
          <p className="text-lg font-semibold text-blue-700 mb-2">Total Numbers</p>
          <p className="text-5xl font-bold text-blue-900">{total}</p>
          <p className="text-base text-blue-600 mt-2">
            {uniqueNumbers} / 100 unique
          </p>
        </div>

        {/* Average - BIGGER */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6 shadow-md">
          <p className="text-lg font-semibold text-purple-700 mb-2">Average Value</p>
          <p className="text-5xl font-bold text-purple-900">{average}</p>
          <p className="text-base text-purple-600 mt-2">Mean of all numbers</p>
        </div>

        {/* Most Frequent - MUCH BIGGER */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6 shadow-md">
          <p className="text-lg font-semibold text-green-700 mb-2">Most Frequent</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {mostFrequent.slice(0, 5).map((bin) => (
              <div key={bin.label} className="text-center">
                <p className="text-6xl font-bold text-green-900">{bin.label}</p>
                <Badge className="mt-2 bg-green-600 text-white text-xl px-3 py-1">
                  {bin.count}×
                </Badge>
              </div>
            ))}
            {mostFrequent.length > 5 && (
              <Badge variant="secondary" className="mt-auto text-base">
                +{mostFrequent.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
