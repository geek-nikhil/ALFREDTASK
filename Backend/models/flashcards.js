import mongoose from "mongoose";
const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true, // Every card must have a question
  },
  answer: {
    type: String,
    required: true, // Every card must have an answer
  },
  box: {
    type: Number,
    default: 1, // Start in Box 1
    min: 1, // Minimum box number
    max: 5, // Maximum box number
  },
  nextReviewDate: {
    type: Date,
    default: Date.now, // Default to the current date
  },
  createdAt: {
    type: Date,
    default: Date.now, // Track when the card was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Track when the card was last updated
  },
});

// Update the `updatedAt` field before saving the document
cardSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the model
const Card = mongoose.model("Card", cardSchema);

export default Card;