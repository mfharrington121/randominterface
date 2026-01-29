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
  const average = (rawNumbers.reduce((sum, num) => sum + num, 0) / total).toFixed(2);

  // Find most and least frequent numbers
  const nonZeroCounts = histogramData.filter((bin) => bin.count > 0);
  const maxCount = Math.max(...nonZeroCounts.map((bin) => bin.count));
  const minCount = Math.min(...nonZeroCounts.map((bin) => bin.count));

  const mostFrequent = nonZeroCounts.filter((bin) => bin.count === maxCount);
  const leastFrequent = nonZeroCounts.filter((bin) => bin.count === minCount);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Statistics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Numbers */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Total Numbers</p>
          <p className="text-3xl font-bold text-blue-700">{total}</p>
        </div>

        {/* Average */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-sm text-gray-600 mb-1">Average Value</p>
          <p className="text-3xl font-bold text-purple-700">{average}</p>
        </div>

        {/* Most Frequent */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-200">
          <p className="text-sm text-gray-600 mb-1">Most Frequent</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {mostFrequent.map((bin) => (
              <Badge
                key={bin.label}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {bin.label} ({bin.count}x)
              </Badge>
            ))}
          </div>
        </div>

        {/* Least Frequent */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-sm text-gray-600 mb-1">Least Frequent</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {leastFrequent.slice(0, 5).map((bin) => (
              <Badge
                key={bin.label}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {bin.label} ({bin.count}x)
              </Badge>
            ))}
            {leastFrequent.length > 5 && (
              <Badge className="bg-gray-500 text-white">
                +{leastFrequent.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Unique Numbers Count */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{nonZeroCounts.length}</span> unique numbers generated out of 100 possible
        </p>
      </div>
    </Card>
  );
}
