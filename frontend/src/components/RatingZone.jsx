import React, {useEffect, useState} from 'react';
import { useDroppable } from '@dnd-kit/core';
import BookItem from "./BookItem.jsx";

const RatingZone = ({ name, rating, books, onNameChange }) => {
  const { setNodeRef } = useDroppable({
    id: rating,
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
            <BookItem key={book.id} book={book} fromRatingId={rating} />
        ))}
      </div>
    </div>
  );
};

export default RatingZone;