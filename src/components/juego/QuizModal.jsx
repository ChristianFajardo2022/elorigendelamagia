export default function QuizModal({ question, onAnswer }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-30 rounded-3xl">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <div className="font-bold mb-4">{question.q}</div>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className="block w-full text-left mb-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
