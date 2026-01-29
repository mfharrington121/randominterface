"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StatusIndicatorProps {
  progress: { current: number; total: number };
  isGenerating: boolean;
}

export function StatusIndicator({ progress, isGenerating }: StatusIndicatorProps) {
  const { current, total } = progress;
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const isComplete = current === total && total > 0 && !isGenerating;

  if (total === 0 && !isGenerating) {
    return null; // Don't show anything if no generation has started
  }

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {isComplete ? "✅ Generation Complete!" : "🔄 Generating Numbers..."}
          </h3>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={
              isComplete
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600 animate-pulse"
            }
          >
            {current} / {total}
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress
            value={percentage}
            className="h-3"
          />
          <p className="text-sm text-gray-600 text-center">
            {isComplete
              ? `Successfully generated ${total} random numbers!`
              : `Generating number ${current} of ${total}...`}
          </p>
        </div>

        {isGenerating && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          </div>
        )}
      </div>
    </Card>
  );
}
