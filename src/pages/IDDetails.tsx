import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useIDContext } from '../context/IDContext';
import { ArrowLeft, Star, Trophy, Target, Shield, MessageCircle, Phone, CheckCircle, X } from 'lucide-react';

const IDDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIDById } = useIDContext();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const bgmiId = getIDById(id || '');

  if (!bgmiId) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-2xl font-bold text-white mb-2">ID Not Found</h3>
        <p className="text-gray-400 mb-6">The BGMI ID you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New BGMI ID Booking Request:
ID: ${bgmiId.title}
Price: ₹${bgmiId.price}
Customer Name: ${bookingForm.name}
Phone: ${bookingForm.phone}
Email: ${bookingForm.email}
Message: ${bookingForm.message}`;
    
    const whatsappUrl = `https://wa.me/919663998885?text=${encodeURIComponent(message)}`;
    // Use location.href to avoid permission popup
    window.location.href = whatsappUrl;
    
    // Reset form and close modal
    setBookingForm({ name: '', phone: '', email: '', message: '' });
    setShowBookingModal(false);
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'conqueror':
        return 'bg-gradient-to-r from-bgmi-gold to-yellow-500';
      case 'ace':
        return 'bg-gradient-to-r from-bgmi-silver to-gray-400';
      case 'crown':
        return 'bg-gradient-to-r from-bgmi-bronze to-orange-500';
      default:
        return 'bg-primary-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* ID Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={bgmiId.image}
              alt={bgmiId.title}
              className="w-full h-96 object-cover rounded-xl"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop';
              }}
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-lg font-bold">
              ₹{bgmiId.price}
            </div>
            <div className={`absolute top-4 left-4 ${getRankColor(bgmiId.rank)} text-white px-3 py-2 rounded-lg text-sm font-bold`}>
              {bgmiId.rank}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-primary-400">{bgmiId.level}</div>
              <div className="text-sm text-gray-400">Level</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-bgmi-gold">{bgmiId.kd}</div>
              <div className="text-sm text-gray-400">K/D Ratio</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-bgmi-silver">{bgmiId.matches}</div>
              <div className="text-sm text-gray-400">Matches</div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{bgmiId.title}</h1>
            <p className="text-gray-300 text-lg">{bgmiId.description}</p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Shield className="text-primary-400" size={24} />
              <span>Key Features</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <Star className="text-bgmi-gold" size={20} />
                <span className="text-white">Level {bgmiId.level} Account</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <Trophy className="text-bgmi-silver" size={20} />
                <span className="text-white">{bgmiId.rank} Rank</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <Target className="text-primary-400" size={20} />
                <span className="text-white">KD: {bgmiId.kd} ({bgmiId.matches} matches)</span>
              </div>
            </div>
          </div>

          {/* Skins */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Available Skins</h3>
            <div className="flex flex-wrap gap-2">
              {bgmiId.skins.map((skin, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-300 text-sm"
                >
                  {skin}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="btn-primary w-full text-lg py-4"
            >
              Book This ID Now
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const whatsappUrl = `https://wa.me/919663998885?text=Hi! I'm interested in ${bgmiId.title} (₹${bgmiId.price})`;
                  window.location.href = whatsappUrl;
                }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = `tel:919663998885`;
                }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="card">
        <h3 className="text-2xl font-bold text-white mb-4">Account Details</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Account Level</span>
              <span className="text-white font-medium">{bgmiId.level}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Current Rank</span>
              <span className="text-white font-medium">{bgmiId.rank}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">K/D Ratio</span>
              <span className="text-white font-medium">{bgmiId.kd}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Total Matches</span>
              <span className="text-white font-medium">{bgmiId.matches}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Skins Count</span>
              <span className="text-white font-medium">{bgmiId.skins.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400 font-medium flex items-center space-x-1">
                <CheckCircle size={16} />
                <span>Available</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Book This ID</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-primary-600/20 border border-primary-500/30 rounded-lg">
              <h4 className="font-bold text-white mb-2">{bgmiId.title}</h4>
              <p className="text-primary-300 text-sm">Price: ₹{bgmiId.price}</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  placeholder="Enter your email (optional)"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Additional Message</label>
                <textarea
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Any special requirements or questions?"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Send Booking Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDDetails;
