import { useState } from 'react';
import { 
  FileText, 
  Target, 
  TrendingUp, 
  Video, 
  User, 
  BookOpen, 
  Bell,
  Settings,
  LogOut,
  Home,
  GraduationCap
} from 'lucide-react';
import ResumeUpload from './components/ResumeUpload';
import JobInput from './components/JobInput';
import AnalysisResults from './components/AnalysisResults';
import MockInterview from './components/MockInterview';
import Chatbot from './components/Chatbot';
import DashboardHome from './components/DashboardHome';
import { AnalysisData } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'analyzer' | 'interview' | 'career-resources'>('home');
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyRole, setCompanyRole] = useState({ company: '', role: '' });
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    setCurrentStep(2);
  };

  const handleJobSubmit = async (jobDesc: string, company: string, role: string) => {
    setJobDescription(jobDesc);
    setCompanyRole({ company, role });
    setCurrentStep(3);
    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis: AnalysisData = generateMockAnalysis(jobDesc, company, role);
      setAnalysisData(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateMockAnalysis = (jobDesc: string, company: string, role: string): AnalysisData => {
    const keywords = extractKeywords(jobDesc);
    const atsScore = calculateATSScore(keywords, jobDesc);
    
    return {
      atsScore,
      keywords: keywords.slice(0, 10),
      missingKeywords: keywords.slice(10, 15),
      strengths: generateStrengths(atsScore),
      suggestions: generateSuggestions(atsScore, company, role),
      sectionScores: {
        formatting: Math.floor(Math.random() * 20) + 75,
        keywords: Math.floor(Math.random() * 15) + 70,
        experience: Math.floor(Math.random() * 25) + 65,
        skills: Math.floor(Math.random() * 20) + 75,
        education: Math.floor(Math.random() * 15) + 80,
      }
    };
  };

  const extractKeywords = (text: string): string[] => {
    const commonTechKeywords = [
      'JavaScript', 'React', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Node.js',
      'TypeScript', 'SQL', 'Git', 'Agile', 'Scrum', 'REST API', 'GraphQL',
      'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership',
      'Communication', 'Problem Solving', 'Team Collaboration', 'DevOps'
    ];
    
    return commonTechKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const calculateATSScore = (keywords: string[], jobDesc: string): number => {
    const baseScore = 60;
    const keywordBonus = Math.min(keywords.length * 3, 30);
    const lengthBonus = jobDesc.length > 200 ? 10 : 5;
    return Math.min(baseScore + keywordBonus + lengthBonus, 95);
  };

  const generateStrengths = (score: number): string[] => {
    const allStrengths = [
      'Strong technical keyword presence',
      'Well-structured format',
      'Relevant experience highlighted',
      'Good skill section organization',
      'Professional formatting',
      'Quantified achievements',
      'Industry-specific terminology',
      'Clear contact information'
    ];
    
    const numStrengths = score > 80 ? 6 : score > 70 ? 4 : 3;
    return allStrengths.slice(0, numStrengths);
  };

  const generateSuggestions = (score: number, company: string, role: string): string[] => {
    const suggestions = [
      `Add more ${role}-specific keywords from the job description`,
      `Include quantifiable achievements with specific numbers and percentages`,
      `Optimize formatting for ATS scanning with clear section headers`,
      `Add relevant certifications or training for ${company}`,
      `Include action verbs at the beginning of bullet points`,
      `Customize your summary to match ${role} requirements`,
      'Use standard section headers (Experience, Skills, Education)',
      'Remove graphics, tables, or complex formatting that ATS cannot parse',
      'Include relevant project examples with measurable outcomes',
      'Add industry-specific terminology and buzzwords'
    ];
    
    return suggestions.slice(0, score > 75 ? 5 : 7);
  };

  const resetAnalysis = () => {
    setCurrentStep(1);
    setResumeFile(null);
    setJobDescription('');
    setCompanyRole({ company: '', role: '' });
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'analyzer', label: 'Resume Analyzer', icon: <FileText className="w-5 h-5" /> },
    { id: 'interview', label: 'Mock Interview', icon: <Video className="w-5 h-5" /> },
    { id: 'career-resources', label: 'Career Resources', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CareerHub</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
            </div>
          </div>
        </div>

        {/* Student Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Alex Johnson</p>
              <p className="text-sm text-gray-600">Computer Science</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeSection === 'home' && 'Dashboard Overview'}
                {activeSection === 'analyzer' && 'Resume Analyzer'}
                {activeSection === 'interview' && 'Mock Interview Practice'}
                {activeSection === 'career-resources' && 'Career Resources'}
              </h2>
              <p className="text-gray-600">
                {activeSection === 'home' && 'Welcome back! Here\'s your career development progress.'}
                {activeSection === 'analyzer' && 'Optimize your resume for ATS systems and job applications.'}
                {activeSection === 'interview' && 'Practice interview questions and improve your responses.'}
                {activeSection === 'career-resources' && 'Access career guidance and professional development tools.'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeSection === 'home' && <DashboardHome />}
          
          {activeSection === 'analyzer' && (
            <div className="max-w-6xl mx-auto">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline">Upload Resume</span>
                  </div>
                  <div className={`h-px w-12 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline">Job Details</span>
                  </div>
                  <div className={`h-px w-12 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline">Analysis</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {currentStep === 1 && (
                <ResumeUpload onUpload={handleResumeUpload} />
              )}

              {currentStep === 2 && (
                <JobInput 
                  onSubmit={handleJobSubmit}
                  resumeFileName={resumeFile?.name || ''}
                />
              )}

              {currentStep === 3 && (
                <>
                  <AnalysisResults
                    analysisData={analysisData}
                    isAnalyzing={isAnalyzing}
                    onReset={resetAnalysis}
                    resumeFileName={resumeFile?.name || ''}
                    jobDetails={{ 
                      description: jobDescription, 
                      company: companyRole.company, 
                      role: companyRole.role 
                    }}
                  />
                  
                  {/* AI Chatbot appears after analysis */}
                  {analysisData && !isAnalyzing && (
                    <div className="mt-8">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Need More Help?</h3>
                        <p className="text-gray-600">
                          Chat with our AI Career Assistant for personalized advice and answers to your questions
                        </p>
                      </div>
                      <Chatbot />
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeSection === 'interview' && (
            <div className="max-w-6xl mx-auto">
              <MockInterview />
            </div>
          )}

          {activeSection === 'career-resources' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Career Resources & Guidance</h3>
                <p className="text-gray-600">
                  Get personalized career advice and guidance from our AI assistant
                </p>
              </div>
              <Chatbot />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;