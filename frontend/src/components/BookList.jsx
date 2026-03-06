import React from 'react'
import BookItem from "./BookItem.jsx";


const BookList = ({ books }) => {

    return (
        <div className="book-list">
          {books.length === 0 ? (
            <p>Пока нет книг</p>
          ) : (
            books.map(book => <BookItem key={book.id} book={book} />)
          )}
        </div>
    );
}

export default BookList