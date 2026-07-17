import {
  Package,
  Globe,
  DollarSign,
  Building2,
  Headset,
} from "lucide-react";

const questions = [
  {
    text: "Track my shipment",
    icon: <Package size={16} />,
  },
  {
    text: "International Shipping",
    icon: <Globe size={16} />,
  },
  {
    text: "Shipping Quote",
    icon: <DollarSign size={16} />,
  },
  {
    text: "Perth Office",
    icon: <Building2 size={16} />,
  },
  {
    text: "Customer Support",
    icon: <Headset size={16} />,
  },
];

export default function QuickReplies({ sendMessage }) {
  return (
    <div className="mt-6">

      <div className="flex items-center gap-2 mb-4">

        <div className="w-8 h-[2px] bg-blue-600 rounded-full"></div>

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">

          Quick Actions

        </p>

      </div>

      <div className="flex flex-wrap gap-3">

        {questions.map((item) => (

          <button
            key={item.text}
            onClick={() => sendMessage(item.text)}
            className="
            group
            flex
            items-center
            gap-2
            px-4
            py-3
            rounded-2xl
            bg-white
            border
            border-slate-200
            shadow-sm
            hover:border-blue-500
            hover:bg-gradient-to-r
            hover:from-[#0F4C81]
            hover:to-[#2563EB]
            hover:text-white
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            "
          >

            <span
              className="
              text-blue-600
              group-hover:text-white
              transition
              "
            >
              {item.icon}
            </span>

            <span className="text-sm font-medium">

              {item.text}

            </span>

          </button>

        ))}

      </div>

    </div>
  );
}