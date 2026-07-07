import React from 'react'
import {useRef, useState} from 'react';

const CreateBook = ({ onBookCreated }) => {

    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [rating, setRating] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const ratingNumber = parseFloat(rating);

    if (isNaN(ratingNumber)) {
        alert('Enter a valid rating');
        return;
    }

        const newBook = {
            title: title.trim(),
            general_rating: ratingNumber,
        };

        const coverDataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });

        newBook.cover = coverDataUrl;

        onBookCreated(newBook);
        setTitle('');
        setImageFile(null);
        setRating('');
    };


    return (
        <form
            className='form-add-book'
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="title">Book name</label>
                <input
                    className='text-input'
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                    id="image"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            <div>
                <label htmlFor="image">General rating</label>
                <input
                    className='number-input'
                  type="number"
                  min="0.00"
                  max="10.00"
                  step="0.5"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
            </div>

            <button type="submit">Add new book</button>
        </form>
    )
}

export default CreateBook