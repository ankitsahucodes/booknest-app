import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx'
import BooksListing from './pages/BooksListing.jsx';
import { BookProvider } from './contexts/BookContext.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';


const router = createBrowserRouter([
{
  path:"/",
  element: <App/>
},
{
  path:"/books",
  element: <BooksListing/>
},
{
  path:"/books/category/:bookCategory",
  element: <BooksListing/>
},{
  path: "/books/:bookId",
  element: <BookDetails/>
},{
  path: "/wishlist",
  element: <Wishlist />
},{
  path: "/cart",
  element: <Cart />
},
{
  path: "/checkout",
  element: <Checkout />
}

]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
        <RouterProvider router={router} />
    </BookProvider>
  </StrictMode>,
)
