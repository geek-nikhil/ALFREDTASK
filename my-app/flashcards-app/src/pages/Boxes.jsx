import { useEffect, useState } from "react";
import axios from "axios";

const Boxes = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchAllFlashcards = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        setFlashcards(response.data);
      } catch (error) {
        alert("Error fetching flashcards");
      }
    };
    fetchAllFlashcards();
  }, []);

  // Group flashcards by box
  const flashcardsByBox = flashcards.reduce((acc, card) => {
    const box = card.box;
    if (!acc[box]) {
      acc[box] = [];
    }
    acc[box].push(card);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Flashcards by Box</h2>
      {Object.keys(flashcardsByBox).map((box) => (
        <div key={box} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Box {box}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcardsByBox[box].map((card) => (
              <div
                key={card._id}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-lg"
              >
                <h4 className="text-lg font-bold mb-2">{card.question}</h4>
                <p className="text-gray-400">{card.answer}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Next Review: {new Date(card.nextReviewDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Boxes;