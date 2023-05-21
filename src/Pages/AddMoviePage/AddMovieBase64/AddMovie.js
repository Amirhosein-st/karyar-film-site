import React, { useState } from 'react';
import axios from 'axios';
import './AddMovie.css'; 
import localStorageService from '../../../Services/LocalStorage/localStorageService';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [imdbRating, setImdbRating] = useState('');
  const [imdbVotes, setImdbVotes] = useState('');
  const [poster, setPoster] = useState('');
  const [message, setMessage] = useState('');

  const addedMovies = localStorageService.getItem('Added-Movies') || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/movies', {
        title: title,
        imdb_id: imdbId,
        country: country,
        year: year,
        director: director,
        imdb_rating: imdbRating,
        imdb_votes: imdbVotes,
        poster: poster
      });

      console.log(response.data);

      setTitle('');
      setImdbId('');
      setCountry('');
      setYear('');
      setDirector('');
      setImdbRating('');
      setImdbVotes('');
      setPoster('');
      setMessage('Movie added successfully!');

      const newMovie = { id: response.data.id, title: response.data.title };
      const updatedMovies = [...addedMovies, newMovie];
      localStorageService.setItem('Added-Movies', updatedMovies);

    } catch (err) {
      setMessage('Error adding movie. Please try again.');
    }
  };

  return (
    <div className="add-movie-page">
      <h1>Add Movie / Base64 Method</h1>
      <form onSubmit={handleSubmit} className="add-movie-form">

        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="add-movie-input" />

        <input type="text" placeholder="IMDB ID" value={imdbId} onChange={(e) => setImdbId(e.target.value)} required className="add-movie-input" />

        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required className="add-movie-input" />

        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required className="add-movie-input" />

        <input type="text" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} className="add-movie-input"/>

        <input type="text" placeholder="IMDB Rating" value={imdbRating} onChange={(e) => setImdbRating(e.target.value)} className="add-movie-input"/>
        
        <input type="text" placeholder="IMDB Votes" value={imdbVotes} onChange={(e) => setImdbVotes(e.target.value)} className="add-movie-input" />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPoster(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }}
          className="add-movie-input"
        />

        <button type="submit" className="add-movie-button">Add Movie</button>
      </form>
      {message && <p className="add-movie-message" style={{fontSize:("1.5vw") , color:("green")}}>{message}</p>}
    </div>
  );
};

export default AddMovie;