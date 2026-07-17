import {
  User,
  Bot,
  Package,
  MapPin,
  Calendar,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function ChatMessage({ message }) {

  // Shipment Card
  if (message.type === "shipment") {

    const data = message.data;

    return (

      <div className="flex justify-start mb-5">

        <div className="flex gap-3 items-start max-w-[95%]">

          {/* Bot Avatar */}

          <div
            className="
            w-10
            h-10
            rounded-full
            bg-gradient-to-br
            from-[#0F4C81]
            to-[#2563EB]
            text-white
            flex
            items-center
            justify-center
            shadow-lg
            shrink-0
            "
          >
            <Bot size={20} />
          </div>

          {/* Shipment Card */}

          <div
            className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-slate-200
            overflow-hidden
            w-full
            "
          >

            <div
              className="
              bg-gradient-to-r
              from-[#0F4C81]
              to-[#2563EB]
              text-white
              p-4
              "
            >

              <h3 className="font-bold text-lg">

                Shipment Located

              </h3>

              <p className="text-sm opacity-90">

                Tracking information found

              </p>

            </div>

            <div className="p-5 space-y-4">

              <Info
                icon={<Package size={18} />}
                label="Tracking Number"
                value={data.trackingNumber}
              />

              <Info
                icon={<Truck size={18} />}
                label="Status"
                value={data.status}
              />

              <Info
                icon={<MapPin size={18} />}
                label="Destination"
                value={data.destination}
              />

              <Info
                icon={<Calendar size={18} />}
                label="Estimated Delivery"
                value={data.deliveryDate}
              />

              <div
                className="
                mt-4
                p-4
                rounded-xl
                bg-green-50
                border
                border-green-200
                flex
                gap-3
                "
              >

                <CheckCircle2
                  className="text-green-600"
                  size={20}
                />

                <div>

                  <p className="font-semibold text-green-700">

                    Shipment Active

                  </p>

                  <p className="text-sm text-green-600">

                    Your package is currently being monitored by SwiftPort Logistics.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    );

  }

  const user = message.sender === "user";

  return (

    <div
      className={`flex mb-5 ${user ? "justify-end" : "justify-start"}`}
    >

      <div
        className={`flex gap-3 items-end max-w-[88%] ${user ? "flex-row-reverse" : ""
          }`}
      >

        {/* Avatar */}

        <div
          className={`
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          shadow-lg
          shrink-0

          ${user
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              : "bg-gradient-to-r from-[#0F4C81] to-[#2563EB] text-white"}
          `}
        >

          {user ? <User size={18} /> : <Bot size={18} />}

        </div>

        {/* Bubble */}

        <div
          className={`
          rounded-3xl
          px-5
          py-4
          shadow-lg
          leading-7
          whitespace-pre-line
          text-[15px]
          transition-all

          ${user
              ? `
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              rounded-br-lg
              `
              : `
              bg-white
              border
              border-slate-200
              text-slate-700
              rounded-bl-lg
              `}
          `}
        >

          {message.text}

        </div>

      </div>

    </div>

  );

}

function Info({ icon, label, value }) {

  return (

    <div className="flex gap-3">

      <div className="text-blue-700 mt-1">

        {icon}

      </div>

      <div>

        <p className="text-xs uppercase text-gray-400">

          {label}

        </p>

        <p className="font-semibold text-gray-700">

          {value || "N/A"}

        </p>

      </div>

    </div>

  );

}