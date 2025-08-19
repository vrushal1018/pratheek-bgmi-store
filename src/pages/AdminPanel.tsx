import React, { useState, useRef } from 'react';
import { useIDContext } from '../context/IDContext';
import { useAdmin } from '../context/AdminContext';
import { Plus, Edit, Trash2, Upload, X, Save, Star, Trophy, LogOut } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { ids, addNewID, updateID, deleteID, markAsSold, debugStorage, clearAllIDs, restoreFromStorage, forceSaveToStorage } = useIDContext();
  const { logout } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    level: '',
    skins: '',
    rank: '',
    kd: '',
    matches: '',
    available: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show loading if context is not ready
  if (!logout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newID = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      level: Number(formData.level),
      skins: formData.skins.split(',').map(skin => skin.trim()).filter(skin => skin),
      rank: formData.rank,
      kd: Number(formData.kd),
      matches: Number(formData.matches),
      available: formData.available,
    };

    try {
      if (editingId) {
        await updateID(editingId, newID);
        setEditingId(null);
      } else {
        await addNewID(newID);
      }

      resetForm();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving ID:', error);
      alert('Error saving ID. Please try again.');
    }
  };

  const handleEdit = (id: string) => {
    const existingId = ids.find(item => item.id === id);
    if (existingId) {
      setFormData({
        title: existingId.title,
        description: existingId.description,
        price: existingId.price.toString(),
        image: existingId.image,
        level: existingId.level.toString(),
        skins: existingId.skins.join(', '),
        rank: existingId.rank,
        kd: existingId.kd.toString(),
        matches: existingId.matches.toString(),
        available: existingId.available,
      });
      setEditingId(id);
      setShowAddModal(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ID?')) {
      try {
        await deleteID(id);
      } catch (error) {
        console.error('Error deleting ID:', error);
        alert('Error deleting ID. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      image: '',
      level: '',
      skins: '',
      rank: '',
      kd: '',
      matches: '',
      available: true,
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingId(null);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400">Manage your BGMI ID inventory</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAddModal}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add New ID</span>
          </button>
          <button
            onClick={debugStorage}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Debug Storage
          </button>
          <button
            onClick={restoreFromStorage}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Restore IDs
          </button>
          <button
            onClick={forceSaveToStorage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Force Save
          </button>
          <button
            onClick={clearAllIDs}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Clear All
          </button>
          <button
            onClick={logout}
            className="bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-400">{ids.length}</div>
          <div className="text-gray-400">Total IDs</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-400">
            {ids.filter(id => id.available).length}
          </div>
          <div className="text-gray-400">Available</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-bgmi-gold">
            ₹{ids.reduce((sum, id) => sum + id.price, 0).toLocaleString()}
          </div>
          <div className="text-gray-400">Total Value</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-bgmi-silver">
            {ids.filter(id => id.rank === 'Conqueror').length}
          </div>
          <div className="text-gray-400">Conqueror IDs</div>
        </div>
      </div>

      {/* IDs Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-white font-medium">Image</th>
                <th className="px-4 py-3 text-left text-white font-medium">Title</th>
                <th className="px-4 py-3 text-left text-white font-medium">Price</th>
                <th className="px-4 py-3 text-left text-white font-medium">Level</th>
                <th className="px-4 py-3 text-left text-white font-medium">Rank</th>
                <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                <th className="px-4 py-3 text-left text-white font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ids.map((id) => (
                <tr key={id.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <img
                      src={id.image}
                      alt={id.title}
                      className="w-16 h-16 object-cover rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop';
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{id.title}</div>
                    <div className="text-gray-400 text-sm">{id.description.substring(0, 50)}...</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-primary-400 font-bold">₹{id.price}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Star className="text-bgmi-gold" size={16} />
                      <span className="text-white">{id.level}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Trophy className="text-bgmi-silver" size={16} />
                      <span className="text-white">{id.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      id.available 
                        ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-600/20 text-red-400 border border-red-500/30'
                    }`}>
                      {id.available ? 'Available' : 'Sold'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(id.id)}
                        className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => markAsSold(id.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          id.available 
                            ? 'bg-orange-600/20 border border-orange-500/30 text-orange-400 hover:bg-orange-600/30' 
                            : 'bg-green-600/20 border border-green-500/30 text-green-400'
                        }`}
                        disabled={!id.available}
                      >
                        {id.available ? 'Mark Sold' : 'Sold'}
                      </button>
                      <button
                        onClick={() => handleDelete(id.id)}
                        className="p-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-600/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingId ? 'Edit ID' : 'Add New ID'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Enter ID title"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="input-field"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Enter detailed description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Level *</label>
                  <input
                    type="number"
                    required
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                    className="input-field"
                    placeholder="Enter account level"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Rank *</label>
                  <select
                    required
                    value={formData.rank}
                    onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Select rank</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Crown">Crown</option>
                    <option value="Ace">Ace</option>
                    <option value="Conqueror">Conqueror</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">K/D Ratio *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.kd}
                    onChange={(e) => setFormData(prev => ({ ...prev, kd: e.target.value }))}
                    className="input-field"
                    placeholder="Enter K/D ratio"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Matches *</label>
                  <input
                    type="number"
                    required
                    value={formData.matches}
                    onChange={(e) => setFormData(prev => ({ ...prev, matches: e.target.value }))}
                    className="input-field"
                    placeholder="Enter total matches"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Skins (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skins}
                  onChange={(e) => setFormData(prev => ({ ...prev, skins: e.target.value }))}
                  className="input-field"
                  placeholder="M416 Glacier, AKM Dragon, Kar98k Golden"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Image</label>
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-4 border-2 border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Upload size={20} />
                    <span>Click to upload image</span>
                  </button>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500"
                />
                <label htmlFor="available" className="text-white font-medium">
                  Available for sale
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Save size={20} />
                  <span>{editingId ? 'Update ID' : 'Add ID'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
