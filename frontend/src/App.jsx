import { useEffect, useState } from "react"
import CreateBook from "./components/CreateBook.jsx";
import BookList from "./components/BookList.jsx";

const App = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("/api/books/")
            .then(res => res.json())
            .then(data => {
            setBooks(data)
    })
        .catch(error => console.error("Error:", error))
    }, [])

    // Function for adding new book to the list
    const addBook = (newBook) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
    };


    return (
        <div className="app">
            <h1>Library</h1>
            <CreateBook onBookCreated={addBook} />
            <BookList books={books} />
        </div>
  )
}

export default App