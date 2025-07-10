
import React from 'react';
import { Bell, X, Calendar, Users, Trophy, BookOpen } from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'event',
      icon: Calendar,
      title: 'Event Reminder',
      message: 'AI/ML Workshop starts in 1 hour. Don\'t forget to bring your laptop!',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 2,
      type: 'registration',
      icon: Users,
      title: 'Registration Confirmed',
      message: 'You\'re registered for the TCS Placement Drive on Jan 18th.',
      time: '3 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'competition',
      icon: Trophy,
      title: 'New Competition',
      message: 'Hackathon 2025 registration is now open! Limited seats available.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 4,
      type: 'resource',
      icon: BookOpen,
      title: 'New Resource Added',
      message: 'Study materials for the upcoming semester are now available.',
      time: '2 days ago',
      unread: false
    }
  ];

  const getNotificationColor = (type: string) => {
    const colors = {
      'event': 'text-blue-600 bg-blue-50',
      'registration': 'text-green-600 bg-green-50',
      'competition': 'text-purple-600 bg-purple-50',
      'resource': 'text-orange-600 bg-orange-50'
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border-l-4 ${
              notification.unread ? 'bg-blue-50 border-l-blue-500' : 'bg-gray-50 border-l-gray-300'
            } hover:bg-gray-100 transition-colors cursor-pointer`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                <notification.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 text-sm">
                    {notification.title}
                  </p>
                  {notification.unread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};
