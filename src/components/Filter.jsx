import useBookContext from "../contexts/BookContext";

const Filter = () => {
  const {
    categoryHandler,
    category,
    sortOrder,
    setSortOrder,
    handleClearFilters,
    rating,
    setRating,
  } = useBookContext();
  return (
    <div>
      <h3 className="d-flex justify-content-between">
        Filters
        <button onClick={handleClearFilters} className="btn btn-outline-danger">
          Clear
        </button>
      </h3>
      <div>
        <h5>Categories</h5>
        <input
          type="checkbox"
          value="Fiction"
          id="Fiction"
          className="me-2"
          checked={category.includes("Fiction")}
          onChange={categoryHandler}
        />
        Fiction <br />
        <input
          type="checkbox"
          value="Non-Fiction"
          id="Non-Fiction"
          className="me-2"
          checked={category.includes("Non-Fiction")}
          onChange={categoryHandler}
        />
        Non-Fiction <br />
        <input
          type="checkbox"
          value="Self-Help"
          id="Self-Help"
          className="me-2"
          checked={category.includes("Self-Help")}
          onChange={categoryHandler}
        />
        Self-Help <br />
        <input
          type="checkbox"
          value="Fantasy"
          id="Fantasy"
          className="me-2"
          checked={category.includes("Fantasy")}
          onChange={categoryHandler}
        />
        Fantasy <br />
        <input
          type="checkbox"
          value="Business"
          id="Business"
          className="me-2"
          checked={category.includes("Business")}
          onChange={categoryHandler}
        />
        Business <br />
        <hr />
        <h6 className="fw-bold">⭐ Minimum Rating: {rating}+</h6>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <hr />
        <h5>Sort By Price</h5>
        <input
          type="radio"
          name="price"
          id="lowToHigh"
          checked={sortOrder === "lowToHigh"}
          value="lowToHigh"
          onChange={(e) => setSortOrder(e.target.value)}
        />{" "}
        Price - Low to High <br />
        <input
          type="radio"
          name="price"
          id="highToLow"
          checked={sortOrder === "highToLow"}
          value="highToLow"
          onChange={(e) => setSortOrder(e.target.value)}
        />{" "}
        Price - High to Low <br />
      </div>
    </div>
  );
};

export default Filter;
