import { NavLink } from "react-router-dom";
import useBookContext from "../contexts/BookContext";
import SearchBar from "./SearchBar";

const Header = () => {
  const { wishlistBooks, cart } =
    useBookContext();

  return (
    <header className="mb-2">
      <nav className="navbar navbar-expand-lg bg-light sticky-top shadow-sm">
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand text-success fw-semibold fs-3"
          >
            <img src="/logo.svg" alt="BookNest-Logo" width="100" height="50" />
            BookNest
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-lg-end justify-content-start"
            id="navbarNav"
          >
            <div>
              <SearchBar />
            </div>

            <ul className="navbar-nav ms-auto ms-lg-0 text-start">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  title="home"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/books"
                  title="books"
                >
                  Books
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className="nav-link position-relative"
                  title="Wishlist"
                >
                  <span
                    className="position-relative d-inline-block"
                    style={{ display: "inline-block" }}
                  >
                    <img
                      src="/heart.svg"
                      alt="wishlist"
                      width={30}
                      className="img-fluid"
                    />
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.70rem", padding: "4px 6px" }}
                    >
                      {wishlistBooks?.length > 0 ? wishlistBooks?.length : ""}
                    </span>
                  </span>
                </NavLink>
              </li>

              <li className="nav-item me-3">
                <NavLink
                  to="/cart"
                  className="nav-link position-relative"
                  title="cart"
                >
                  <span className="position-relative d-inline-block">
                    <img
                      src="/cart.svg"
                      alt="cart"
                      width={25}
                      className="img-fluid"
                    />
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem", padding: "4px 6px" }}
                    >
                      {cart?.length > 0
                        ? cart.reduce((acc, curr) => acc + curr.quantity, 0)
                        : ""}
                    </span>
                  </span>
                </NavLink>
              </li>

              <li className="nav-item d-flex align-items-center">
                <NavLink to="/profile" title="profile">
                  <span className="position-relative d-inline-block">
                    <img
                      src="/userLogo.svg"
                      width={28}
                      alt="profile"
                      className="img-fluid"
                    />
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
