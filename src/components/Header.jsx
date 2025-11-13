import { NavLink } from "react-router-dom";
import useBookContext from "../contexts/BookContext";

const Header = () => {
  const {searchTerm, handleSearch} = useBookContext();
  return (
  
  <header className="mb-2">
    <nav
      className="navbar navbar-expand-lg bg-light sticky-top shadow-sm"
    >
      <div className="container">
        <NavLink to="/" className="navbar-brand text-success fw-semibold fs-3">
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
          <div className="d-flex align-items-center ms-auto ms-lg-0 text-center">
           <input
              className="form-control "
              type="search"
              id="searchBooks"
              placeholder="Search Books"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            </div>

            <div className="d-flex align-items-center ms-auto ms-lg-0 justify-content-center text-center">
              <button className="btn btn-primary ms-3">
                Login
              </button>
            </div>
          <ul className="navbar-nav d-flex align-items-center ms-auto ms-lg-0 text-start">
           
            <li className="nav-item d-flex align-items-center">
              <NavLink className="nav-link active d-flex align-items-center" aria-current="page" to="/books">
                  Books
              </NavLink>
            </li>
            <li className="nav-item d-flex align-items-center">
             
              <NavLink to="/wishlist" className="nav-link active d-flex align-items-center">
               Wishlist 
                <img
                  src="/heart.svg"
                  alt="BookNest-Logo"
                  width={35}
                  className="img-fluid"
                  
                />
                
              </NavLink>
            </li>
            <li className="nav-item d-flex align-items-center">

              <NavLink className="nav-link active d-flex align-items-center" aria-current="page" to="/cart">
                Cart
                <img src="/cart.svg" alt="cart" width={25} className="img-fluid ms-1"/>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
)
}
export default Header;
