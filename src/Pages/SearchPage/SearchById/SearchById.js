import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./SearchById.css";

function SearchById() {
    const [movie, setMovie] = useState(null);
    const [movieId, setMovieId] = useState('');
    const [error, seterror] = useState('');
    const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks') || '[]'));

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
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const handleMovieIdChange = (e) => {
        setMovieId(e.target.value);
    };

    const handleSearchButtonClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://moviesapi.ir/api/v1/movies/${movieId}`);
            setMovie(response.data);
            seterror('');
        } catch (error) {
            if (error.response.status === 404) {
                seterror('No movies found');
            }
        }
    };

    const handleMovieClick = (id) => {
        localStorage.setItem('selectedMovieId', id);
    };

    return (
        <div className='SearchById-back'>
            <h1>Search By ID</h1>
            <form>
                <input className='search-by-id-input' type="text" placeholder="Search by movie Id" value={movieId} onChange={handleMovieIdChange} />
                <button className='search-by-id-button' onClick={handleSearchButtonClick}>Search Movie</button>
            </form>
            <div className='error'>{error}</div>
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
                    <button id='bookmark-search' className={bookmarks.some((b) => b.id === movie.id) ? 'bookmark-yellow' : 'bookmark'} onClick={(e) => { e.stopPropagation(); handleBookmarkClick(movie.id, movie.title); }}>Bookmark</button>
                </div>
            )}
        </div>
    );
}

export default SearchById;