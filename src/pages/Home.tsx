import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIDContext } from '../context/IDContext';
import { Filter, MessageCircle, Star, Trophy, Target, X } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home: React.FC = () => {
  const { filteredIds, budgetFilter, setBudgetFilter } = useIDContext();
  const [showCustomRequest, setShowCustomRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customRequest, setCustomRequest] = useState({
    name: '',
    phone: '',
    budget: '',
    requirements: '',
  });

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Custom BGMI ID Request:
Name: ${customRequest.name}
Phone: ${customRequest.phone}
Budget: ₹${customRequest.budget}
Requirements: ${customRequest.requirements}`;
    
    const whatsappUrl = `https://wa.me/919663998885?text=${encodeURIComponent(message)}`;
    // Use location.href to avoid permission popup
    window.location.href = whatsappUrl;
    
    // Reset form
    setCustomRequest({ name: '', phone: '', budget: '', requirements: '' });
    setShowCustomRequest(false);
  };



  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-bgmi-gold bg-clip-text text-transparent">
          Premium BGMI IDs
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get your hands on high-level BGMI accounts with rare skins, excellent stats, and competitive prices.
          Start dominating the battleground today!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setShowCustomRequest(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>Custom Request</span>
          </button>
          <button 
            onClick={() => {
              const whatsappUrl = "https://wa.me/919663998885?text=Hi! I want to know more about your BGMI IDs";
              window.location.href = whatsappUrl;
            }}
            className="btn-secondary flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>Chat with Us</span>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="card space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="text-primary-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Find Your Perfect ID</h2>
        </div>
        
                 <div className="space-y-6">
           {/* Budget Filter */}
           <div className="space-y-2">
             <label className="text-white font-medium">Budget Range</label>
             <div className="flex items-center space-x-4">
               <input
                 type="range"
                 min="0"
                 max="30000"
                 step="1000"
                 value={budgetFilter}
                 onChange={(e) => setBudgetFilter(Number(e.target.value))}
                 className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
               />
               <span className="text-primary-400 font-bold min-w-[80px]">
                 ₹{budgetFilter === 0 ? 'Any' : budgetFilter}
               </span>
             </div>
             <div className="flex justify-between text-sm text-gray-400">
               <span>₹0</span>
               <span>₹30000+</span>
             </div>
           </div>
         </div>

        {/* Quick Budget Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setBudgetFilter(0)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              budgetFilter === 0 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            All Prices
          </button>
          <button
            onClick={() => setBudgetFilter(1000)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              budgetFilter === 1000 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Under ₹1000
          </button>
          <button
            onClick={() => setBudgetFilter(5000)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              budgetFilter === 5000 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Under ₹5000
          </button>
          <button
            onClick={() => setBudgetFilter(10000)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              budgetFilter === 10000 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Under ₹10000
          </button>
          <button
            onClick={() => setBudgetFilter(20000)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              budgetFilter === 20000 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Under ₹20000
          </button>
        </div>
      </div>

             {/* Results Count */}
       <div className="flex justify-between items-center">
         <p className="text-gray-300">
           Showing {filteredIds.length} available IDs
         </p>
         {budgetFilter > 0 && (
           <button
             onClick={() => setBudgetFilter(0)}
             className="text-primary-400 hover:text-primary-300 text-sm"
           >
             Clear Budget Filter
           </button>
         )}
       </div>

             {/* ID Cards Grid */}
       {isLoading ? (
         <LoadingSkeleton />
       ) : filteredIds.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredIds.map((id) => (
            <div key={id.id} className="card group hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src={id.image}
                  alt={id.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  ₹{id.price}
                </div>
                <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {id.rank}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                  {id.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {id.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Star size={16} className="text-bgmi-gold" />
                    <span>Level {id.level}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Target size={16} className="text-primary-400" />
                    <span>KD {id.kd}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Trophy size={16} className="text-bgmi-silver" />
                    <span>{id.matches} Matches</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/id/${id.id}`}
                    className="btn-primary w-full text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
                 <div className="text-center py-12">
           <div className="text-6xl mb-4">🎮</div>
           <h3 className="text-2xl font-bold text-white mb-2">No IDs Found</h3>
           <p className="text-gray-400 mb-6">
             {budgetFilter > 0 
               ? `No IDs available within your budget of ₹${budgetFilter}. Try adjusting your budget or contact us for custom options.`
               : 'No IDs available at the moment. Contact us for custom options.'
             }
           </p>
           <button
             onClick={() => {
               setBudgetFilter(0);
             }}
             className="btn-primary"
           >
             Clear Budget Filter
           </button>
         </div>
      )}

      {/* Custom Request Modal */}
      {showCustomRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Custom ID Request</h3>
              <button
                onClick={() => setShowCustomRequest(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCustomRequest} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={customRequest.name}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customRequest.phone}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Budget (₹)</label>
                <input
                  type="number"
                  required
                  value={customRequest.budget}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, budget: e.target.value }))}
                  className="input-field"
                  placeholder="Your budget"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Requirements</label>
                <textarea
                  required
                  value={customRequest.requirements}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, requirements: e.target.value }))}
                  className="input-field resize-none"
                  rows={4}
                  placeholder="Describe your requirements (level, skins, rank, etc.)"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomRequest(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
