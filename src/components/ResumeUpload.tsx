import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface ResumeUploadProps {
  onUpload: (file: File) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('success');
    setTimeout(() => onUpload(file), 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
        <p className="text-gray-600">
          Upload your resume to get started with ATS optimization analysis
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : uploadStatus === 'success'
            ? 'border-green-500 bg-green-50'
            : uploadStatus === 'error'
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          {uploadStatus === 'success' ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          ) : (
            <Upload className="w-16 h-16 text-gray-400 mx-auto" />
          )}
          
          <div>
            {uploadStatus === 'success' ? (
              <p className="text-green-700 font-semibold">Resume uploaded successfully!</p>
            ) : uploadStatus === 'error' ? (
              <p className="text-red-700 font-semibold">
                Please upload a valid PDF or Word document
              </p>
            ) : (
              <>
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Drop your resume here or click to browse
                </p>
                <p className="text-gray-500">
                  Supports PDF, DOC, and DOCX files (max 10MB)
                </p>
              </>
            )}
          </div>

          {uploadStatus !== 'success' && (
            <div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors duration-200"
              >
                <FileText className="w-5 h-5 mr-2" />
                Choose File
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Your resume will be analyzed for ATS compatibility and optimization opportunities
        </p>
      </div>
    </div>
  );
};

export default ResumeUpload;