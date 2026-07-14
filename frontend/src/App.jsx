import React from 'react'
import { useEffect, useState } from "react"
import CreateBook from "./components/CreateBook.jsx";
import BookList from "./components/BookList.jsx";
import TemplateBookshelf from "./components/TemplateBookshelf.jsx";
import { arrayMove } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';


const App = () => {
    // Function to bootstrap from localStorage (runs once)
    const getInitialTemplate = () => {
        const saved = localStorage.getItem('bookshelfTemplate');
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (e) {
            console.error('Error localStorage', e);
          }
        }
        // Default template if there is nothing in localStorage
        return {
          ratings: [
            { id: 5, name: 'Rating 5', rating: 5, books: [] },
            { id: 4, name: 'Rating 4', rating: 4, books: [] },
            { id: 3, name: 'Rating 3', rating: 3, books: [] },
            { id: 2, name: 'Rating 2', rating: 2, books: [] },
            { id: 1, name: 'Rating 1', rating: 1, books: [] },
          ]
        };
    };

    const [books, setBooks] = useState([])
    const [template, setTemplate] = useState(getInitialTemplate);

    const handleDragEnd = (event) => {
        //event is a packet of information about the drag and drop. From it, we extract:
        //active — that they were dragging (the book)
        //over - the zone where they were dropped
      const { active, over } = event;
      if (!over) return;

      const activeData = active.data.current;
      if (!activeData || !activeData.book) return;

      const book = activeData.book;
      const fromRatingId = activeData.fromRatingId; // number if the book is from the zone, otherwise undefined
      const toRatingId = over.id; //id of the zone where it was dropped

      if (!template) return;

      // target zone index
      const toRatingIndex = template.ratings.findIndex(r => r.id === toRatingId);
      if (toRatingIndex === -1) return;

        // If the book is already in the target zone, do nothing
      if (template.ratings[toRatingIndex].books.some(b => b.id === book.id)) return;

      // create a copy of the shelf to modify it
      let newRatings = [...template.ratings];

      // if the book was from a different zone, we delete it from there
      if (fromRatingId !== undefined) {
        const fromRatingIndex = template.ratings.findIndex(r => r.id === fromRatingId);
        if (fromRatingIndex !== -1) {
          newRatings[fromRatingIndex] = {
            ...newRatings[fromRatingIndex],
            books: newRatings[fromRatingIndex].books.filter(b => b.id !== book.id),
          };
        }
      }
      // if the book was from library, we delete it from there
      else {
        setBooks(prevBooks => prevBooks.filter(b => b.id !== book.id));
      }

      // adding the book to the new zone
      newRatings[toRatingIndex] = {
        ...newRatings[toRatingIndex],
        books: [...newRatings[toRatingIndex].books, book],
      };

      // updating the template
      setTemplate({ ...template, ratings: newRatings });
    };


    //a list of books taking into account those in the rating zone
    // useEffect(() => {
    //     fetch("/api/books/")
    //     .then(res => res.json())
    //     .then(allBooks => {
    //       // all the book IDs that are already in any template zone
    //       const usedBookIds = new Set();
    //       if (template && template.ratings) {
    //         template.ratings.forEach(rating => {
    //           rating.books.forEach(book => usedBookIds.add(book.id));
    //         });
    //       }
    //         // we leave only those books that are not yet in any rating zone.
    //       const availableBooks = allBooks.filter(book => !usedBookIds.has(book.id));
    //       setBooks(availableBooks);
    //     })
    //     .catch(error => console.error("Error:", error));
    // }, []);

    useEffect(() => {
        // saved list of books from localStorage
        const savedBooks = localStorage.getItem('booksList');
        let allBooks = [];
        if (savedBooks) {
            try {
                allBooks = JSON.parse(savedBooks);
            } catch (e) {
                console.error('Ошибка парсинга books из localStorage', e);
            }
        }

        // filter out books that are already in the rankings
        const usedBookIds = new Set();
        if (template && template.ratings) {
            template.ratings.forEach(rating => {
                rating.books.forEach(book => usedBookIds.add(book.id));
            });
        }
        const availableBooks = allBooks.filter(book => !usedBookIds.has(book.id));
        setBooks(availableBooks);
    }, []); // dependency on the template is not needed, as it is already loaded during the initial render.

    // save the template in localStorage on each change
    useEffect(() => {
        if (template) {
          localStorage.setItem('bookshelfTemplate', JSON.stringify(template));
        } else {
          localStorage.removeItem('bookshelfTemplate');
        }
    }, [template]);

    // Function for adding new book to the common list in localStorage
    const addBook = (newBook) => {
        const bookWithId = { ...newBook, id: Date.now() };
        setBooks(prevBooks => {
            const updatedBooks = [...prevBooks, bookWithId];
            localStorage.setItem('booksList', JSON.stringify(updatedBooks));
            return updatedBooks;
        });
    };

    // Function for deleting the book from the localStorage
    const deleteBook = (book) => {
        setBooks(prevBooks => {
            const updatedBooks = prevBooks.filter(b => b.id !== book.id);
            localStorage.setItem('booksList', JSON.stringify(updatedBooks));
            return updatedBooks;
        });
    };

    // function for updating a template (for example, after dragging)
    const updateTemplate = (newTemplate) => {
        setTemplate(newTemplate);
    };

    const removingBookFromRating = (book, ratingId) => {
        const ratingIndex = template.ratings.findIndex(r => r.id === ratingId);
        if (ratingIndex === -1) return;

        const newRatings = [...template.ratings];
        newRatings[ratingIndex] = {
        ...newRatings[ratingIndex],
        books: newRatings[ratingIndex].books.filter(b => b.id !== book.id)
        };

        setTemplate({ ...template, ratings: newRatings });

        setBooks(prevBooks => [...prevBooks, book]);
}

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="app">
                <div className='shelf-block'>
                    <TemplateBookshelf
                        template={template}
                        onUpdateTemplate={updateTemplate}
                        onRemoveBook = {removingBookFromRating}
                    />
                    <div className='library-block'>
                        <h1>Library</h1>
                        <CreateBook onBookCreated={addBook} />
                        <BookList books={books} onDeleteBook={deleteBook} />
                    </div>
                </div>
            </div>
        </DndContext>
  )
}

export default App