
import React from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  organizer: string;
  description: string;
  registrationLink: string;
  image: string;
}

interface EventCardProps {
  event: Event;
  onRegister?: () => void;
  onViewDetails?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegister, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Workshop': 'bg-blue-100 text-blue-800',
      'Placement': 'bg-green-100 text-green-800',
      'Competition': 'bg-purple-100 text-purple-800',
      'Cultural': 'bg-pink-100 text-pink-800',
      'Default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Default'];
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/3">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        
        {/* Event Content */}
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)} mb-2`}>
                {event.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Organized by <span className="font-medium text-blue-600">{event.organizer}</span>
              </p>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm">{event.venue}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onRegister}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Register Now
            </button>
            <button 
              onClick={onViewDetails}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
