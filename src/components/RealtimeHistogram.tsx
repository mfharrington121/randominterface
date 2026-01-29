"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { HistogramData } from "@/types/histogram";

interface RealtimeHistogramProps {
  data: HistogramData;
  isGenerating: boolean;
}

// Custom tooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { label: number; count: number };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-800">
          Number: <span className="text-blue-600">{payload[0].payload.label}</span>
        </p>
        <p className="text-sm text-gray-600">
          Count: <span className="font-semibold text-purple-600">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

function RealtimeHistogramComponent({ data, isGenerating }: RealtimeHistogramProps) {
  const hasData = data.some((bin) => bin.count > 0);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📊 Distribution of AI-Generated Random Numbers
      </h3>

      <div className="h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-4">
        {!hasData && !isGenerating ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">
              Click &ldquo;Generate Random Numbers&rdquo; to see the distribution
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis
                dataKey="label"
                label={{
                  value: "Number (1-100)",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontSize: "14px", fill: "#6b7280" },
                }}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                interval="preserveStartEnd"
                tickFormatter={(value) => {
                  // Show only select tick labels to avoid crowding
                  if (value === 1 || value === 25 || value === 50 || value === 75 || value === 100) {
                    return value.toString();
                  }
                  return "";
                }}
              />

              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: "14px", fill: "#6b7280" },
                }}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />

              <Bar
                dataKey="count"
                fill="url(#colorGradient)"
                animationDuration={300}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {isGenerating && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <span className="ml-2">Live updating...</span>
        </div>
      )}
    </Card>
  );
}

// Memoize component to optimize re-renders
export const RealtimeHistogram = memo(RealtimeHistogramComponent);
