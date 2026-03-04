const BookList = ({ books }) => {

    return (
        <div className="book-list">
          {books.length === 0 ? (
            <p>Пока нет книг</p>
          ) : (
            books.map(book => (
              <div key={book.id} className="book-item">
                {book.cover && <img src={book.cover} alt={book.title} width="100" />}
                <h3>{book.title}</h3>
                <p>Rating: {book.general_rating}</p>
              </div>
            ))
          )}
        </div>
    );
}

export default BookList