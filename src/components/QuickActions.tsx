
import React, { useState } from 'react';
import { Plus, Calendar, Users, BookOpen, Settings, Sparkles } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [eventKeywords, setEventKeywords] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');

  const handleGenerateDescription = () => {
    // Simulate AI generation (in real app, this would call Google Gemini API)
    const mockDescription = `Join us for an exciting ${eventKeywords} event designed to enhance your skills and connect with fellow students. This comprehensive session will cover key topics, provide hands-on experience, and offer networking opportunities. Don't miss this chance to expand your knowledge and build valuable connections in your field of interest.`;
    setGeneratedDescription(mockDescription);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-blue-900">Create Event</p>
              <p className="text-sm text-blue-600">Post a new event or workshop</p>
            </div>
          </button>
          
          <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">My Calendar</p>
              <p className="text-sm text-gray-600">View registered events</p>
            </div>
          </button>
          
          <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <Users className="w-5 h-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Join Clubs</p>
              <p className="text-sm text-gray-600">Explore student organizations</p>
            </div>
          </button>
          
          <button 
            onClick={() => setShowAIGenerator(!showAIGenerator)}
            className="w-full flex items-center p-3 text-left hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Sparkles className="w-5 h-5 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-purple-900">AI Description Generator</p>
              <p className="text-sm text-purple-600">Generate event descriptions with AI</p>
            </div>
          </button>
        </div>
      </div>

      {/* AI Description Generator */}
      {showAIGenerator && (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
            AI Description Generator
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Keywords
              </label>
              <input
                type="text"
                placeholder="e.g., machine learning, workshop, beginner-friendly"
                value={eventKeywords}
                onChange={(e) => setEventKeywords(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleGenerateDescription}
              disabled={!eventKeywords.trim()}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Generate Description
            </button>
            
            {generatedDescription && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-900">{generatedDescription}</p>
                <button className="mt-2 text-xs text-purple-600 hover:text-purple-800">
                  Copy to clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-red-900 text-sm">Hackathon Registration</p>
              <p className="text-xs text-red-600">Due in 2 days</p>
            </div>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Urgent</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-medium text-yellow-900 text-sm">Cultural Fest Auditions</p>
              <p className="text-xs text-yellow-600">Due in 5 days</p>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Soon</span>
          </div>
        </div>
      </div>

      {/* Student Resources */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Resources</h3>
        <div className="space-y-2">
          <a href="#" className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <BookOpen className="w-4 h-4 text-gray-600 mr-3" />
            <span className="text-sm text-gray-700">Academic Calendar</span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Users className="w-4 h-4 text-gray-600 mr-3" />
            <span className="text-sm text-gray-700">Student Handbook</span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-600 mr-3" />
            <span className="text-sm text-gray-700">IT Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
