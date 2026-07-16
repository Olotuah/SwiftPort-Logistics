import "./Chat.css";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow close={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(!open)}
        className="
          chat-button
          fixed
          bottom-5
          right-5
          max-md:bottom-4
          max-md:right-4
          z-50
          w-16
          h-16
          rounded-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          shadow-2xl
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
        "
      >
        {open ? <X size={30} /> : <MessageCircle size={30} />}
      </button>
    </>
  );
}