import React, { useState } from 'react';
import { Header } from '../components/Header';
import { NotificationPanel } from '../components/NotificationPanel';
import { RegistrationForm } from '../components/RegistrationForm';
import { Building, Users, Calendar, TrendingUp, MapPin, Clock } from 'lucide-react';

const placementStats = [
  { label: "Companies Visited", value: "85+", icon: Building, color: "text-blue-600" },
  { label: "Students Placed", value: "450+", icon: Users, color: "text-green-600" },
  { label: "Highest Package", value: "₹12 LPA", icon: TrendingUp, color: "text-purple-600" },
  { label: "Average Package", value: "₹4.5 LPA", icon: TrendingUp, color: "text-orange-600" }
];

const upcomingDrives = [
  {
    id: 1,
    company: "Tata Consultancy Services (TCS)",
    role: "Software Engineer",
    package: "₹3.5 LPA",
    date: "2025-01-18",
    time: "9:00 AM",
    venue: "Main Auditorium",
    eligibility: "BE/B.Tech - All Branches",
    requirements: "No Active Backlogs",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    company: "Infosys Limited",
    role: "Systems Engineer",
    package: "₹4.0 LPA",
    date: "2025-01-25",
    time: "10:00 AM",
    venue: "Placement Hall",
    eligibility: "BE/B.Tech - CSE, IT, ECE",
    requirements: "60% throughout academics",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    company: "Wipro Technologies",
    role: "Project Engineer",
    package: "₹3.8 LPA",
    date: "2025-02-05",
    time: "9:30 AM",
    venue: "Conference Hall",
    eligibility: "BE/B.Tech - All Branches",
    requirements: "No Standing Arrears",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop"
  }
];

const topRecruiters = [
  "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "HCL Technologies",
  "Tech Mahindra", "Capgemini", "IBM", "Microsoft", "Amazon", "Google",
  "Zoho Corporation", "Freshworks", "PayPal", "Cisco Systems"
];

const Placements = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleApplyClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Placement Activities</h1>
          <p className="text-gray-600">Career opportunities and placement drives at PSNA College</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Placement Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {placementStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center border">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Upcoming Placement Drives */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Placement Drives</h2>
              <div className="space-y-6">
                {upcomingDrives.map(drive => (
                  <div key={drive.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={drive.image} 
                          alt={drive.company}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{drive.company}</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            {drive.package}
                          </span>
                        </div>
                        <p className="text-lg text-blue-600 font-medium mb-4">{drive.role}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{drive.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">{drive.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{drive.venue}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <span className="text-sm">{drive.eligibility}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Requirements:</span> {drive.requirements}
                          </p>
                        </div>
                        
                        <button 
                          onClick={handleApplyClick}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Recruiters</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {topRecruiters.map((company, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="text-sm font-medium text-gray-700">{company}</p>
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

      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        formType="placement"
      />
    </div>
  );
};

export default Placements;
