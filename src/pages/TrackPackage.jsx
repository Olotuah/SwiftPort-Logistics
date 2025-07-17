import React, { useState, useEffect } from "react";
import http from "../utils/http";
import { Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import Spinner from "../components/Spinner"; // ✅ Import Spinner

const TrackPackage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState([]);
  const [fromRecentClick, setFromRecentClick] = useState(false);

  // Load recent from local storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recent-tracks")) || [];
    setRecent(stored);
  }, []);

  // Auto-trigger tracking if user clicks recent
  useEffect(() => {
    if (fromRecentClick && trackingId) {
      handleTrack();
      setFromRecentClick(false);
    }
  }, [trackingId]);

  const handleTrack = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    const normalizedId = trackingId.trim().toLowerCase();
    if (!normalizedId) {
      setLoading(false);
      setError("Please enter a valid tracking ID.");
      return;
    }

    try {
      const res = await http.get(`/packages/track/${normalizedId}`);
      setResult(res.data);

      // Save to recent
      const updated = [
        normalizedId,
        ...recent.filter((id) => id !== normalizedId),
      ].slice(0, 5);
      setRecent(updated);
      localStorage.setItem("recent-tracks", JSON.stringify(updated));
    } catch (err) {
      setError("Package not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
  };

  const handleRecentClick = (id) => {
    setTrackingId(id);
    setFromRecentClick(true);
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        SwiftPort Logistics Tracker
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 border p-3 rounded"
        />
        <button
          onClick={handleTrack}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded"
        >
          Track
        </button>
      </div>

      {recent.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Recent:</p>
          <div className="flex flex-wrap gap-2">
            {recent.map((id) => (
              <button
                key={id}
                onClick={() => handleRecentClick(id)}
                className="text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🌀 Show Spinner while loading */}
      {loading && <Spinner />}

      {/* ❌ Error if any */}
      {!loading && error && <p className="text-red-500 text-center">{error}</p>}

      {/* ✅ Result section */}
      {!loading && result && (
        <div className="bg-white shadow-lg border p-6 rounded mt-8">
          <h2 className="text-xl font-bold text-center mb-4">
            Package Receipt
          </h2>
          <div className="text-sm font-semibold space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tracking ID:</span>
              <div className="flex items-center gap-2">
                <span>{trackingId}</span>
                <button
                  onClick={handleCopy}
                  title="Copy"
                  className="text-gray-500 hover:text-black"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span>{result.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Sender:</span>
              <span>{result.sender?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Sender Phone:</span>
              <span>{result.sender?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Recipient:</span>
              <span>{result.recipient?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Recipient Phone:</span>
              <span>{result.recipient?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Recipient Email:</span>
              <span>{result.recipient?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Recipient Address:</span>
              <span>{result.recipient?.address}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Delivery Fee:</span>
              <span
                className={
                  result.paid
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {result.paid ? "Paid ✅" : "Unpaid ❌"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>${result.amount?.toFixed(2) || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Current Location:</span>
              <span>{result.currentLocation || "In transit"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Last Updated:</span>
              <span>{new Date(result.updatedAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Estimated Delivery:</span>
              <span>
                {result.estimatedDelivery
                  ? new Date(result.estimatedDelivery).toDateString()
                  : "Pending"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Carrier:</span>
              <span>{result.carrier || "SwiftPort Logistics"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Weight (kg):</span>
              <span>{result.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Service:</span>
              <span>{result.service}</span>
            </div>

            {result.imageUrl && (
              <div className="pt-4 text-center">
                <img
                  src={result.imageUrl}
                  alt="Package"
                  className="w-76 h-76 object-contain mx-auto rounded-lg border"
                />
              </div>
            )}

            <div className="pt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                Scan QR to share this tracking ID
              </p>
              <QRCodeCanvas value={trackingId} size={100} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPackage;
