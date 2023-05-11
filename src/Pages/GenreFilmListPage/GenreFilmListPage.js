import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Components/css s/loading.css';
import useBookmarks from '../../Components/bookmark/useBookmarks';
import AutoSlider from '../../Components/AutoSlider/AutoSlider';

const GenreFilmListPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('currentPage') || 1)
  );
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarks, handleBookmarkClick] = useBookmarks();

  const handleMovieClick = (id) => {
    localStorage.setItem('selectedMovieId', id);
  };

  const fetchMovies = async (page) => {
    setLoading(true);
    let fetchedMovies = [];
  
    try {
      const genre = localStorage.getItem('NumberGenre');
  
      const response = await axios.get(
        `https://moviesapi.ir/api/v1/genres/${genre}/movies?page=${page}`
      );
      fetchedMovies = response.data.data;
      setMovies(fetchedMovies);
      setCurrentPage(parseInt(response.data.metadata.current_page));
      setTotalPages(response.data.metadata.page_count);
  
      localStorage.setItem('currentPage', response.data.metadata.current_page);
  
    } catch (error) {
      console.log(error);
    }
  
    setLoading(false);
    return fetchedMovies; // Return the fetched movies here
  };

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    const pageToLoad = storedPage ? parseInt(storedPage) : 1;
    fetchMovies(pageToLoad).then((responseMovies) => {
      const newCards = responseMovies.slice(0, 10).map((movie) => ({
        image: movie.poster,
      }));
      setCards(newCards);
    });
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    const pageToLoad = storedPage ? parseInt(storedPage) : 1;
    fetchMovies(pageToLoad);
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const namegenre = localStorage.getItem('NameGenre');

  const handlePagination = (page) => {
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const maxPagesToShow = 5;
    const middlePage = Math.floor(maxPagesToShow / 2);

    const startIndex = Math.max(currentPage - middlePage - 1, 0);
    const endIndex = Math.min(startIndex + maxPagesToShow, totalPages);

    return (
      <div>
        <button
          onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.slice(startIndex, endIndex).map((page) => (
          <button
            key={page}
            onClick={() => handlePagination(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            handlePagination(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="film-list-page">
      <h1>{namegenre} movies list page</h1>
      <div className="GenreFilmListPage-slider">
        <AutoSlider cards={cards}/>
      </div>
      <div className='bottom-filmList'>
        <div className="pagination">
          {renderPagination()}
        </div>
        <div className="film-list">
          {loading ? (
            <div className="progress">
              <div className="track">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
          ) : (
            movies.map((movie) => (
              <div className="film-detailss" key={movie.id} onClick={() => handleMovieClick(movie.id)} >
                <Link to="/FilmDetailsPage" >
                  <p>ID: {movie.id}</p>
                  <p>Title: {movie.title}</p>
                  <img src={movie.poster} alt={movie.title} />
                  <p>Year: {movie.year}</p>
                  <p>Country: {movie.country}</p>
                  <p>IMDb Rating: {movie.imdb_rating}</p>
                  <p>Genres: {movie.genres.join(', ')}</p>
                </Link>
                <button id='bookmark-filmlist' className={bookmarks.some((b) => b.id === movie.id)
                  ? 'bookmark-yellow'
                  : 'bookmark'} onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(movie.id, movie.title);
                  }}> Bookmark </button>
                {/* {movie.images && movie.images.map(index) => ( <img key={index} src={image} alt={`Scre{index + 1}`} /> ))} */}
              </div>

            ))
          )}
        </div>
      </div>÷
    </div>
  );
};

export default GenreFilmListPage;