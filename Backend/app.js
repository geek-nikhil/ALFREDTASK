import express from "express";
import db from "./db.js"; // Import the database connection
import cors from "cors";
import  flashcardsRoutes from "./routes/flashcards.js"; // Import the flashcards routes
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Database connection
db(); // Connect to the database
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/flashcards", flashcardsRoutes); // Use the flashcards routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});