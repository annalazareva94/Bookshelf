import React from 'react'
import BookItem from "./BookItem.jsx";
import RemoveButton from './RemoveButton';


const BookList = ({ books, onDeleteBook }) => {

    return (
        <div className="book-list">
          {books.length === 0 ? (
            <p>Let's add new books!</p>
          ) : (
            books.map(book =>
                <div key={book.id} className="book-item-wrapper">
                    <BookItem book={book} />
                    <RemoveButton onClick={() => onDeleteBook(book)} />
                </div>
            )
          )}
        </div>
    );
}

export default BookList