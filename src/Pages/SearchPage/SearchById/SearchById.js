import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./SearchById.css";
import localStorageService from '../../../Services/LocalStorage/localStorageService';

function SearchById() {
    const [movie, setMovie] = useState(null);
    const [movieId, setMovieId] = useState('');
    const [error, seterror] = useState('');
    const [bookmarks, setBookmarks] = useState(localStorageService.getItem('bookmarks') || []);

    const handleBookmarkClick = (id, title) => {
        const index = bookmarks.findIndex((b) => b.id === id);
        if (index === -1) {
            setBookmarks([...bookmarks, { id, title }]);
        } else {
            const updatedBookmarks = [...bookmarks];
            updatedBookmarks.splice(index, 1);
            setBookmarks(updatedBookmarks);
        }
    };

    useEffect(() => {
        localStorageService.setItem('bookmarks', bookmarks);
    }, [bookmarks]);

    const handleMovieIdChange = (e) => {
        const value = e.target.value;
        setMovieId(value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            try {
               const response = await axios.get(`https://moviesapi.ir/api/v1/movies/${movieId}`);
                setMovie(response.data);
                seterror('');

                if (response.data.data.length > 2) {
                    setMovie("");
                    seterror('');
                }

            } catch (error) {
                if (error.response.status === 404) {
                    seterror('No movies found');
                    setMovie("");
                }
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
        };

    }, [movieId]);

    const handleMovieClick = (id) => {
        localStorageService.setItem('selectedMovieId', id);
    };

    return (
        <div className='SearchById-back'>
            <h1>Search By ID</h1>
                <input className='search-by-id-input' type="text" placeholder="Search by movie Id" value={movieId} onChange={handleMovieIdChange} />
            <div className='error' style={{paddingTop:("1vmax")}}>{error}</div>
            {movie && (
                <div id='film-details-search' className="film-details-search" key={movie.id} onClick={() => handleMovieClick(movie.id)} >
                    <Link to="/FilmDetailsPage" key={movie.id}>
                        <p>ID: {movie.id}</p>
                        <p title={movie.title}>Title: {movie.title}</p>
                        <img src={movie.poster} alt={movie.title} className="poster-Genre" />
                        <p title={movie.year}>Year: {movie.year}</p>
                        <p title={movie.country}>Country: {movie.country}</p>
                        <p title={movie.imdb_rating}>IMDb Rating: {movie.imdb_rating}</p>
                        <p title={movie.genres}>Genres: {movie.genres ? movie.genres.join(', ') : ''}</p>
                    </Link>
                    <button id='bookmark-search' className={bookmarks.some((b) => b.id === movie.id) ? 'bookmark-yellow' : 'bookmark'} onClick={(e) => { e.stopPropagation(); handleBookmarkClick(movie.id, movie.title); }}> Bookmark </button>
                </div>
            )}
        </div>
    );
}

export default SearchById;