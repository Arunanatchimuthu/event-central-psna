
import React, { useState } from 'react';
import { Bell, User, Menu, X, Calendar, Settings, LogOut, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  onNotificationClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const location = useLocation();
  const { user, userProfile, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-3">
                  <img 
                    src="https://i.postimg.cc/gchz86v1/IMG-20250711-WA0038.jpg" 
                    alt="PSNA College Logo" 
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-blue-900">
                      Campus<span className="text-blue-600">Connect</span>
                    </h1>
                    <p className="text-xs text-gray-600">PSNA College of Engineering</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <a 
                href="https://www.psnacet.edu.in/Event-Media/Event-Full.php#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Events
              </a>
              <a 
                href="https://www.psnacet.edu.in/Club/Club.php" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Clubs
              </a>
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
              <a 
                href="https://www.psnacet.edu.in/Library/Non-Books-Materials.php" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
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

              {/* User Profile or Sign In */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {userProfile?.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border">
                      <div className="px-4 py-3 border-b">
                        <p className="font-medium text-gray-900">{userProfile?.displayName}</p>
                        <p className="text-sm text-gray-600">{userProfile?.email}</p>
                        <p className="text-xs text-blue-600">{userProfile?.department} - {userProfile?.year}</p>
                      </div>
                      <Link to="/my-events" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Calendar className="w-4 h-4 mr-3" />
                        My Events
                      </Link>
                      <button 
                        onClick={() => {
                          setShowSettingsModal(true);
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </button>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

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
                  to="/" 
                  className={`block px-3 py-2 rounded-md ${
                    isActive('/') 
                      ? 'text-blue-900 bg-blue-50 font-medium' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Home
                </Link>
                <a 
                  href="https://www.psnacet.edu.in/Event-Media/Event-Full.php#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
                >
                  Events
                </a>
                <a 
                  href="https://www.psnacet.edu.in/Club/Club.php" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
                >
                  Clubs
                </a>
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
                <a 
                  href="https://www.psnacet.edu.in/Library/Non-Books-Materials.php" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
                >
                  Resources
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </>
  );
};
