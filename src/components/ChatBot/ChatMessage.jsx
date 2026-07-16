import ShipmentCard from "./ShipmentCard";

export default function ChatMessage({ message }) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={`flex mb-4 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[90%] ${
          isBot ? "" : "bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-none"
        }`}
      >
        {message.type === "shipment" ? (
          <ShipmentCard pkg={message.data} />
        ) : (
          <div
            className={`whitespace-pre-line ${
              isBot
                ? "bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow"
                : ""
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}