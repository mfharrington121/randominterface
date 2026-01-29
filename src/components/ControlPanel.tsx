"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import type { ModelOption } from "@/types/api";

interface ControlPanelProps {
  count: number;
  onCountChange: (count: number) => void;
  model: ModelOption;
  onModelChange: (model: ModelOption) => void;
  onGenerate: () => void;
  onClear: () => void;
  disabled: boolean;
}

export function ControlPanel({
  count,
  onCountChange,
  model,
  onModelChange,
  onGenerate,
  onClear,
  disabled,
}: ControlPanelProps) {
  return (
    <Card className="p-6 bg-white border-2 border-gray-300 shadow-lg">
      <div className="flex flex-col gap-4">
        {/* Count Selector */}
        <div className="flex flex-col gap-2">
          <label htmlFor="count-select" className="text-sm font-medium text-gray-700">
            Numbers to Generate
          </label>
          <Select
            value={count.toString()}
            onValueChange={(value) => onCountChange(parseInt(value))}
            disabled={disabled}
          >
            <SelectTrigger
              id="count-select"
              className="w-full bg-white border-3 border-blue-500 hover:border-blue-600 transition-colors font-semibold text-gray-900 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <SelectValue placeholder="Select count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 number</SelectItem>
              <SelectItem value="5">5 numbers</SelectItem>
              <SelectItem value="30">30 numbers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Model Selector */}
        <div className="flex flex-col gap-2">
          <label htmlFor="model-select" className="text-sm font-medium text-gray-700">
            AI Model
          </label>
          <Select
            value={model}
            onValueChange={(value) => onModelChange(value as ModelOption)}
            disabled={disabled}
          >
            <SelectTrigger
              id="model-select"
              className="w-full bg-white border-2 border-purple-500 hover:border-purple-600 transition-colors font-semibold text-gray-900 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anthropic/claude-sonnet-4.5">
                Claude Sonnet 4.5
              </SelectItem>
              <SelectItem value="google/gemini-3-flash-preview">
                Gemini 3 Flash Preview
              </SelectItem>
              <SelectItem value="openai/gpt-4o-mini">
                GPT-4o Mini
              </SelectItem>
              <SelectItem value="sao10k/l3-lunaris-8b">
                Lunaris 8B
              </SelectItem>
              <SelectItem value="mistralai/ministral-3b">
                Ministral 3B
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">

        <Button
          onClick={onGenerate}
          disabled={disabled}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
        >
          {disabled ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              🎲 Generate Random Numbers
            </span>
          )}
        </Button>

        <Button
          onClick={onClear}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold px-6 py-6 text-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            🗑️ Clear History
          </span>
        </Button>
      </div>
      </div>
    </Card>
  );
}
