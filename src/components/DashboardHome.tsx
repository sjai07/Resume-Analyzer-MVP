import React from 'react';
import { 
  FileText, 
  Video, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Award, 
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Briefcase
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const recentActivity = [
    { id: 1, action: 'Resume analyzed', score: 85, time: '2 hours ago', type: 'resume' },
    { id: 2, action: 'Mock interview completed', questions: 8, time: '1 day ago', type: 'interview' },
    { id: 3, action: 'Career chat session', duration: '15 min', time: '3 days ago', type: 'chat' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Update resume with new internship experience', priority: 'high', due: 'Today' },
    { id: 2, task: 'Practice behavioral interview questions', priority: 'medium', due: 'Tomorrow' },
    { id: 3, task: 'Research target companies', priority: 'low', due: 'This week' },
  ];

  const careerStats = [
    { label: 'Resume Score', value: '85/100', icon: <FileText className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Interviews Practiced', value: '24', icon: <Video className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'AI Sessions', value: '12', icon: <MessageCircle className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Applications Sent', value: '8', icon: <Briefcase className="w-5 h-5" />, color: 'bg-orange-500' },
  ];

  const quickActions = [
    {
      title: 'Analyze Resume',
      description: 'Get ATS score and improvement suggestions',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      action: 'analyzer'
    },
    {
      title: 'Practice Interview',
      description: 'Mock interview with AI feedback',
      icon: <Video className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      action: 'interview'
    },
    {
      title: 'Career Guidance',
      description: 'Chat with AI career assistant',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      action: 'career-resources'
    },
    {
      title: 'Job Search Tips',
      description: 'Learn effective job search strategies',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600',
      action: 'career-resources'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Welcome back, Alex! 👋</h3>
            <p className="text-blue-100 mb-4">
              You're making great progress on your career journey. Keep up the excellent work!
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Resume optimized</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Interview ready</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Career Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {careerStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className={`inline-flex p-2 rounded-lg ${action.color} mb-3`}>
                {action.icon}
              </div>
              <h5 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600">
                {action.title}
              </h5>
              <p className="text-sm text-gray-600">{action.description}</p>
              <ArrowRight className="w-4 h-4 text-gray-400 mt-2 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'resume' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'interview' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'resume' && <FileText className="w-4 h-4" />}
                  {activity.type === 'interview' && <Video className="w-4 h-4" />}
                  {activity.type === 'chat' && <MessageCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.type === 'resume' && `Score: ${activity.score}`}
                    {activity.type === 'interview' && `${activity.questions} questions`}
                    {activity.type === 'chat' && `Duration: ${activity.duration}`}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h4>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-600">Due: {task.due}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Progress */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Career Development Progress</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Resume Optimization</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Interview Skills</span>
              <span className="text-sm text-gray-600">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Job Search Strategy</span>
              <span className="text-sm text-gray-600">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;