import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, FileText, CheckCircle2, XCircle, 
  Sparkles, AlertCircle, BarChart3, Cpu, Search, BrainCircuit, ArrowRight
} from 'lucide-react';

const LOADING_STEPS = [
  { text: "Extracting text & formatting PDF...", icon: FileText },
  { text: "Generating semantic vector embeddings...", icon: Cpu },
  { text: "Querying vector database with RAG...", icon: Search },
  { text: "Evaluating match score via Llama 3.2...", icon: BrainCircuit }
];

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Step rotation animation during loading state
  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription.trim()) {
      setError('Please provide both a PDF resume and a target job description.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('https://ai-resume-analyzer-production-a27f.up.railway.app/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Analysis request failed. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepIcon = LOADING_STEPS[loadingStep].icon;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px] pointer-events-none animate-pulse-glow" />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#0d1322]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                ATS Intelligence Hub
              </h1>
              <p className="text-xs text-slate-400 font-medium">Local RAG Engine • Llama 3.2</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Form Column */}
        <section className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-7 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Document Configuration
              </h2>
            </div>

            {/* Upload Box */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Resume File (PDF)</label>
              <div className="relative border border-dashed border-slate-700/80 hover:border-indigo-500/80 rounded-2xl p-6 text-center transition-all bg-slate-950/40 hover:bg-slate-950/80 group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-indigo-500/20">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {file ? file.name : 'Drop your resume PDF here'}
                </p>
                <p className="text-xs text-slate-500 mt-1">Maximum file size: 10MB</p>
              </div>
            </div>

            {/* Job Description Box */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Target Job Description</label>
              <textarea
                rows={7}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description or core skill requirements here..."
                className="w-full bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition-all"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-rose-950/30 border border-rose-800/50 rounded-2xl flex items-center gap-3 text-sm text-rose-300">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 text-white font-semibold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Analyze Compatibility</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </section>

        {/* Right Output Column */}
        <section className="lg:col-span-7">
          {loading ? (
            /* Animated Stage Loader */
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-12 min-h-[520px] flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
              
              {/* Outer Pulse Rings */}
              <div className="relative mb-8 flex items-center justify-center">
                <div className="absolute w-36 h-36 bg-indigo-500/10 rounded-full animate-ping" />
                <div className="w-28 h-28 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-cyan-500/20 border-b-cyan-400 rounded-full animate-spin-slow flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <CurrentStepIcon className="w-6 h-6 text-white animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="space-y-3 max-w-sm w-full">
                <h3 className="text-base font-semibold text-slate-100">
                  {LOADING_STEPS[loadingStep].text}
                </h3>
                <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800/80">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-700 ease-out"
                    style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Step {loadingStep + 1} of {LOADING_STEPS.length}
                </p>
              </div>
            </div>
          ) : result ? (
            /* Results Dashboard */
            <div className="space-y-6">
              
              {/* Score Metric Card */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-7 shadow-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">ATS Qualification Index</span>
                  <h3 className="text-2xl font-bold text-slate-100 mt-1">Match Compatibility</h3>
                  <p className="text-xs text-slate-400 mt-1">Derived from contextual document embeddings</p>
                </div>
                
                {/* Radial Numeric Display */}
                <div className="relative w-28 h-28 flex items-center justify-center bg-slate-950/80 rounded-full border-4 border-indigo-500/30 shadow-inner">
                  <span className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {result.match_score}%
                  </span>
                </div>
              </div>

              {/* Summary Evaluation */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-7 shadow-2xl space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Executive Summary</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{result.summary_verdict}</p>
              </div>

              {/* Skills Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Matching Skills */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Matched Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matching_skills && result.matching_skills.length > 0 ? (
                      result.matching_skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 rounded-xl text-xs font-medium">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No explicit skill overlaps found.</span>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                    <XCircle className="w-4 h-4" /> Missing Qualifications
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missing_skills && result.missing_skills.length > 0 ? (
                      result.missing_skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-rose-950/40 border border-rose-800/40 text-rose-300 rounded-xl text-xs font-medium">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No major missing requirements.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-7 shadow-2xl space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Resume Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.key_strengths && result.key_strengths.map((strength, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-950/40 border border-slate-800/60 rounded-2xl flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="text-xs text-slate-300 leading-normal">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Idle Placeholder */
            <div className="bg-slate-900/40 border border-dashed border-slate-800/80 rounded-3xl p-12 min-h-[520px] flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-300">Awaiting Input Data</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Upload a candidate PDF resume and paste the job description to run RAG contextual scoring.
                </p>
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}