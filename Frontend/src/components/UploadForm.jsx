import React from "react";
import { Upload, Loader2 } from "lucide-react";

export default function UploadForm({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  onSubmit,
  loading,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Upload Resume (PDF)
          </label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-indigo-500 transition-colors cursor-pointer text-center group">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 mx-auto text-slate-400 group-hover:text-indigo-600 transition-colors mb-2" />
            <span className="text-sm text-slate-600 font-medium">
              {file ? file.name : "Click or drag PDF resume here"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Job Description
          </label>
          <textarea
            rows="8"
            placeholder="Paste target job requirements and qualifications here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-slate-800 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Resume...
          </>
        ) : (
          "Evaluate Resume"
        )}
      </button>
    </form>
  );
}
