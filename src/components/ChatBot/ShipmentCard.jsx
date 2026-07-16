export default function ShipmentCard({ pkg }) {
  return (
    <div className="bg-white border rounded-2xl p-4 shadow space-y-3">

      <div className="flex justify-between">

        <div>
          <h3 className="font-bold text-lg">
            📦 Shipment
          </h3>

          <p className="text-xs text-gray-500">
            {pkg.trackingId}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            pkg.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {pkg.status}
        </span>

      </div>

      {pkg.imageUrl && (
        <img
          src={pkg.imageUrl}
          className="rounded-xl w-full h-44 object-cover"
          alt="Shipment"
        />
      )}

      <div className="grid grid-cols-2 gap-3 text-sm">

        <div>
          <p className="text-gray-500">Carrier</p>
          <p>{pkg.carrier}</p>
        </div>

        <div>
          <p className="text-gray-500">Payment</p>
          <p>{pkg.paid ? "Paid ✅" : "Pending ❌"}</p>
        </div>

        <div>
          <p className="text-gray-500">Location</p>
          <p>{pkg.currentLocation || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500">Delivery</p>
          <p>
            {pkg.estimatedDelivery
              ? new Date(pkg.estimatedDelivery).toLocaleDateString()
              : "-"}
          </p>
        </div>

      </div>

    </div>
  );
}