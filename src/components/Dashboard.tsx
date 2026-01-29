"use client";

import { useState, useRef } from "react";
import { ControlPanel } from "./ControlPanel";
import { RealtimeHistogram } from "./RealtimeHistogram";
import { StatusIndicator } from "./StatusIndicator";
import { StatsPanel } from "./StatsPanel";
import { initializeHistogram, incrementBin } from "@/lib/histogram";
import type { SSEMessage } from "@/types/api";

export function Dashboard() {
  // State management
  const [count, setCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [histogramData, setHistogramData] = useState(initializeHistogram());
  const [rawNumbers, setRawNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Store abort controller ref to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    // Reset state
    setIsGenerating(true);
    setError(null);
    setProgress({ current: 0, total: count });
    setHistogramData(initializeHistogram());
    setRawNumbers([]);

    try {
      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      // Make POST request to initiate generation
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Decode chunk and split by lines
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          // SSE format: "data: {...}\n"
          if (line.startsWith("data: ")) {
            const dataStr = line.substring(6); // Remove "data: " prefix

            try {
              const message: SSEMessage = JSON.parse(dataStr);

              if (message.type === "number") {
                // Update histogram
                setHistogramData((prev) => incrementBin(prev, message.value));

                // Add to raw numbers
                setRawNumbers((prev) => [...prev, message.value]);

                // Update progress
                setProgress({
                  current: message.progress,
                  total: message.total,
                });

                console.log(`Received number: ${message.value} (${message.progress}/${message.total})`);
              } else if (message.type === "done") {
                console.log("Generation complete!");
                setIsGenerating(false);
              } else if (message.type === "error") {
                console.error("Error from server:", message.error);
                setError(message.error);
                setIsGenerating(false);
              }
            } catch (parseError) {
              console.error("Failed to parse SSE message:", dataStr, parseError);
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          console.log("Request was cancelled");
        } else {
          console.error("Error generating numbers:", err);
          setError(err.message);
        }
      } else {
        setError("Unknown error occurred");
      }
      setIsGenerating(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <ControlPanel
        count={count}
        onCountChange={setCount}
        onGenerate={handleGenerate}
        disabled={isGenerating}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">❌</div>
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Error Generating Numbers</h4>
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  handleGenerate();
                }}
                className="mt-3 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {(progress.total > 0 || isGenerating) && (
        <StatusIndicator progress={progress} isGenerating={isGenerating} />
      )}

      {/* Histogram */}
      <RealtimeHistogram data={histogramData} isGenerating={isGenerating} />

      {/* Stats Panel */}
      {rawNumbers.length > 0 && (
        <StatsPanel rawNumbers={rawNumbers} histogramData={histogramData} />
      )}
    </div>
  );
}
