
import React from 'react';
import { X, Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';

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

interface EventDetailsProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, isOpen, onClose, onRegister }) => {
  if (!isOpen || !event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <p className="text-lg text-blue-600">
              Organized by <span className="font-semibold">{event.organizer}</span>
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Venue</p>
                <p className="font-semibold">{event.venue}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Additional Event Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Event Highlights</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Interactive sessions with industry experts</li>
              <li>• Networking opportunities with peers</li>
              <li>• Certificate of participation</li>
              <li>• Refreshments will be provided</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onRegister}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <Users className="w-5 h-5 mr-2" />
              Register Now
            </button>
            <a
              href="https://unstop.com/competitions?oppstatus=open&domain=2&course=6&specialization=Information%20Technology&usertype=students&passingOutYear=2026"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Similar Events
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
