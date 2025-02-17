import express from "express";
import Card from "../models/flashcards.js"; // Import the Card model
import { getReviewInterval } from "../utils/helper.js"; // Import the helper function

const router = express.Router();

// Route: Create a new flashcard
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validate input
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    // Create a new flashcard
    const newCard = new Card({ question, answer });
    await newCard.save();

    // Respond with the created flashcard
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating flashcard", error: error.message });
  }
});

// Route: Fetch flashcards due for review
router.get("/due", async (req, res) => {
  try {
    // Find flashcards where nextReviewDate is today or earlier
    const dueCards = await Card.find({
      nextReviewDate: { $lte: new Date() },
    });

    // Respond with the due flashcards
    res.status(200).json(dueCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching due flashcards", error: error.message });
  }
});

// Route: Update a flashcard's box and next review date
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body; // "right" or "wrong"

    // Validate input
    if (!response || (response !== "right" && response !== "wrong")) {
      return res.status(400).json({ message: "Response must be 'right' or 'wrong'" });
    }

    // Find the flashcard by ID
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    // Update the box based on the response
    card.box = response === "right" ? card.box + 1 : 1;

    // Calculate the next review date
    const interval = getReviewInterval(card.box); // Get the review interval for the new box
    card.nextReviewDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000); // Add days to the current date

    // Save the updated flashcard
    await card.save();

    // Respond with the updated flashcard
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error updating flashcard", error: error.message });
  }
});

// Route: Delete a flashcard
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the flashcard by ID
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    // Respond with the deleted flashcard
    res.status(200).json(deletedCard);
  } catch (error) {
    res.status(500).json({ message: "Error deleting flashcard", error: error.message });
  }
});

// Route: Fetch all flashcards (for debugging or admin purposes)
router.get("/", async (req, res) => {
  try {
    const flashcards = await Card.find();
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flashcards", error: error.message });
  }
});

export default router;