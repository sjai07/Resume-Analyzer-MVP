import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Target, Brain, Building, Mic, MicOff } from 'lucide-react';
import { InterviewQuestion } from '../types';

const MockInterview: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('behavioral');
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');

  const questionBank: InterviewQuestion[] = [
    {
      id: '1',
      question: 'Tell me about yourself and your professional background.',
      category: 'behavioral',
      difficulty: 'easy',
      tips: ['Keep it concise (2-3 minutes)', 'Focus on relevant experience', 'End with why you\'re interested in this role']
    },
    {
      id: '2',
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      category: 'behavioral',
      difficulty: 'medium',
      tips: ['Use the STAR method (Situation, Task, Action, Result)', 'Be specific about your role', 'Quantify the impact']
    },
    {
      id: '3',
      question: 'How do you handle working under pressure and tight deadlines?',
      category: 'behavioral',
      difficulty: 'medium',
      tips: ['Provide specific examples', 'Show your problem-solving process', 'Mention stress management techniques']
    },
    {
      id: '4',
      question: 'Explain the difference between REST and GraphQL APIs.',
      category: 'technical',
      difficulty: 'medium',
      tips: ['Define both concepts clearly', 'Compare advantages and disadvantages', 'Mention when to use each']
    },
    {
      id: '5',
      question: 'How would you optimize a slow-performing database query?',
      category: 'technical',
      difficulty: 'hard',
      tips: ['Discuss indexing strategies', 'Mention query analysis tools', 'Talk about database design principles']
    },
    {
      id: '6',
      question: 'If you disagreed with your manager\'s decision, how would you handle it?',
      category: 'situational',
      difficulty: 'medium',
      tips: ['Show respect for hierarchy', 'Demonstrate communication skills', 'Focus on finding solutions']
    },
    {
      id: '7',
      question: 'Why do you want to work for our company specifically?',
      category: 'company-specific',
      difficulty: 'easy',
      tips: ['Research the company beforehand', 'Mention specific values or projects', 'Connect to your career goals']
    },
    {
      id: '8',
      question: 'Where do you see yourself in 5 years?',
      category: 'behavioral',
      difficulty: 'easy',
      tips: ['Show ambition but be realistic', 'Align with company growth opportunities', 'Focus on skill development']
    }
  ];

  const categories = [
    { id: 'behavioral', name: 'Behavioral', icon: <Brain className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' },
    { id: 'technical', name: 'Technical', icon: <Target className="w-4 h-4" />, color: 'bg-green-100 text-green-800' },
    { id: 'situational', name: 'Situational', icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'company-specific', name: 'Company', icon: <Building className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const getRandomQuestion = (category: string) => {
    const filteredQuestions = questionBank.filter(q => 
      q.category === category && !completedQuestions.includes(q.id)
    );
    if (filteredQuestions.length === 0) {
      // Reset if all questions in category are completed
      setCompletedQuestions([]);
      return questionBank.filter(q => q.category === category)[0];
    }
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  };

  const startQuestion = () => {
    const question = getRandomQuestion(selectedCategory);
    setCurrentQuestion(question);
    setTimer(0);
    setIsTimerRunning(true);
    setUserAnswer('');
  };

  const completeQuestion = () => {
    if (currentQuestion) {
      setCompletedQuestions(prev => [...prev, currentQuestion.id]);
      setIsTimerRunning(false);
    }
  };

  const resetInterview = () => {
    setCurrentQuestion(null);
    setTimer(0);
    setIsTimerRunning(false);
    setCompletedQuestions([]);
    setUserAnswer('');
    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Mock Interview Practice</h2>
        <p className="text-gray-600">
          Practice common interview questions and improve your responses with AI feedback
        </p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Question Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${category.color}`}>
                {questionBank.filter(q => q.category === category.id).length} questions
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interview Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={startQuestion}
              disabled={isTimerRunning}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              {currentQuestion ? 'Next Question' : 'Start Interview'}
            </button>
            
            {currentQuestion && (
              <button
                onClick={completeQuestion}
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Complete Question
              </button>
            )}
            
            <button
              onClick={resetInterview}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-lg font-mono font-semibold text-gray-900">
                {formatTime(timer)}
              </span>
            </div>
            
            <button
              onClick={toggleRecording}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isRecording 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Current Question */}
        {currentQuestion && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  categories.find(c => c.id === currentQuestion.category)?.color
                }`}>
                  {categories.find(c => c.id === currentQuestion.category)?.name}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h4>
              
              {currentQuestion.tips && (
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">💡 Tips for answering:</h5>
                  <ul className="space-y-1">
                    {currentQuestion.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer (Optional - for self-reflection)
              </label>
              <textarea
                id="answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your answer here or practice speaking aloud..."
              />
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Questions completed: {completedQuestions.length}</span>
            <span>Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
          </div>
        </div>
      </div>

      {/* Interview Tips */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Before the Interview</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Research the company and role thoroughly</li>
              <li>• Prepare specific examples using the STAR method</li>
              <li>• Practice common questions out loud</li>
              <li>• Prepare thoughtful questions to ask</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">During the Interview</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Maintain good eye contact and posture</li>
              <li>• Listen carefully and ask for clarification if needed</li>
              <li>• Be specific and quantify your achievements</li>
              <li>• Show enthusiasm and genuine interest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;