import React from 'react';
import { Award } from 'lucide-react';

export default function VerdictBlock({ strengths, verdict }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2">
          <Award className="w-4 h-4 text-indigo-600" /> Key Strengths
        </h4>
        <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
          {strengths.map((strength, idx) => (
            <li key={idx}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Executive Verdict</h4>
        <p className="text-xs text-slate-700 leading-relaxed">{verdict}</p>
      </div>
    </div>
  );
}