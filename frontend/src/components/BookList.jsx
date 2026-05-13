import React from 'react'
import BookItem from "./BookItem.jsx";


const BookList = ({ books }) => {

    return (
        <div className="book-list">
          {books.length === 0 ? (
            <p>Let's add new books!</p>
          ) : (
            books.map(book => <BookItem key={book.id} book={book} />)
          )}
        </div>
    );
}

export default BookList