import "./Chat.css";
import { useState, useEffect, useRef } from "react";
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

  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, isTyping]);

  const sendMessage = async (text) => {

    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);

    /**
     * TRACKING MODE
     */

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

          setShowQuickReplies(true);

        }, 1200);

      }

      catch (err) {

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

          setShowQuickReplies(true);

        }, 1200);

      }

      return;

    }

    /**
     * NORMAL CHAT
     */

    setIsTyping(true);

    setTimeout(() => {

      const reply = getBotResponse(text);

      if (reply.type === "tracking") {

        setWaitingForTracking(true);

        setShowQuickReplies(false);

      }

      setMessages((prev) => [

        ...prev,

        {
          sender: "bot",
          text: reply.text,
        },

      ]);

      setIsTyping(false);

    }, 900);

  };

  return (

    <div
      className="
        chat-window
        fixed
        z-[99998]

        right-6
        bottom-24

        w-[390px]
        max-w-[calc(100vw-32px)]

        h-[min(700px,calc(100vh-120px))]

        bg-white
        rounded-3xl
        shadow-2xl
        border
        overflow-hidden
        flex
        flex-col

        max-lg:left-4
        max-lg:right-4
        max-lg:w-auto
        max-lg:h-[calc(100vh-110px)]
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

        {showQuickReplies && (

          <QuickReplies sendMessage={sendMessage} />

        )}

        <div ref={bottomRef}></div>

      </div>

      <ChatInput sendMessage={sendMessage} />

    </div>

  );

}