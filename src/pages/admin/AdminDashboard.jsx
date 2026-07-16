import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../utils/http';

export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      const res = await http.get('/packages/all');
      setPackages(res.data);
    } catch {
      setError('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Delete a package
  const handleDelete = async (trackingId) => {
    if (!window.confirm(`Delete package ${trackingId}?`)) return;
    try {
      await http.delete(`/packages/${trackingId}`);
      setPackages((pkgs) => pkgs.filter((pkg) => pkg.trackingId !== trackingId));
    } catch {
      alert('Failed to delete package.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">All Packages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100 text-left text-sm font-semibold">
            <tr>
              <th className="border px-4 py-2">Tracking ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Paid</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {packages.map((pkg) => (
              <tr key={pkg._id} className="border-t">
                <td className="px-4 py-2">{pkg.trackingId}</td>
                <td className="px-4 py-2">{pkg.status}</td>
                <td className="px-4 py-2">
                  {pkg.paid ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {pkg.imageUrl ? (
                    <img
                      src={
                        pkg.imageUrl.startsWith('http')
                          ? pkg.imageUrl
                          : `http://localhost:5000${pkg.imageUrl}`
                      }
                      alt="package"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-4 py-2 flex gap-4">
                  <Link
                    to={`/admin/update/${pkg.trackingId}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg.trackingId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
