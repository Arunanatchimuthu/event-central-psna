
import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, GraduationCap, Hash } from 'lucide-react';

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'event' | 'placement';
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ isOpen, onClose, formType }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    rollNumber: '',
    skills: '',
    interestedArea: '',
    internExperience: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Load EmailJS script and initialize
    const loadEmailJS = () => {
      if (window.emailjs) {
        window.emailjs.init('DDlECGfrvZcY5n6xM');
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init('DDlECGfrvZcY5n6xM');
          console.log('EmailJS initialized successfully');
        }
      };
      script.onerror = () => {
        console.error('Failed to load EmailJS script');
      };
      document.head.appendChild(script);
    };

    if (isOpen) {
      loadEmailJS();
    }
  }, [isOpen]);

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'department', 'year', 'rollNumber'];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        setSubmitMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address');
      return false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setSubmitMessage('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Submitting your registration...');

    try {
      console.log('Starting form submission:', formData);

      // Prepare data for Google Apps Script
      const submissionData = {
        ...formData,
        formType: formType,
        timestamp: new Date().toISOString(),
        phone: formData.phone.replace(/\D/g, '') // Clean phone number
      };

      console.log('Sending data to Google Apps Script:', submissionData);

      // Send to Google Apps Script with better error handling
      const response = await fetch('https://script.google.com/macros/s/AKfycbx5wX95D6-5jSG8caH2jrEn-EO0Rg_H2kIK9zNJ7iV6TqX-XrBZh-VK66tPZZi3vi0/exec', {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log('Google Apps Script response status:', response.status);

      // Send confirmation email using EmailJS
      if (window.emailjs) {
        try {
          console.log('Sending email via EmailJS...');
          const emailResult = await window.emailjs.send(
            'service_m9hmg2b',
            'template_zas8xnr',
            {
              to_name: 'Admin',
              from_name: formData.fullName,
              student_email: formData.email,
              student_phone: formData.phone,
              department: formData.department,
              year: formData.year,
              roll_number: formData.rollNumber,
              form_type: formType === 'event' ? 'Event Registration' : 'Placement Registration',
              skills: formData.skills || 'N/A',
              interested_area: formData.interestedArea || 'N/A',
              intern_experience: formData.internExperience || 'N/A',
            },
            'DDlECGfrvZcY5n6xM'
          );
          console.log('Email sent successfully:', emailResult);
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Don't fail the entire submission if email fails
        }
      } else {
        console.warn('EmailJS not available');
      }

      setSubmitMessage('✅ Registration successful! You will receive a confirmation email shortly.');
      
      // Reset form and close modal after success
      setTimeout(() => {
        onClose();
        setSubmitMessage('');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          department: '',
          year: '',
          rollNumber: '',
          skills: '',
          interestedArea: '',
          internExperience: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitMessage('❌ Registration failed. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              📋 {formType === 'event' ? 'Event' : 'Placement'} Registration Form
            </h2>
            <p className="text-gray-600 mt-1">
              Register here to participate and receive updates from us!
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@student.psnacet.edu.in"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="9876543210"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <GraduationCap className="w-4 h-4 inline mr-2" />
              Department *
            </label>
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication Engineering</option>
              <option value="EEE">Electrical & Electronics Engineering</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Year of Study */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year of Study *
            </label>
            <select
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-2" />
              Roll Number *
            </label>
            <input
              type="text"
              required
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your roll number"
            />
          </div>

          {/* Placement specific fields */}
          {formType === 'placement' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List your technical skills"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interested Area
                </label>
                <input
                  type="text"
                  value={formData.interestedArea}
                  onChange={(e) => setFormData({ ...formData, interestedArea: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Development, Data Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internship Experience
                </label>
                <select
                  value={formData.internExperience}
                  onChange={(e) => setFormData({ ...formData, internExperience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Experience</option>
                  <option value="Yes">Yes, I have internship experience</option>
                  <option value="No">No, I don't have internship experience</option>
                </select>
              </div>
            </>
          )}

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-4 rounded-lg ${
              submitMessage.includes('successful') || submitMessage.includes('✅') 
                ? 'bg-green-100 text-green-800' 
                : submitMessage.includes('failed') || submitMessage.includes('❌')
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Declare global emailjs for TypeScript
declare global {
  interface Window {
    emailjs: any;
  }
}
