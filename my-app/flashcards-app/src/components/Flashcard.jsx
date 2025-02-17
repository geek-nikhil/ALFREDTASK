import { useState } from "react";

const Flashcard = ({ card, onResponse }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4">
      <h3 className="text-xl font-bold mb-4">{card.question}</h3>
      {showAnswer && <p className="mb-4">{card.answer}</p>}
      <div className="flex space-x-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button
          onClick={() => onResponse(card._id, "right")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Got it right
        </button>
        <button
          onClick={() => onResponse(card._id, "wrong")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Got it wrong
        </button>
      </div>
    </div>
  );
};

export default Flashcard;