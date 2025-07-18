export interface AnalysisData {
  atsScore: number;
  keywords: string[];
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
  sectionScores: {
    formatting: number;
    keywords: number;
    experience: number;
    skills: number;
    education: number;
  };
}

export interface JobDetails {
  description: string;
  company: string;
  role: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational' | 'company-specific';
  difficulty: 'easy' | 'medium' | 'hard';
  tips?: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'analysis';
}