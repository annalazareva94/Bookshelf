import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const RatingZone = ({ rating, books }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `rating-${rating}`,
  });

  const style = {
    backgroundColor: isOver ? '#e0f7fa' : '#f5f5f5',
    minHeight: '100px',
    padding: '8px',
    margin: '8px 0',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>Рейтинг {rating}</h3>
      <div className="books-in-rating">
        {books.map(book => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
};

export default RatingZone;