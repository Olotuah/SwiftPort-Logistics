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
    fixed
    z-[99999]
    bottom-6
    right-6

    md:bottom-8
    md:right-8

    w-16
    h-16
    rounded-full

    bg-gradient-to-r
    from-[#0F4C81]
    to-[#2563EB]

    shadow-2xl
    hover:scale-110
    transition-all
    duration-300

    flex
    items-center
    justify-center

    text-white
  "
>
        {open ? <X size={30} /> : <MessageCircle size={30} />}
      </button>
    </>
  );
}