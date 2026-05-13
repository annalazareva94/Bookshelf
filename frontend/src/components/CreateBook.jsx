import React from 'react'
import {useRef, useState} from 'react';

// django requires this token to protect against CSRF attacks during POST requests.
// Without it, the server will not accept the form.
const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

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
        alert('Введите корректный рейтинг');
        return;
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('general_rating', ratingNumber);

    if (imageFile) {
        formData.append('cover', imageFile); // the field must match the name django is expecting
    }

    try {
        const csrftoken = getCookie('csrftoken');
        const response = await fetch('/api/books/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRFToken': csrftoken,
          },
        body: formData,
    });

    if (response.ok) {
        const newBook = await response.json();  // getting created book from server
        onBookCreated(newBook);
        setTitle('');
        setImageFile(null);
        setRating('');
        document.getElementById('image').value = '';
    } else {
            const error = await response.json();
            alert('Error: ' + JSON.stringify(error));
        }
    } catch (error) {
        alert('Error network: ' + error.message);
        }
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