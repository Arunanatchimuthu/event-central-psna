
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { NotificationPanel } from '../components/NotificationPanel';
import { Users, Calendar, Trophy, Star } from 'lucide-react';

const clubsData = [
  {
    id: 1,
    name: "IEEE Student Branch",
    category: "Technical",
    description: "Institute of Electrical and Electronics Engineers student chapter focusing on technical innovation and research.",
    members: 150,
    events: 12,
    achievements: "Best Student Branch Award 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Computer Society of India (CSI)",
    category: "Technical",
    description: "Promoting computer science education and fostering innovation in computing technologies.",
    members: 120,
    events: 8,
    achievements: "National Level Project Exhibition Winner",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Entrepreneurship Development Cell",
    category: "Business",
    description: "Encouraging entrepreneurial spirit and startup culture among students.",
    members: 80,
    events: 6,
    achievements: "5 Successful Startups Incubated",
    image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Cultural Committee",
    category: "Cultural",
    description: "Organizing cultural events, festivals, and promoting artistic talents among students.",
    members: 200,
    events: 15,
    achievements: "Best Cultural Fest - State Level",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    name: "NSS (National Service Scheme)",
    category: "Social Service",
    description: "Engaging students in community service and social welfare activities.",
    members: 180,
    events: 20,
    achievements: "500+ Hours Community Service",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    name: "Sports Club",
    category: "Sports",
    description: "Promoting sports activities and physical fitness among students.",
    members: 160,
    events: 10,
    achievements: "Inter-College Champions 2024",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
  },
  {
    id: 7,
    name: "Robotics Club",
    category: "Technical",
    description: "Building robots and exploring automation technologies through hands-on projects.",
    members: 90,
    events: 7,
    achievements: "National Robotics Competition Finalist",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
  },
  {
    id: 8,
    name: "Literary Club",
    category: "Cultural",
    description: "Fostering reading habits, creative writing, and literary appreciation among students.",
    members: 70,
    events: 5,
    achievements: "Published College Magazine",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
  }
];

const Clubs = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Technical', 'Cultural', 'Business', 'Social Service', 'Sports'];

  const filteredClubs = clubsData.filter(club => {
    return selectedCategory === 'all' || club.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Clubs</h1>
          <p className="text-gray-600">Join active student communities and enhance your college experience</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4 border">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Clubs ({filteredClubs.length})
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredClubs.map(club => (
                  <div key={club.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    <img 
                      src={club.image} 
                      alt={club.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {club.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{club.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{club.members}</p>
                          <p className="text-xs text-gray-500">Members</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Calendar className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{club.events}</p>
                          <p className="text-xs text-gray-500">Events</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">1</p>
                          <p className="text-xs text-gray-500">Awards</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center mb-1">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">Achievement:</span>
                        </div>
                        <p className="text-sm text-gray-600">{club.achievements}</p>
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Join Club
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showNotifications && (
            <div className="lg:w-80">
              <NotificationPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
