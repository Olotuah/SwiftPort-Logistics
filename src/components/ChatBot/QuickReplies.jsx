const questions = [
  "📦 Track my shipment",
  "🌍 International Shipping",
  "💰 Shipping Quote",
  "🏢 Perth Office",
  "📞 Customer Support"
];

export default function QuickReplies({ sendMessage }) {
  return (
    <div className="mt-5">

      <p className="text-xs text-gray-500 mb-3">
        Quick Questions
      </p>

      <div className="flex flex-wrap gap-2">

        {questions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="px-4 py-2 rounded-full border text-sm hover:bg-blue-600 hover:text-white transition"
          >
            {q}
          </button>
        ))}

      </div>

    </div>
  );
}