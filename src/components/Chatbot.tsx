import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, FileText, Briefcase, MessageCircle } from 'lucide-react';
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Career Assistant. I can help you with resume optimization, interview preparation, career advice, and job search strategies. What would you like to discuss today?',
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: 'How can I improve my resume?', icon: <FileText className="w-4 h-4" /> },
    { text: 'Help me prepare for interviews', icon: <Briefcase className="w-4 h-4" /> },
    { text: 'What skills should I develop?', icon: <Lightbulb className="w-4 h-4" /> },
    { text: 'Job search strategies', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return `Great question about resumes! Here are some key tips to improve your resume:

• **Tailor for each job**: Customize your resume for each application by including relevant keywords from the job description
• **Quantify achievements**: Use specific numbers and percentages to show your impact (e.g., "Increased sales by 25%")
• **Use action verbs**: Start bullet points with strong verbs like "Led," "Developed," "Implemented"
• **Keep it concise**: Aim for 1-2 pages maximum, focusing on the most relevant experience
• **ATS-friendly format**: Use standard fonts, clear headings, and avoid graphics that ATS systems can't read

Would you like me to elaborate on any of these points or help with a specific section of your resume?`;
    }
    
    if (lowerMessage.includes('interview') || lowerMessage.includes('preparation')) {
      return `Interview preparation is crucial for success! Here's a comprehensive approach:

**Research Phase:**
• Study the company's mission, values, and recent news
• Understand the role requirements and how you fit
• Research your interviewers on LinkedIn if possible

**Practice Common Questions:**
• "Tell me about yourself" - prepare a 2-minute elevator pitch
• Behavioral questions - use the STAR method (Situation, Task, Action, Result)
• Technical questions - review relevant skills and concepts

**Prepare Your Questions:**
• Ask about team dynamics, growth opportunities, and company culture
• Show genuine interest in the role and company

**Day of Interview:**
• Arrive 10-15 minutes early
• Bring multiple copies of your resume
• Maintain good eye contact and positive body language

Try our Mock Interview feature to practice with realistic questions!`;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('develop')) {
      return `Skill development is key to career growth! Here are some in-demand skills by category:

**Technical Skills (varies by field):**
• Programming: Python, JavaScript, SQL
• Data Analysis: Excel, Tableau, Power BI
• Cloud Platforms: AWS, Azure, Google Cloud
• Digital Marketing: SEO, Google Analytics, Social Media

**Soft Skills (universal):**
• Communication and presentation
• Leadership and team management
• Problem-solving and critical thinking
• Adaptability and continuous learning

**How to Develop Skills:**
• Online courses (Coursera, Udemy, LinkedIn Learning)
• Professional certifications
• Side projects and volunteering
• Mentorship and networking

What specific field or role are you targeting? I can provide more tailored skill recommendations.`;
    }
    
    if (lowerMessage.includes('job search') || lowerMessage.includes('find job') || lowerMessage.includes('career')) {
      return `Effective job search strategies can significantly improve your success rate:

**Job Search Channels:**
• Company websites (often have exclusive listings)
• Professional networks (LinkedIn, industry associations)
• Job boards (Indeed, Glassdoor, industry-specific sites)
• Recruitment agencies and headhunters
• Networking events and career fairs

**Networking Tips:**
• Reach out to alumni from your school
• Attend industry meetups and conferences
• Engage with professionals on LinkedIn
• Inform your network that you're job searching

**Application Strategy:**
• Quality over quantity - tailor each application
• Follow up professionally after applying
• Track your applications in a spreadsheet
• Set daily/weekly application goals

**Interview Process:**
• Prepare for phone, video, and in-person interviews
• Research salary ranges for negotiation
• Send thank-you notes after interviews

Would you like me to dive deeper into any of these areas?`;
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate') || lowerMessage.includes('compensation')) {
      return `Salary negotiation is an important skill! Here's how to approach it:

**Research Phase:**
• Use sites like Glassdoor, PayScale, and Levels.fyi
• Consider location, experience level, and company size
• Factor in total compensation (benefits, equity, PTO)

**Negotiation Strategy:**
• Wait for the offer before discussing salary
• Express enthusiasm for the role first
• Present a range rather than a single number
• Justify your ask with research and achievements

**What to Negotiate:**
• Base salary
• Signing bonus
• Stock options/equity
• Vacation time
• Professional development budget
• Flexible work arrangements

**Sample Script:**
"I'm excited about this opportunity. Based on my research and experience, I was expecting a range of $X to $Y. Is there flexibility in the compensation package?"

Remember: negotiation shows you value yourself and understand your worth!`;
    }
    
    // Default response
    return `I'd be happy to help you with that! As your AI Career Assistant, I can provide guidance on:

• **Resume & CV optimization** - Making your application stand out
• **Interview preparation** - Practice questions and strategies  
• **Career development** - Skills to learn and career paths
• **Job search strategies** - Finding opportunities and networking
• **Salary negotiation** - Getting fair compensation
• **Professional branding** - LinkedIn and online presence

Could you be more specific about what aspect you'd like help with? Or feel free to ask me anything career-related!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSuggestion(suggestion.text)}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                >
                  {suggestion.icon}
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;