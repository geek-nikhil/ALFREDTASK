import { useState } from "react";
import FlipCard from "./FlipCard";

const FlashcardsCarousel = ({ flashcards, onResponse }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleResponse = (cardId, response) => {
    onResponse(cardId, response); // Pass the response to the parent component
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next card
  };

  if (currentIndex >= flashcards.length) {
    return <p className="text-center text-xl">No more flashcards to review!</p>;
  }

  return (
    <div>
      <FlipCard
        card={flashcards[currentIndex]}
        onResponse={handleResponse}
      />
    </div>
  );
};

export default FlashcardsCarousel;