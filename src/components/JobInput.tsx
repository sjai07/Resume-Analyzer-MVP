import React, { useState } from 'react';
import { Building, Briefcase, FileText, ArrowRight } from 'lucide-react';

interface JobInputProps {
  onSubmit: (jobDescription: string, company: string, role: string) => void;
  resumeFileName: string;
}

const JobInput: React.FC<JobInputProps> = ({ onSubmit, resumeFileName }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [inputMethod, setInputMethod] = useState<'description' | 'details'>('description');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMethod === 'description' && jobDescription.trim()) {
      onSubmit(jobDescription, '', '');
    } else if (inputMethod === 'details' && company.trim() && role.trim()) {
      onSubmit(`${role} position at ${company}`, company, role);
    }
  };

  const isFormValid = inputMethod === 'description' 
    ? jobDescription.trim().length > 0 
    : company.trim().length > 0 && role.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Target Analysis</h2>
        <p className="text-gray-600">
          Provide job details to get personalized resume optimization suggestions
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <FileText className="w-4 h-4" />
            <span>Analyzing: {resumeFileName}</span>
          </div>
          
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setInputMethod('description')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                inputMethod === 'description'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Job Description</h3>
                <p className="text-sm text-gray-600">Paste the complete job posting</p>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setInputMethod('details')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                inputMethod === 'details'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <Building className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Company & Role</h3>
                <p className="text-sm text-gray-600">Specify company and position</p>
              </div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputMethod === 'description' ? (
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste the complete job description here..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Include requirements, responsibilities, and qualifications for best results
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Google, Microsoft, Amazon"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Job Title
                </label>
                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer, Product Manager"
                />
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Analyze Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobInput;