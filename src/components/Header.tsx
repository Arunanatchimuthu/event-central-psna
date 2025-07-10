
import React, { useState } from 'react';
import { Bell, User, Menu, X, Calendar, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onNotificationClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const mockUser = {
    name: "Priya Sharma",
    email: "priya.sharma@student.psnacet.edu.in",
    department: "Computer Science",
    year: "Final Year"
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-blue-900">
                  Campus<span className="text-blue-600">Connect</span>
                </h1>
                <p className="text-xs text-gray-600">PSNA College of Engineering</p>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/events" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/events') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/clubs" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/clubs') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Clubs
            </Link>
            <Link 
              to="/placements" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/placements') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Placements
            </Link>
            <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Resources
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={onNotificationClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {mockUser.name.split(' ')[0]}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border">
                  <div className="px-4 py-3 border-b">
                    <p className="font-medium text-gray-900">{mockUser.name}</p>
                    <p className="text-sm text-gray-600">{mockUser.email}</p>
                    <p className="text-xs text-blue-600">{mockUser.department} - {mockUser.year}</p>
                  </div>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Calendar className="w-4 h-4 mr-3" />
                    My Events
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 rounded-md"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              <Link 
                to="/events" 
                className={`block px-3 py-2 rounded-md ${
                  isActive('/events') 
                    ? 'text-blue-900 bg-blue-50 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Events
              </Link>
              <Link 
                to="/clubs" 
                className={`block px-3 py-2 rounded-md ${
                  isActive('/clubs') 
                    ? 'text-blue-900 bg-blue-50 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Clubs
              </Link>
              <Link 
                to="/placements" 
                className={`block px-3 py-2 rounded-md ${
                  isActive('/placements') 
                    ? 'text-blue-900 bg-blue-50 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Placements
              </Link>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md">
                Resources
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
