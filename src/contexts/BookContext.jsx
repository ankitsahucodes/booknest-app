import { createContext, useEffect, useContext, useState } from "react";
import useFetch from "../useFetch";
import { toast } from "react-toastify";

const BookContext = createContext();
const useBookContext = () => useContext(BookContext);

export function BookProvider({ children }) {
  const {
    data: allBooks,
    loading,
    error,
  } = useFetch("https://booknest-backend-webapp.vercel.app/books");

  const userId = "692002971799d55f258db410";

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [rating, setRating] = useState(0);

  const wishlistBooks = allBooks
    ? allBooks.filter((book) => wishlist.includes(book._id))
    : [];

  const cartFull = allBooks
    ? allBooks
        .filter((book) => cart.some((item) => item.bookId === book._id))
        .map((book) => ({
          ...book,
          quantity: cart.find((item) => item.bookId === book._id).quantity,
        }))
    : [];

  useEffect(() => {
    if (!allBooks) return;

    let filtered = category.length
      ? allBooks.filter((book) => category.includes(book.category))
      : allBooks;

    if (rating > 0) {
      filtered = filtered.filter((book) => book.rating >= rating);
    }

    if (sortOrder === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.some((a) =>
            a.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilter(filtered);
  }, [category, sortOrder, allBooks, rating, searchTerm]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch(`https://booknest-backend-webapp.vercel.app/wishlist/${userId}`);
        const wishListData = await res.json();
        setWishlist(wishListData);
      } catch (error) {
        console.log("Failed to load wishlist:", error);
      }
    }

    fetchWishlist();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`https://booknest-backend-webapp.vercel.app/cart/${userId}`);
        const cartData = await res.json();
        setCart(cartData);
      } catch (error) {
        console.log("Failed to fetch cart items:", error);
      }
    }

    fetchCart();
  }, []);

  async function handleAddToWishlist(bookId) {
    try {
      const res = await fetch(`https://booknest-backend-webapp.vercel.app/wishlist/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const updated = await res.json();
      setWishlist(updated);
      toast("📦 Moved to Wishlist");
    } catch (error) {
      console.log("Add to wishlist error:", error);
      toast.error("Failed to add to wishlist");
    }
  }

  async function handleAddToCart(bookId) {
    try {
      const res = await fetch(`https://booknest-backend-webapp.vercel.app/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, quantity: 1 }),
      });

      const updated = await res.json();
      setCart(updated);
      toast.success("🛒 Added to Cart!");
    } catch (error) {
      console.log("Add to cart error:", error);
      toast.error("Failed to add to cart");
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  function countBooksByCategory(categoryName) {
    return allBooks?.filter((book) => book.category === categoryName).length;
  }

  const totalMrp = cartFull?.reduce(
    (acc, curr) => acc + curr.mrp * curr.quantity,
    0
  );
  const total = cartFull?.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const totalItems = cartFull?.reduce((acc, curr) => acc + curr.quantity, 0);
  const deliveryCharges = total >= 500 ? 0 : 50;
  const totalAmount = total + deliveryCharges;
  const discount = cartFull?.reduce(
    (acc, curr) => acc + (curr.mrp - curr.price) * curr.quantity,
    0
  );

  function categoryHandler(event) {
    let value = event.target.value;
    if (event.target.checked) {
      setCategory([...category, value]);
    } else {
      setCategory(category.filter((category) => category != value));
    }
  }

  async function removeFromWishlist(bookId) {
    try {
      const res = await fetch(`https://booknest-backend-webapp.vercel.app/wishlist/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const updated = await res.json();
      setWishlist(updated);
      toast.warn("💔 Removed from Wishlist");
    } catch (error) {
      console.log("Remove wishlist error:", error);
      toast.error("Failed to remove from wishlist");
    }
  }

  async function deleteFromCart(bookId) {
    try {
      const res = await fetch(`https://booknest-backend-webapp.vercel.app/cart/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const updated = await res.json();
      setCart(updated);
      toast.warn("❌ Removed from Cart");
    } catch (error) {
      console.log("Remove cart error:", error);
      toast.error("Failed to remove from cart");
    }
  }

  async function increaseQuantity(bookId) {
    try {
      const res = await fetch(`https://booknest-backend-webapp.vercel.app/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, quantity: 1 }),
      });

      const updated = await res.json();
      setCart(updated);
      toast("🔼 Quantity Increased");
    } catch (error) {
      console.log("Increase error:", error);
      toast.error("Failed to increase quantity");
    }
  }

  async function decreaseQuantity(bookId) {
    try {
      const res = await fetch(`https://booknest-backend-webapp.vercel.app/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, quantity: -1 }),
      });

      const updated = await res.json();
      setCart(updated);

      const item = updated.find((i) => i.bookId === bookId);

      if (!item) {
        toast.error("❌ Removed from Cart");
      } else if (item.quantity < 1) {
        toast.error("❌ Removed from Cart");
      } else {
        toast("🔽 Quantity Decreased");
      }
    } catch (error) {
      console.log("Decrease error:", error);
      toast.error("Failed to decrease quantity");
    }
  }

  function handleClearFilters() {
    setCategory([]);
    setSortOrder("");
    setFilter(allBooks);
    setRating(0);
    setSearchTerm("");
  }

  return (
    <BookContext.Provider
      value={{
        data: filter,
        allBooks,
        loading,
        error,
        category,
        setCategory,
        countBooksByCategory,
        handleAddToWishlist,
        wishlistBooks,
        removeFromWishlist,
        categoryHandler,
        rating,
        setRating,
        sortOrder,
        setSortOrder,
        handleClearFilters,
        handleAddToCart,
        cart,
        setCart,
        cartFull,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        handleSearch,
        searchTerm,
        setSearchTerm,
        totalMrp,
        total,
        totalItems,
        deliveryCharges,
        totalAmount,
        discount,
        userId,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default useBookContext;
