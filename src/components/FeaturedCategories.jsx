import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const { countBooksByCategory } = useBookContext();

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Business",
    "Fantasy",
    "Self-Help",
  ];
  return (
    <section className="container pb-5 mb-5">
      <h2 className="pb-4">Featured Categories</h2>

      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-md-4" key={category}>
            <Link
              to={`/books/category/${category}`}
              className="text-decoration-none"
            >
              <div className="card d-flex align-items-center justify-content-center p-5 col mx-3">
                <div className="card-body">
                  <h3 className="card-title">{category}</h3>
                  <p className="lead text-muted text-center">
                    {countBooksByCategory(category)}{" "}
                    {countBooksByCategory(category) <= 1 ? "Book" : "Books"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
