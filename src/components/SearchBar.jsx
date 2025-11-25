import useBookContext from "../contexts/BookContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useBookContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      navigate("/books");
    }
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search Books..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
