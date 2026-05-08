import React from 'react'
import { useDraggable } from '@dnd-kit/core';


const BookItem = ({ book, fromRatingId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `book-${book.id}`,
    data: { book, fromRatingId: fromRatingId },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="book-item"
    >
      {book.cover && <img src={book.cover} alt={book.title} width="100" />}
      <h3>{book.title}</h3>
      <p>Rating: {book.general_rating}</p>
    </div>
  );
};

export default BookItem