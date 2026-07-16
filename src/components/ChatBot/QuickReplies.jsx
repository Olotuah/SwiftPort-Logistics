const questions = [
  "📦 Track my package",
  "💰 Shipping rates",
  "🌍 International shipping",
  "📍 Office locations",
  "📞 Talk to support",
];

export default function QuickReplies({ sendMessage }) {
  return (
    <div className="mt-6">

      <p className="text-xs text-gray-500 mb-3">
        Suggested Questions
      </p>

      <div className="flex flex-wrap gap-2">

        {questions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="text-sm border px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            {q}
          </button>
        ))}

      </div>

    </div>
  );
}