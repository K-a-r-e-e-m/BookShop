import React, { useState } from 'react';
import { fetchBooks } from '../../util/http.js';
import LoadingIndicator from '../../UI/LoadingIndicator.jsx';
import ErrorPage from '../../UI/ErrorPage.jsx';
import BookCard from './BookCard.jsx';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from 'react-redux';
import './Shop.css';
import './Pagination.css';
import { ToastContainer } from 'react-toastify';

function Shop() {
   
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20; // Set the number of books per page

  // Fetch existing books
  const { data: books, isError, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const cartItems = useSelector((state) => state.cart.items || []);
  const wishListItem = useSelector((state) => state.wishlist.items || []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    let errorMessage = "Failed to load books. Please try again later.";
    let errorTitle = "Failed to Load Books";

    if (error?.message) {
      try {
        const parsedError = JSON.parse(error.message);
        errorTitle = `Error ${parsedError.status}`;
        errorMessage = `${parsedError.statusText}: ${parsedError.info}`;
      } catch {
        errorMessage = error.message;
      }
    }

    return <ErrorPage title={errorTitle} message={errorMessage} />;
  }

  const cartItemsMap = new Map(cartItems.map(item => [item.book_id, item]));
  const formattedWishListItems = new Map(wishListItem.map(item => [item.book_id, item]));

  // Combine books with cart and wishlist status
  const booksStatus = books.map(book => {
    const cartItem = cartItemsMap.get(book.id);
    const isInWishList = formattedWishListItems.has(book.id);

    return {
      ...book,
      isInCart: !!cartItem,
      quantityInCart: cartItem?.quantity || 0,
      cartItemId: cartItem?.id || null,
      isInWishList: isInWishList,
      wishListId: isInWishList ? formattedWishListItems.get(book.id).id : null,
    };
  });
  console.log(booksStatus);

  // Pagination logic
  const totalPages = Math.ceil(booksStatus.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = booksStatus.slice(startIndex, endIndex);

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  return (
    <section className="new section" id="new">
      <h2 className="section__title">New Books</h2>
      <ToastContainer />
      <div className="new__container container">
        
        {currentBooks.map((book) => (
          
          <BookCard
            key={book.id}
            imgSrc={book.image}
            title={book.title}
            discountPrice={book.discountPrice}
            originalPrice={book.price}
            rating={book.rating}
            shopId={book.id}
            shopDes={book.description}
            isInCart={book.isInCart}
            cart_item_id={book.cartItemId}
            isInWishList={book.isInWishList}
            wishListId={book.wishListId}
          />
         
        ))}
        
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination__prev"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination__info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination__next"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Shop;
