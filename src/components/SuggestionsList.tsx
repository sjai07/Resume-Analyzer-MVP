import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface SuggestionsListProps {
  suggestions: string[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
        AI-Powered Improvement Suggestions
      </h3>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{suggestion}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5" />
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Pro Tip:</strong> Focus on the highest-priority suggestions first. 
          Small changes can significantly improve your ATS score and interview chances.
        </p>
      </div>
    </div>
  );
};

export default SuggestionsList;