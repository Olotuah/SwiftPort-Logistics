import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatInput({ sendMessage }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;

    sendMessage(text);

    setText("");
  };

  return (
    <div className="border-t p-4 flex gap-3">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-5 py-3 outline-none"
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white p-3 rounded-full"
      >
        <SendHorizontal size={18} />
      </button>

    </div>
  );
}