import "./Chat.css";
import { useState } from "react";
import axios from "axios";

import API from "../../config/api";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import TypingIndicator from "./TypingIndicator";

import { getBotResponse } from "../../services/chatbot";

export default function ChatWindow({ close }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Welcome to SwiftPort Logistics.\n\nI'm SwiftBot AI.\n\nHow can I help you today?",
    },
  ]);

  const [waitingForTracking, setWaitingForTracking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);

    if (waitingForTracking) {
      setWaitingForTracking(false);
      setIsTyping(true);

      try {
        const res = await axios.get(
          `${API}/api/packages/track/${text}`
        );

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              type: "shipment",
              data: res.data,
            },
          ]);

          setIsTyping(false);
        }, 1200);
      } catch (err) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text:
                "❌ Sorry, I couldn't find that tracking ID.\n\nPlease check it and try again.",
            },
          ]);

          setIsTyping(false);
        }, 1200);
      }

      return;
    }

    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(text);

      if (reply.type === "tracking") {
        setWaitingForTracking(true);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply.text,
        },
      ]);

      setIsTyping(false);
    }, 1000);
  };

  return (
    <div
      className="
        chat-window
        fixed
        z-50
        bg-white
        shadow-2xl
        border
        overflow-hidden
        flex
        flex-col

        bottom-24
        right-6
        w-[390px]
        h-[650px]
        rounded-3xl

        max-md:left-3
        max-md:right-3
        max-md:bottom-24
        max-md:w-auto
        max-md:h-[78vh]
        max-md:rounded-2xl
      "
    >
      <ChatHeader close={close} />

      <div className="chat-scroll flex-1 overflow-y-auto bg-gray-50 p-5">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <QuickReplies sendMessage={sendMessage} />
      </div>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}