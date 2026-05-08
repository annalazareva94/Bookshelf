import React from 'react'
import RatingZone from './RatingZone';


const TemplateBookshelf = ({template, onUpdateTemplate}) => {

    if (!template) {
        return null
    }

    // function for rating renaming. returns rating with the new name
    const handleNameChange = (rating, newName) => {
        const updatedRatings = template.ratings.map((ratingItem) =>
          ratingItem.rating.id === rating
            ? { ...ratingItem, name: newName }
            : ratingItem
        );
        onUpdateTemplate({ ...template, ratings: updatedRatings });
      };

    return (
        <div className="template-shelf">
          {template.ratings.map((ratingItem, index) => (
            <RatingZone
              key={ratingItem.id}
              rating={ratingItem.id}
              books={ratingItem.books}
              name={ratingItem.name}
              onNameChange={handleNameChange}
            />
          ))}
        </div>
    )
}

export default TemplateBookshelf