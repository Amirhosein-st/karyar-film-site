import React, { useState } from 'react';
import axios from 'axios';

const AddMovie2 = () => {
  const [title, setTitle] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [imdbRating, setImdbRating] = useState('');
  const [imdbVotes, setImdbVotes] = useState('');
  const [poster, setPoster] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('imdb_id', imdbId);
      formData.append('country', country);
      formData.append('year', year);
      formData.append('director', director);
      formData.append('imdb_rating', imdbRating);
      formData.append('imdb_votes', imdbVotes);
      formData.append('poster', poster);

      const response = await axios.post('https://moviesapi.ir/api/v1/movies/multi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      setTitle('');
      setImdbId('');
      setCountry('');
      setYear('');
      setDirector('');
      setImdbRating('');
      setImdbVotes('');
      setPoster(null);
      setMessage('Movie added successfully!');

      const addedMovie = {
        id: response.data.id,
        title: response.data.title
      };
  
      const existingMovies = JSON.parse(localStorage.getItem('Added-Movies')) || [];
      const updatedMovies = [...existingMovies, addedMovie];
      localStorage.setItem('Added-Movies', JSON.stringify(updatedMovies));

    } catch (err) {
      setMessage('Error adding movie. Please try again.');
    }
  };

  return (
    <div className="add-movie-page">
      <h1>Add Movie / Multipart Method</h1>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="IMDB ID"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <input
          type="text"
          placeholder="IMDB Rating"
          value={imdbRating}
          onChange={(e) => setImdbRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="IMDB Votes"
          value={imdbVotes}
          onChange={(e) => setImdbVotes(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setPoster(file);
          }}
        />
        <button type="submit">Add Movie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMovie2;
