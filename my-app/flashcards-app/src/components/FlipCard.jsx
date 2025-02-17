import { useState } from "react";

const FlipCard = ({ card, onResponse }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (response) => {
    onResponse(card._id, response); // Pass the response to the parent component
    setIsFlipped(false); // Reset flip state for the next card
  };

  return (
    <div
      className="flip-card w-64 h-96 mx-auto cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`flip-card-inner w-full h-full transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of the card */}
        <div className="flip-card-front w-full h-full bg-blue-500 text-white flex items-center justify-center p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center">{card.question}</h3>
        </div>

        {/* Back of the card */}
        <div className="flip-card-back w-full h-full bg-green-500 text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
          <p className="text-lg mb-4 text-center">{card.answer}</p>
          <div className="flex space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent flip when clicking buttons
                handleResponse("right");
              }}
              className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Got it right
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent flip when clicking buttons
                handleResponse("wrong");
              }}
              className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Got it wrong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;