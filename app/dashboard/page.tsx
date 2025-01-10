"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import YearlyHeatmap from "@/app/components/yearlyHeatmap";

export default function DashboardPage() {
  const [totals, setTotals] = useState({ likes: 0, comments: 0, saves: 0 });
  const [genreData, setGenreData] = useState<any[]>([]);
  const [hashtagData, setHashtagData] = useState<any[]>([]);
  const [combinationImpacts, setCombinationImpacts] = useState<any[]>([]);
  const [genreCollaboration, setGenreCollaboration] = useState<any[]>([]);
  const [dayFactors, setDayFactors] = useState<
    Record<string, Record<string, DayData>>
  >({});

  // Fetch main analysis data
  useEffect(() => {
    fetch("/api/customAnalysis")
      .then((res) => res.json())
      .then((data) => {
        setTotals(data.totals);
        setGenreData(data.genreData);
        setHashtagData(data.hashtagData);
        setCombinationImpacts(data.combinationImpacts);
        setGenreCollaboration(data.genreCollaboration);
      })
      .catch((err) => console.error("Error fetching analysis data:", err));
  }, []);

  // Fetch yearly heatmap data
  useEffect(() => {
    fetch("http://localhost:3000/api/json?filename=completeDayFactors") || fetch("https://socialysis.vercel.app/api/json?filename=completeDayFactors")
      .then((res) => res.json())
      .then((data) => {
        setDayFactors(data);
      })
      .catch((err) => console.error("Error fetching heatmap data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-black dark:text-white">Dashboard</h1>

        {/* Totals */}
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(totals).map(([key, value]) => (
            <div key={key} className="p-6 bg-black rounded-lg shadow-md">
              <h2 className="text-lg font-medium capitalize">{key}</h2>
              <p className="text-2xl font-bold">{value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Genre Analysis */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Genre Analysis</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={genreData} layout="vertical" barCategoryGap={20}>
              <XAxis type="number" hide />
              <YAxis dataKey="genre" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="likes" fill="#1DA1F2" />
              <Bar dataKey="comments" fill="#34D399" />
              <Bar dataKey="saves" fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hashtag Analysis */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Hashtag Analysis</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={hashtagData} layout="vertical" barCategoryGap={20}>
              <XAxis type="number" hide />
              <YAxis dataKey="hashtag" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="likes" fill="#1DA1F2" />
              <Bar dataKey="comments" fill="#34D399" />
              <Bar dataKey="saves" fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Combination Impact Analysis */}
        {/* <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Combination Impact Analysis</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={combinationImpacts.slice(0, 10)}
              layout="vertical"
              barCategoryGap={20}
            >
              <XAxis type="number" hide />
              <YAxis dataKey="combination" type="category" width={200} />
              <Tooltip />
              <Bar dataKey="likesImpact" fill="#1DA1F2" />
              <Bar dataKey="commentsImpact" fill="#34D399" />
              <Bar dataKey="savesImpact" fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* Genre Collaboration Analysis */}
        {/* <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Genre Collaboration Analysis</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={genreCollaboration.slice(0, 10)}
              layout="vertical"
              barCategoryGap={20}
            >
              <XAxis type="number" hide />
              <YAxis dataKey="genre_pair" type="category" width={200} />
              <Tooltip />
              <Bar dataKey="impact" fill="#FF6347" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* Yearly Engagement Heatmap */}
        {Object.keys(dayFactors).length > 0 ? (
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Yearly Engagement Heatmap</h2>
            <YearlyHeatmap data={dayFactors.data} />
          </div>
        ) : (
          <p>Loading heatmap...</p>
        )}
      </div>
    </div>
  );
}
