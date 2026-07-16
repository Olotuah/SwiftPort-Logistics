export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:200ms]"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:400ms]"></span>
        </div>
      </div>
    </div>
  );
}