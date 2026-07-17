import {
  User,
  Bot,
  Package,
  MapPin,
  Calendar,
  Truck,
  CreditCard,
  Weight,
  UserRound,
  CheckCircle2,
} from "lucide-react";

export default function ChatMessage({ message }) {

  if (message.type === "shipment") {

    const data = message.data;

    return (

      <div className="flex justify-start mb-6">

        <div className="flex gap-3 items-start w-full">

          {/* BOT */}

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
            <Bot size={18} />
          </div>

          {/* CARD */}

          <div className="bg-white border rounded-3xl shadow-xl overflow-hidden w-full">

            {/* HEADER */}

            <div className="bg-gradient-to-r from-[#0F4C81] to-[#2563EB] p-5 text-white">

              <h2 className="font-bold text-lg">

                Shipment Found

              </h2>

              <p className="text-blue-100 text-sm">

                Tracking information retrieved successfully.

              </p>

            </div>

            {/* IMAGE */}

            {data.imageUrl && (

              <img
                src={data.imageUrl}
                alt="Shipment"
                className="w-full h-52 object-cover"
              />

            )}

            {/* BODY */}

            <div className="p-5 grid gap-4">

              <Info
                icon={<Package size={18} />}
                label="Tracking ID"
                value={data.trackingId}
              />

              <Info
                icon={<Truck size={18} />}
                label="Shipment Status"
                value={data.status}
              />

              <Info
                icon={<MapPin size={18} />}
                label="Current Location"
                value={data.currentLocation || "Transit"}
              />

              <Info
                icon={<Calendar size={18} />}
                label="Estimated Delivery"
                value={
                  data.estimatedDelivery
                    ? new Date(data.estimatedDelivery).toLocaleDateString()
                    : "Updating..."
                }
              />

              <Info
                icon={<CreditCard size={18} />}
                label="Delivery Fee"
                value={data.paid ? "Paid ✅" : "Pending Payment"}
              />

              <Info
                icon={<Truck size={18} />}
                label="Carrier"
                value={data.carrier}
              />

              <Info
                icon={<Weight size={18} />}
                label="Weight"
                value={`${data.weight} kg`}
              />

              <Info
                icon={<Package size={18} />}
                label="Service"
                value={data.service}
              />

              <Info
                icon={<UserRound size={18} />}
                label="Recipient"
                value={data.recipient?.name}
              />

              <Info
                icon={<UserRound size={18} />}
                label="Sender"
                value={data.sender?.name}
              />

              {data.amount > 0 && (

                <Info
                  icon={<CreditCard size={18} />}
                  label="Shipping Amount"
                  value={`$${data.amount}`}
                />

              )}

              <div
                className="
                mt-2
                rounded-2xl
                bg-green-50
                border
                border-green-200
                p-4
                flex
                gap-3
              "
              >

                <CheckCircle2
                  size={20}
                  className="text-green-600 mt-1"
                />

                <div>

                  <h4 className="font-semibold text-green-700">

                    Shipment Active

                  </h4>

                  <p className="text-sm text-green-600">

                    SwiftPort Logistics is currently monitoring this shipment.

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

    <div className={`flex mb-5 ${user ? "justify-end" : "justify-start"}`}>

      <div
        className={`flex gap-3 items-end max-w-[88%] ${
          user ? "flex-row-reverse" : ""
        }`}
      >

        <div
          className={`
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            shadow-lg

            ${
              user
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                : "bg-gradient-to-r from-[#0F4C81] to-[#2563EB] text-white"
            }
          `}
        >
          {user ? <User size={18} /> : <Bot size={18} />}
        </div>

        <div
          className={`
          px-5
          py-4
          rounded-3xl
          shadow-lg
          whitespace-pre-line
          leading-7

          ${
            user
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-lg"
              : "bg-white border text-slate-700 rounded-bl-lg"
          }
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

      <div className="text-[#0F4C81] mt-1">

        {icon}

      </div>

      <div>

        <p className="uppercase text-xs text-gray-400">

          {label}

        </p>

        <p className="font-semibold text-gray-700">

          {value}

        </p>

      </div>

    </div>

  );

}