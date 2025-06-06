import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../utils/http';
import { Upload } from 'lucide-react';

const UpdateTracking = () => {
  const { trackingId } = useParams();
  const [formData, setFormData] = useState({
    status: '',
    paid: false,
    amount: '',
    currentLocation: '',
    estimatedDelivery: '',
    carrier: '',
    image: null
  });
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await http.get(`/packages/${trackingId}`);
        setFormData({
          status: res.data.status || '',
          paid: res.data.paid || false,
          amount: res.data.amount || '',
          currentLocation: res.data.currentLocation || '',
          estimatedDelivery: res.data.estimatedDelivery?.substring(0, 10) || '',
          carrier: res.data.carrier || '',
          image: null
        });
        setCurrentImageUrl(res.data.imageUrl);
      } catch {
        setMessage('❌ Failed to load package data.');
      }
    };
    fetchPackage();
  }, [trackingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('status', formData.status);
      payload.append('paid', formData.paid);
      payload.append('amount', formData.amount);
      payload.append('currentLocation', formData.currentLocation);
      payload.append('estimatedDelivery', formData.estimatedDelivery);
      payload.append('carrier', formData.carrier);
      if (formData.image) payload.append('image', formData.image);

      await http.put(`/packages/${trackingId}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅ Package updated successfully!');
    } catch (err) {
      setMessage(`❌ Update failed: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">Update Tracking for: {trackingId}</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} className="border p-3 rounded" />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="border p-3 rounded" />
        <input type="text" name="currentLocation" placeholder="Current Location" value={formData.currentLocation} onChange={handleChange} className="border p-3 rounded" />
        <input type="date" name="estimatedDelivery" value={formData.estimatedDelivery} onChange={handleChange} className="border p-3 rounded" />
        <input type="text" name="carrier" placeholder="Carrier" value={formData.carrier} onChange={handleChange} className="border p-3 rounded" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="paid" checked={formData.paid} onChange={handleChange} />
          <span className="text-sm">Mark as Paid</span>
        </label>
        {currentImageUrl && (
          <div className="text-sm">
            <p className="mb-2 font-medium">Current Image:</p>
            <img src={currentImageUrl} alt="Package" className="w-32 h-32 object-cover rounded border" />
          </div>
        )}
        <label className="flex items-center gap-3 text-sm">
          <Upload size={18} className="text-gray-600" />
          <input type="file" accept="image/*" onChange={e => setFormData(prev => ({ ...prev, image: e.target.files[0] }))} className="text-sm" />
        </label>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded">Update Package</button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default UpdateTracking;
