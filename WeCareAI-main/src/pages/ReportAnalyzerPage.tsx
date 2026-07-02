import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ReportAnalyzerPage() {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [analysis, setAnalysis] = useState('');

 const {
  setCurrentPage,
  setRecommendedDepartment,
} = useApp();

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-bold text-primary-700">
        Medical Report Analyzer
      </h1>

      <p className="mt-2 text-gray-600">
        Upload your medical report and get AI-powered insights.
      </p>

      {/* Upload Box */}
      <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFileName(e.target.files[0].name);
              setSelectedFile(e.target.files[0]);
              setShowResult(false);
            }
          }}
          className="mb-4"
        />

        {fileName ? (
          <p className="text-green-600 font-medium">
            Selected File: {fileName}
          </p>
        ) : (
          <p className="text-gray-500">
            Upload PDF, JPG or PNG medical reports
          </p>
        )}

       <button
  onClick={async () => {
    if (!selectedFile) {
      alert("Please upload a medical report first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://127.0.0.1:8000/analyze-report", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze report");
      }

      const data = await response.json();

      setAnalysis(data.analysis);

      const match = data.analysis.match(
        /Recommended Department[:\s]*([^\n]+)/i
      );

      if (match) {
        setRecommendedDepartment(match[1].trim());
      }

      setShowResult(true);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  }}
  disabled={loading}
  className="mt-4 px-5 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 disabled:opacity-50"
>
  {loading ? "Analyzing Report..." : "Analyze Report"}
</button>

{loading && (
  <p className="mt-3 text-sm text-blue-600 animate-pulse text-center">
    ⏳ Processing your medical report...
    <br />
    This may take 1–2 minutes depending on the report size.
  </p>
)}

{/* Analysis Result */}
{showResult && (
  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
    <h2 className="text-lg font-bold text-blue-800 mb-3">
      🤖 AI Medical Analysis
    </h2>

    <div className="bg-white border rounded-lg p-4 whitespace-pre-wrap text-gray-700 leading-7">
      {analysis}
    </div>

    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={() => setCurrentPage("opd")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Open OPD Navigator
      </button>

      <button
        onClick={() => setCurrentPage("token")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate Token
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
}