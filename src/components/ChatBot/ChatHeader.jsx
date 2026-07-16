import { X } from "lucide-react";

export default function ChatHeader({ close }) {
  return (
    <div className="bg-blue-700 text-white p-5 flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold">
          SwiftBot AI
        </h2>

        <p className="text-sm text-blue-100">

          🟢 Online

        </p>

      </div>

      <button onClick={close}>
        <X />
      </button>

    </div>
  );
}