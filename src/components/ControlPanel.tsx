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

interface ControlPanelProps {
  count: number;
  onCountChange: (count: number) => void;
  onGenerate: () => void;
  disabled: boolean;
}

export function ControlPanel({
  count,
  onCountChange,
  onGenerate,
  disabled,
}: ControlPanelProps) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
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
              className="w-[180px] bg-white border-2 border-gray-300 hover:border-blue-400 transition-colors"
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
      </div>
    </Card>
  );
}
