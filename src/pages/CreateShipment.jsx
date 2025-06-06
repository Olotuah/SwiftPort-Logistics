import React, { useState } from 'react';
import http from '../utils/http';
import { Upload } from 'lucide-react';

const CreateShipment = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    recipientAddress: '',
    weight: '',
    service: '',
    amount: '',
    currentLocation: '',
    estimatedDelivery: '',
    carrier: '',
    image: null
  });
  const [message, setMessage] = useState('');
  const [trackingId, setTrackingId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('sender[name]', formData.senderName);
      payload.append('sender[phone]', formData.senderPhone);
      payload.append('recipient[name]', formData.recipientName);
      payload.append('recipient[phone]', formData.recipientPhone);
      payload.append('recipient[email]', formData.recipientEmail);
      payload.append('recipient[address]', formData.recipientAddress);
      payload.append('weight', formData.weight);
      payload.append('service', formData.service);
      payload.append('amount', formData.amount);
      payload.append('currentLocation', formData.currentLocation);
      payload.append('estimatedDelivery', formData.estimatedDelivery);
      payload.append('carrier', formData.carrier);
      if (formData.image) payload.append('image', formData.image);

      const res = await http.post('/packages', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setTrackingId(res.data.trackingId);
      setMessage('✅ Shipment created successfully.');
    } catch (err) {
      setMessage(`❌ Failed to create shipment: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">Create New Shipment</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="senderName" placeholder="Sender Name" value={formData.senderName} onChange={handleChange} className="border p-3 rounded" required />
        <input name="senderPhone" placeholder="Sender Phone" value={formData.senderPhone} onChange={handleChange} className="border p-3 rounded" required />
        <input name="recipientName" placeholder="Recipient Name" value={formData.recipientName} onChange={handleChange} className="border p-3 rounded" required />
        <input name="recipientPhone" placeholder="Recipient Phone" value={formData.recipientPhone} onChange={handleChange} className="border p-3 rounded" required />
        <input name="recipientEmail" type="email" placeholder="Recipient Email" value={formData.recipientEmail} onChange={handleChange} className="border p-3 rounded" required />
        <input name="recipientAddress" placeholder="Recipient Address" value={formData.recipientAddress} onChange={handleChange} className="border p-3 rounded" required />
        <input name="weight" type="number" step="0.1" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="border p-3 rounded" required />
        <input name="service" placeholder="Service Type" value={formData.service} onChange={handleChange} className="border p-3 rounded" required />
        <input name="amount" type="number" step="0.01" placeholder="Amount" value={formData.amount} onChange={handleChange} className="border p-3 rounded" />
        <input name="currentLocation" placeholder="Current Location" value={formData.currentLocation} onChange={handleChange} className="border p-3 rounded" />
        <input name="estimatedDelivery" type="date" value={formData.estimatedDelivery} onChange={handleChange} className="border p-3 rounded" />
        <input name="carrier" placeholder="Carrier (optional)" value={formData.carrier} onChange={handleChange} className="border p-3 rounded" />
        <label className="flex items-center gap-3 text-sm">
          <Upload size={18} className="text-gray-600" />
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded">Create Shipment</button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

      {trackingId && (
        <div className="mt-6 p-4 border rounded bg-green-50 text-center">
          <p>Your new tracking number is:</p>
          <code className="font-mono text-lg text-green-800">{trackingId}</code>
        </div>
      )}
    </div>
  );
};

export default CreateShipment;
