import React from 'react'
import RatingZone from './RatingZone';


const TemplateBookshelf = ({template, updateTemplate}) => {

    if (!template) {
        return null
    }

    return (
        <div className="template-shelf">
          {template.ratings.map((ratingItem, index) => (
            <RatingZone
              key={ratingItem.rating}
              rating={ratingItem.rating}
              books={ratingItem.books}
            />
          ))}
        </div>
    )
}

export default TemplateBookshelf