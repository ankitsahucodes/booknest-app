import FeaturedCategories from "../components/FeaturedCategories";

export default function HomePage() {

  return (
    <>
      <section className="text-center py-4">
        <div className="container">
          <h1 className="display-4 fw-bold pb-3">Welcome to BookNest</h1>
          <img
            src="https://plus.unsplash.com/premium_photo-1681488394409-5614ef55488c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1364"
            alt="Books image"
            className="img-fluid rounded mb-4 shadow"
            width={950}
          />
          <h2 className="display-6 fw-bold">Discover Your Next Great Read</h2>
          <p className="lead">
            Explore our vast collection of books across all genres.
          </p>
        </div>
      </section>

      <FeaturedCategories />
    </>
  );
}
