import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const { countBooksByCategory } = useBookContext();
  

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Romance",
    "Psychology",
    "Spirituality",
    "Fantasy",
    "Biography",
    "Business & Finance",
    "Self-Help",
    "Notebook",
  ];
  return (
    <section className="container pb-5">
      <h3 className="pb-4 mt-5 text-success-emphasis text-center">
        Featured Categories
      </h3>

      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-6 col-sm-6 col-md-4" key={category}>
            <Link
              to={`/books/category/${category}`}
              className="text-decoration-none"
            >
              <div
                className="card h-100 d-flex align-items-center justify-content-center p-3"
                style={{
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body">
                  <h3 className="card-title fs-5">{category}</h3>
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
