import {useRef, useState} from 'react';

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

const CreateBook = ({ onBookCreated }) => { // принимаем проп

    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [rating, setRating] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // берём первый выбранный файл
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
        formData.append('cover', imageFile); // поле должно совпадать с именем, которое ждёт Django
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
        const newBook = await response.json();  // получаем созданную книгу с сервера
        onBookCreated(newBook);

        setTitle('');
        setImageFile(null);
        setRating('');
        // Сбросим также поле файла в DOM (можно обнулить input через ref)
        document.getElementById('image').value = '';
    } else {
            const error = await response.json();
            alert('Ошибка: ' + JSON.stringify(error));
        }
    } catch (error) {
        alert('Ошибка сети: ' + error.message);
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
                  type="number"
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