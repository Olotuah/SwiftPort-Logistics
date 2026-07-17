import {
  X,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function ChatHeader({ close }) {
  return (
    <div
      className="
      relative
      overflow-hidden
      bg-gradient-to-r
      from-[#0F4C81]
      via-[#155E75]
      to-[#2563EB]
      text-white
      p-5
      shadow-lg
      "
    >
      {/* Decorative Blur Circles */}

      <div className="absolute -top-10 -left-8 w-36 h-36 rounded-full bg-white/10 blur-2xl"></div>

      <div className="absolute -bottom-10 right-0 w-40 h-40 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative flex items-center justify-between">

        <div className="flex items-center gap-4">

          {/* AI Avatar */}

          <div className="relative">

            <div
              className="
              w-14
              h-14
              rounded-full
              bg-white/15
              backdrop-blur-md
              border
              border-white/20
              flex
              items-center
              justify-center
              shadow-lg
              "
            >
              <Truck size={26} />
            </div>

            {/* Online Dot */}

            <span
              className="
              absolute
              bottom-0
              right-0
              w-4
              h-4
              rounded-full
              bg-green-400
              border-2
              border-white
              animate-pulse
              "
            ></span>

          </div>

          {/* Header Text */}

          <div>

            <h2 className="font-bold text-xl tracking-wide">

              SwiftBot AI

            </h2>

            <p className="text-sm text-blue-100">

              Smart Logistics Assistant

            </p>

            <div className="flex items-center gap-2 mt-2">

              <ShieldCheck
                size={15}
                className="text-green-300"
              />

              <span className="text-xs text-white/90">

                Online • Typically replies instantly

              </span>

            </div>

          </div>

        </div>

        {/* Close */}

        <button
          onClick={close}
          className="
          w-10
          h-10
          rounded-full
          bg-white/10
          hover:bg-white/20
          transition
          flex
          items-center
          justify-center
          "
        >
          <X size={22} />
        </button>

      </div>
    </div>
  );
}