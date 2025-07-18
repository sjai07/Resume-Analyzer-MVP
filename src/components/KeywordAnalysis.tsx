import React from 'react';
import { Tag, AlertTriangle } from 'lucide-react';

interface KeywordAnalysisProps {
  keywords: string[];
  missingKeywords: string[];
}

const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ keywords, missingKeywords }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Tag className="w-5 h-5 mr-2 text-blue-500" />
        Keyword Analysis
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Found Keywords ({keywords.length})</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        {missingKeywords.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
              Missing Keywords ({missingKeywords.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordAnalysis;