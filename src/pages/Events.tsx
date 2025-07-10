
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { EventCard } from '../components/EventCard';
import { SearchBar } from '../components/SearchBar';
import { NotificationPanel } from '../components/NotificationPanel';

const mockEvents = [
  {
    id: 1,
    title: "AI/ML Workshop by Google Developer Expert",
    date: "2025-01-15",
    time: "10:00 AM",
    venue: "Main Auditorium",
    category: "Workshop",
    organizer: "CSE Department",
    description: "Learn the fundamentals of Machine Learning with hands-on projects using TensorFlow and Google Cloud.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Campus Placement Drive - TCS",
    date: "2025-01-18",
    time: "9:00 AM",
    venue: "Placement Cell",
    category: "Placement",
    organizer: "Placement Cell",
    description: "Major recruitment drive for final year students. Bring your updated resume and dress professionally.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Hackathon 2025 - Innovation Challenge",
    date: "2025-01-22",
    time: "8:00 AM",
    venue: "Computer Lab",
    category: "Competition",
    organizer: "Technical Club",
    description: "48-hour hackathon focused on solving real-world problems. Form teams of 4 members.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Cultural Fest - Expressions 2025",
    date: "2025-01-25",
    time: "4:00 PM",
    venue: "Open Ground",
    category: "Cultural",
    organizer: "Cultural Committee",
    description: "Annual cultural festival featuring dance, music, drama, and art competitions.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Entrepreneurship Summit 2025",
    date: "2025-01-28",
    time: "2:00 PM",
    venue: "Conference Hall",
    category: "Workshop",
    organizer: "Entrepreneurship Cell",
    description: "Connect with successful entrepreneurs and learn about startup ecosystems.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    title: "IEEE Technical Symposium",
    date: "2025-02-02",
    time: "9:30 AM",
    venue: "ECE Seminar Hall",
    category: "Competition",
    organizer: "IEEE Student Branch",
    description: "Technical paper presentations and project exhibitions by students.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop"
  }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const categories = ['all', 'Workshop', 'Placement', 'Competition', 'Cultural'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Events</h1>
          <p className="text-gray-600">Discover and register for upcoming events at PSNA College</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Events ({filteredEvents.length})
              </h2>
              {filteredEvents.length > 0 ? (
                <div className="grid gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
                </div>
              )}
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

export default Events;
