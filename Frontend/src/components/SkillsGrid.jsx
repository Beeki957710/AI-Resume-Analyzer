import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SkillsGrid({ matchingSkills, missingSkills }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-lg">
        <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matching Skills
        </h4>
        <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
          {matchingSkills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-lg">
        <h4 className="flex items-center gap-2 text-sm font-bold text-rose-800 mb-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" /> Skill Gaps
        </h4>
        <ul className="text-xs text-rose-900 space-y-1 list-disc list-inside">
          {missingSkills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}