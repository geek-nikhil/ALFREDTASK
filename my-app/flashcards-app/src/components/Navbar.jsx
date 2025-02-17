import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Flashcard App
        </Link>
        <div>
          <Link to="/review" className="mr-4 hover:text-gray-400">
            Review
          </Link>
          <Link to="/boxes" className="hover:text-gray-400">
            Boxes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;