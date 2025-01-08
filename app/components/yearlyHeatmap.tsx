"use client";

import React, { useState } from "react";

interface DayData {
  factor: number;
  reason: string;
}

interface HeatmapProps {
  data: Record<string, Record<string, DayData>>;
}

const YearlyHeatmap: React.FC<HeatmapProps> = ({ data }) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  // Map the factor to theme-aligned colors
  const getColor = (factor: number): string => {
    if (factor > 0.4) return "bg-indigo-600"; // High positive impact
    if (factor > 0.2) return "bg-indigo-400"; // Medium positive impact
    if (factor > 0) return "bg-indigo-200"; // Low positive impact
    if (factor === 0) return "bg-gray-500"; // Neutral
    if (factor > -0.2) return "bg-red-300"; // Low negative impact
    if (factor > -0.4) return "bg-red-500"; // Medium negative impact
    return "bg-red-700"; // High negative impact
  };

  const renderDay = (day: string, data: DayData) => (
    <div
      key={day}
      className={`w-4 h-4 ${getColor(
        data.factor
      )} rounded-sm cursor-pointer transition-transform transform hover:scale-110 hover:shadow-md hover:outline hover:outline-2 hover:outline-white`}
      onMouseEnter={(e) => {
        setTooltip({
          x: e.pageX,
          y: e.pageY,
          content: `Day ${day}: ${data.reason}`,
        });
      }}
      onMouseLeave={() => setTooltip(null)}
    ></div>
  );

  const renderMonth = (month: string) => {
    const days = data[month] || {};
    return (
      <div key={month} className="flex flex-col items-center">
        <span className="text-xs font-bold text-white capitalize mb-1">
          {month}
        </span>
        <div className="grid grid-cols-7 gap-1">
          {Object.entries(days).map(([day, dayData]) =>
            renderDay(day, dayData)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg">
      <h2 className="text-center text-white font-semibold mb-4">
        Yearly Engagement Heatmap
      </h2>
      <div className="grid grid-cols-12 gap-4">
        {months.map((month) => renderMonth(month))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-black text-white text-sm px-2 py-1 rounded shadow-lg"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            zIndex: 50,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default YearlyHeatmap;
