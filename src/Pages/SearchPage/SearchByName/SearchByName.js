import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./SearchByName.css";

function SearchByName() {
    const [searchInput, setSearchInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [allPages, setAllPages] = useState(1);
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

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const searchMovies = async () => {
        setLoading(true);
        const response = await axios.get(`https://moviesapi.ir/api/v1/movies?q=${searchInput}&page=${page}`);
        setMovies(response.data.data);
        setLoading(false);
    };

    const handleSearchButtonClick = async (e) => {
        e.preventDefault();
        setPage(1);
        setLoading(true);
        const response = await axios.get(`https://moviesapi.ir/api/v1/movies?q=${searchInput}&page=${page}`);
        setMovies(response.data.data);
        setCurrentPage(parseInt(response.data.metadata.current_page));
        setAllPages(parseInt(response.data.metadata.page_count));
        setLoading(false);

        if (response.data.data.length === 0) {
            seterror('No movies found');
        } else {
            seterror('');
        }
    };

    const handleMovieClick = (id) => {
        localStorage.setItem('selectedMovieId', id);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        searchMovies();
    };

    return (
        <div className='SearchByName-back'>
            <h1>Search By Name</h1>
            <form>
                <input type="text" value={searchInput} onChange={handleSearchInputChange} placeholder="Search by movie name" />
                <button onClick={handleSearchButtonClick}>Search Movies</button>
            </form>
            <div className='error'>{error}</div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='film-details-search-back'>
                        {movies.map((movie) => (
                            <div className="film-details-search" key={movie.id} onClick={() => handleMovieClick(movie.id)}>
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
                        ))}
                    </div>

                    <div className='pagination-search'>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                            Previous
                        </button>
                        <span>
                            {page} / {allPages}
                        </span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={currentPage === allPages}>Next</button>
                    </div>

                </>
            )}
        </div>
    );
}

export default SearchByName;