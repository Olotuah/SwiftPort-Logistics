import React, { useState } from 'react';
import http from '../utils/http';

export default function CreateShipment() {
  const [form, setForm] = useState({
    sender: { name: '', phone: '' },
    recipient: { name: '', phone: '', email: '', address: '' },
    weight: '',
    service: '',
    paid: false,
    imageUrl: ''
  });
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'paid') {
      setForm((f) => ({ ...f, paid: checked }));
    } else if (name.startsWith('sender.') || name.startsWith('recipient.')) {
      const [section, field] = name.split('.');
      setForm((f) => ({
        ...f,
        [section]: { ...f[section], [field]: value }
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validatePhone = (phone) => {
    // E.164 format: + and 10 to 15 digits
    const regex = /^\+\d{10,15}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validate recipient phone
    if (!validatePhone(form.recipient.phone)) {
      setError('Recipient phone must be in E.164 format, e.g. +2349060064490');
      return;
    }
    // Optionally validate sender phone if needed
    if (form.sender.phone && !validatePhone(form.sender.phone)) {
      setError('Sender phone must be in E.164 format, e.g. +12345678900');
      return;
    }

    try {
      const { data } = await http.post('/packages', form);
      setTrackingId(data.trackingId);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Shipment</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Sender */}
        <div>
          <label className="block">Sender Name</label>
          <input
            name="sender.name"
            value={form.sender.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Sender Phone (E.164)</label>
          <input
            name="sender.phone"
            value={form.sender.phone}
            onChange={handleChange}
            placeholder="+12345678900"
            className="border p-2 w-full"
          />
        </div>

        {/* Recipient */}
        <div>
          <label className="block">Recipient Name</label>
          <input
            name="recipient.name"
            value={form.recipient.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Recipient Phone (E.164)</label>
          <input
            name="recipient.phone"
            type="tel"
            value={form.recipient.phone}
            onChange={handleChange}
            placeholder="+2349060064490"
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Recipient Email</label>
          <input
            name="recipient.email"
            type="email"
            value={form.recipient.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Recipient Address</label>
          <input
            name="recipient.address"
            value={form.recipient.address}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Package Details */}
        <div>
          <label className="block">Weight (kg)</label>
          <input
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Service Type</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select...</option>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            name="paid"
            type="checkbox"
            checked={form.paid}
            onChange={handleChange}
          />
          <label>Paid</label>
        </div>
        <div>
          <label className="block">Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {trackingId && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <p>Your new tracking number is:</p>
          <code className="font-mono">{trackingId}</code>
        </div>
      )}
    </div>
  );
}
