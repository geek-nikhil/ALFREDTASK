import { useEffect, useState } from "react";
import axios from "axios";
import FlashcardsCarousel from "../components/FlashcardsCarousel";

const Review = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchDueCards = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/due`);
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching due cards:", error);
      }
    };
    fetchDueCards();
  }, []);

  const handleResponse = async (cardId, response) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}update/${cardId}`, { response });
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Review Flashcards</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards due for review today.</p>
      ) : (
        <FlashcardsCarousel flashcards={flashcards} onResponse={handleResponse} />
      )}
    </div>
  );
};

export default Review;