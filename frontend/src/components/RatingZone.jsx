import React, {useEffect, useState} from 'react';
import { useDroppable } from '@dnd-kit/core';
import BookItem from "./BookItem.jsx";
import RemoveButton from "./RemoveButton.jsx";

const RatingZone = ({ name, rating, books, onNameChange, onRemoveBook }) => {
  const { setNodeRef } = useDroppable({
    id: rating,
    data: { type: 'zone', ratingId: rating },
  });

  const [text, setNewName] = useState(name);

  //the function is called when the user finishes editing - removes focus from the element
  const handleBlur = (e) => {
    const newText = e.currentTarget.textContent;
    if (newText !== text) {
      setNewName(newText);
      onNameChange?.(rating, newText);
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    };

  useEffect(() => {
      setNewName(name);
    }, [name]);

  return (
    <div ref={setNodeRef}>
      <h3
          contentEditable="true"
          onBlur={handleBlur}
          suppressContentEditableWarning={true}
          onKeyDown={handleKeyDown}
      >
        {text}
      </h3>
      <div className="books-in-rating">
        {books.map(book => (
            <div className="book-container">
                <BookItem
                    key={book.id}
                    book={book}
                    fromRatingId={rating}
                    inZone={true}
                    onRemoveBook={onRemoveBook}
                />
                <RemoveButton
                  onClick={() => onRemoveBook(book, rating)}
                />
            </div>
        ))}
      </div>
    </div>
  );
};

export default RatingZone;