import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Boxes from "./pages/Boxes";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/boxes" element={<Boxes />} />
      </Routes>
    </Router>
  );
};

export default App;