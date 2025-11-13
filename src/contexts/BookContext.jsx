import { createContext, useEffect, useContext, useState } from "react";
import useFetch from "../useFetch";

const BookContext = createContext();
const useBookContext = () => useContext(BookContext);


export function BookProvider({ children }) {
const { data, loading, error } = useFetch("https://booknest-backend-two.vercel.app/books");

const [searchTerm, setSearchTerm] = useState("");
const [filter, setFilter] = useState([])
const [category, setCategory] = useState([]);
const [sortOrder, setSortOrder] = useState("");
const [wishlist, setWishlist] = useState([]);
const [cart, setCart] = useState([])
const [rating, setRating] = useState(0);



useEffect(() => {
  if (!data) return;

  let filtered = category.length
    ? data.filter((book) => category.includes(book.category))
    : data;

  if (rating > 0) {
    filtered = filtered.filter((book) => book.rating >= rating);
  }

  if (sortOrder === "lowToHigh") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  if (searchTerm.trim() !== "") {
    filtered = filtered.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  

  setFilter(filtered);
}, [category, sortOrder, data, rating, searchTerm]);


function handleAddToWishlist(selectedBookId) {
  const selectedBook = data?.find((book) => book._id === selectedBookId);
  const isAlreadyInWishlist = wishlist.some(book => book._id === selectedBookId);
  
  if (selectedBook && !isAlreadyInWishlist) {
    
    setWishlist([...wishlist, selectedBook]);
    
  }
}

function handleAddtoCart(selectedBookId){

  const selectedBook = data?.find((book) => book._id === selectedBookId)
  const isAlreadyInCart = cart.some(book => book._id === selectedBookId);

  if (selectedBook && !isAlreadyInCart){
    setCart([...cart, { ...selectedBook, quantity: 1 }])
  }

}

const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};


function countBooksByCategory(categoryName) {
 return data?.filter(book => book.category === categoryName).length;
}


function categoryHandler(event){
    let value = event.target.value
    if (event.target.checked) {
      setCategory([...category, value])
    } else {
      setCategory(category.filter((category) => category != value))
    }
}


function removeFromWishlist(selectedBookId) {
    const updateWishlist = wishlist?.filter((book) => book._id !== selectedBookId)
    setWishlist(updateWishlist)
}

function deleteFromCart(selectedBookId) {
    const updateCart = cart?.filter((book) => book._id !== selectedBookId)
    setCart(updateCart)
}

function increaseQuantity(id) {
  const updatedCart = cart.map((book) =>
    book._id === id
      ? { ...book, quantity: book.quantity + 1 }
      : book
  );
  setCart(updatedCart);
}

function decreaseQuantity(id) {
  const updatedCart = cart.map((book) =>
    book._id === id
      ? { ...book, quantity: book.quantity - 1 }
      : book
  ).filter(book => book.quantity > 0);

  setCart(updatedCart);

}


function handleClearFilters() {
  setCategory([]);
  setSortOrder("");
  setFilter(data);
  setRating(0);
  setSearchTerm("")
}


return (
    <BookContext.Provider value={{ data: filter, loading, error, category, setCategory, countBooksByCategory, handleAddToWishlist, wishlist, removeFromWishlist, categoryHandler, rating, setRating, sortOrder, setSortOrder, handleClearFilters, handleAddtoCart, cart, deleteFromCart, increaseQuantity, decreaseQuantity, handleSearch, searchTerm, setSearchTerm }}>
      {children}
    </BookContext.Provider>
  );
}

export default useBookContext; 