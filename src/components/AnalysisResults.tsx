import React from 'react';
import { RefreshCw, Download, Target, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { AnalysisData, JobDetails } from '../types';
import ScoreCard from './ScoreCard';
import SuggestionsList from './SuggestionsList';
import KeywordAnalysis from './KeywordAnalysis';

interface AnalysisResultsProps {
  analysisData: AnalysisData | null;
  isAnalyzing: boolean;
  onReset: () => void;
  resumeFileName: string;
  jobDetails: JobDetails;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysisData,
  isAnalyzing,
  onReset,
  resumeFileName,
  jobDetails,
}) => {
  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Resume</h2>
            <p className="text-gray-600">
              Our AI is processing your resume and comparing it against job requirements...
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Extracting keywords and skills</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Analyzing ATS compatibility</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating improvement suggestions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
            <p className="text-gray-600">
              Resume: {resumeFileName} • Target: {jobDetails.role || 'General Analysis'}
              {jobDetails.company && ` at ${jobDetails.company}`}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Analysis
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="mb-4">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold ${
              analysisData.atsScore >= 80 ? 'bg-green-100 text-green-600' :
              analysisData.atsScore >= 60 ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'
            }`}>
              {analysisData.atsScore}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Overall ATS Score</h3>
          <p className="text-gray-600">
            {analysisData.atsScore >= 80 ? 'Excellent! Your resume is well-optimized for ATS systems.' :
             analysisData.atsScore >= 60 ? 'Good foundation, but there\'s room for improvement.' :
             'Your resume needs significant optimization for ATS compatibility.'}
          </p>
        </div>
      </div>

      {/* Section Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScoreCard
          title="Formatting"
          score={analysisData.sectionScores.formatting}
          icon={<Target className="w-5 h-5" />}
          description="ATS readability and structure"
        />
        <ScoreCard
          title="Keywords"
          score={analysisData.sectionScores.keywords}
          icon={<TrendingUp className="w-5 h-5" />}
          description="Relevant skill and job keywords"
        />
        <ScoreCard
          title="Experience"
          score={analysisData.sectionScores.experience}
          icon={<CheckCircle className="w-5 h-5" />}
          description="Work history and achievements"
        />
      </div>

      {/* Content Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KeywordAnalysis
          keywords={analysisData.keywords}
          missingKeywords={analysisData.missingKeywords}
        />
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Strengths Identified
          </h3>
          <ul className="space-y-2">
            {analysisData.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <SuggestionsList suggestions={analysisData.suggestions} />
    </div>
  );
};

export default AnalysisResults;