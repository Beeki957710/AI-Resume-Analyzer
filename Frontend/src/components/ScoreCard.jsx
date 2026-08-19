import React from 'react';

export default function ScoreCard({ score }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-800">ATS Match Score</h3>
        <span className="text-3xl font-extrabold text-indigo-600">{score}%</span>
      </div>
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}