import React from 'react'
import { useEffect, useState } from "react"
import CreateBook from "./components/CreateBook.jsx";
import BookList from "./components/BookList.jsx";
import TemplateBookshelf from "./components/TemplateBookshelf.jsx";
import TemplateButton from "./components/TemplateButton.jsx";
import {DndContext} from '@dnd-kit/core';


const App = () => {
    const [books, setBooks] = useState([])
    const [template, setTemplate] = useState(null);

    const handleDragEnd = (event) => {
      const { active, over } = event;
      if (!over) return; // бросили не в зону

      const book = active.data.current?.book;
      if (!book) return;

      // Извлекаем рейтинг из id зоны (например, "rating-5")
      const ratingId = over.id;
      const rating = parseInt(ratingId.split('-')[1], 10);
      if (isNaN(rating)) return;

      // Проверяем, есть ли шаблон
      if (!template) return;

      // Находим индекс зоны с таким рейтингом
      const ratingIndex = template.ratings.findIndex(r => r.rating === rating);
      if (ratingIndex === -1) return;

      // Проверяем, нет ли уже такой книги в этой зоне
      if (template.ratings[ratingIndex].books.some(b => b.id === book.id)) return;

      // Создаём новый массив с добавленной книгой
      const newRatings = [...template.ratings];
      newRatings[ratingIndex] = {
        ...newRatings[ratingIndex],
        books: [...newRatings[ratingIndex].books, book],
      };

      // Обновляем шаблон
      updateTemplate({ ...template, ratings: newRatings });
    };

    useEffect(() => {
        // http://localhost:8000 should be removed! it's  a temporary measure
        fetch("http://localhost:8000/api/books/")
            .then(res => res.json())
            .then(data => {
            setBooks(data)
    })
        .catch(error => console.error("Error:", error))
    }, [])


    // Загружаем шаблон из localStorage при монтировании
    useEffect(() => {
        const saved = localStorage.getItem('bookshelfTemplate');
        if (saved) {
          setTemplate(JSON.parse(saved));
        }
    }, []);

    // Сохраняем шаблон в localStorage при каждом изменении
    useEffect(() => {
        if (template) {
          localStorage.setItem('bookshelfTemplate', JSON.stringify(template));
        } else {
          localStorage.removeItem('bookshelfTemplate');
        }
    }, [template]);

    // Function for adding new book to the list
    const addBook = (newBook) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
    };

    const createTemplate = () => {
        const newTemplate = {
          ratings: [
            { rating: 5, books: [] },
            { rating: 4, books: [] },
            { rating: 3, books: [] },
            { rating: 2, books: [] },
            { rating: 1, books: [] },
          ],
        };
        setTemplate(newTemplate);
    };

    const clearTemplate = () => {
        setTemplate(null);
    };

    // Функция для обновления шаблона (например, после перетаскивания)
    const updateTemplate = (newTemplate) => {
        setTemplate(newTemplate);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="app">
                <div className='shelf-block'>
                    <h1>Fast template</h1>
                    <TemplateButton onClick={createTemplate}>
                        Create template
                    </TemplateButton>
                    {template && (
                      <TemplateButton onClick={clearTemplate}>
                        Clear template
                      </TemplateButton>
                    )}

                    <TemplateBookshelf template={template} onUpdateTemplate={updateTemplate} />
                </div>
                <div className='library-block'>
                    <h1>Library</h1>
                    <CreateBook onBookCreated={addBook} />
                    <BookList books={books} />
                </div>
            </div>
        </DndContext>
  )
}

export default App