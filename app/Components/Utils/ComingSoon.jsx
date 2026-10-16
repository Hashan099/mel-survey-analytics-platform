'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../../../Contexts/AuthContext";

function ComingSoon() {
  const [count, setCount] = useState(0);
  const total = 68;
  const { isSuperAdmin } = useAuth();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("/api/count", {
          headers: isSuperAdmin ? { "x-demo-mode": "true" } : {},
        });
        setCount(response.data);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, [isSuperAdmin]);

  const percentage = Math.min((count / total) * 100, 100).toFixed(1);

  return (
    <div
      className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-cover bg-center text-center px-5 py-12"
      style={{ backgroundColor: "#0f231c" }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-950 opacity-85"></div>

      <div className="z-10 flex flex-col justify-center items-center text-white w-full max-w-4xl mx-auto">
        {isSuperAdmin && (
          <span className="mb-4 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Portfolio Showcase / Demo Mode Active
          </span>
        )}

        <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
          Democratic Socialist Republic of Sri Lanka
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Monitoring, Evaluation & Learning <span className="text-emerald-400">(MEL)</span>
        </h1>

        <div className="mt-2 text-xl sm:text-2xl font-bold text-gray-100">
          National Languages Division <span className="text-emerald-300 font-medium">(NLD)</span>
        </div>

        <p className="mt-1 text-sm sm:text-base text-gray-300 max-w-3xl font-medium">
          Ministry of Public Administration, Home Affairs, Provincial Councils and Local Government
        </p>

        <p className="mt-4 text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          Centralized survey data collection, policy compliance evaluation, and bilingual capacity analytics across Sri Lanka&apos;s 9 Provinces and 331+ Divisional Secretariats.
        </p>

        <div className="mt-8 text-base sm:text-lg text-gray-200 font-semibold">
          Divisional Secretariat Target Responses: <span className="font-bold text-emerald-400">{count}</span> / <span className="text-gray-400">{total}</span>
        </div>

        <div className="mt-3 w-full max-w-xl">
          <div className="shadow-inner w-full bg-gray-800/80 rounded-full p-1 border border-gray-700">
            <div
              className="rounded-full bg-gradient-to-r from-emerald-500 to-green-400 text-xs font-bold leading-none text-center text-gray-900 py-1.5 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            >
              {percentage}%
            </div>
          </div>
        </div>

        {/* Showcase Quick Access Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/survey"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/40"
          >
            Take Demo Survey
          </Link>
          <Link
            href="/survey/surveyAnalytics"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-900/40"
          >
            Visual Analytics
          </Link>
          <Link
            href="/survey/tabulator"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/40"
          >
            Data Table (Tabulator)
          </Link>
          <Link
            href="/survey/editor"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-purple-600 hover:bg-purple-500 transition shadow-lg shadow-purple-900/40"
          >
            Survey Designer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;

