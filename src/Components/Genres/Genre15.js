import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import localStorageService from '../../Services/LocalStorage/localStorageService';

const Genre15 = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowMoreClick = () => {
    localStorageService.setItem('NumberGenre', 15);
    localStorageService.setItem('NameGenre', 'Animation');
    localStorageService.removeItem('currentPage');
  };

  const handleMovieClick = (id) => {
    localStorageService.setItem('selectedMovieId', id);
  };

  const fetchMovies = async () => {
    const response = await axios.get(`https://moviesapi.ir/api/v1/genres/15/movies?page=`);
    setMovies(response.data.data);
    setCurrentPage(parseInt(response.data.metadata.current_page));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const moviesToShow = movies.slice(0, 7);

  return (
    <>
      {isLoading ? (
          <></>
      ) : (
        <div className="film-list-page-Genre">
          <div className="film-list-Genre">
            <div className="film-details-Genre-Genre-name"><p>Genre: Animation</p></div>
            {moviesToShow.map((movie) => (

              <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <Link to="/FilmDetailsPage" className="film-details-Genre">
                  <p>ID: {movie.id}</p>
                  <p title={movie.title}>Title: {movie.title}</p>
                  <img src={movie.poster} alt={movie.title} className="poster-Genre" />
                  <p title={movie.year}>Year: {movie.year}</p>
                  <p title={movie.country}>Country: {movie.country}</p>
                  <p title={movie.imdb_rating}>IMDb Rating: {movie.imdb_rating}</p>
                  <p title={movie.genres}>Genres: {movie.genres.join(', ')}</p>
                </Link>
              </div>

            ))}
            <Link to="/GenreFilmListPage" className="film-details-Genre-show-more" onClick={handleShowMoreClick}>
              <div title='15'>
                <p className='film-details-Genre-show-more-p'>Show More</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Genre15;