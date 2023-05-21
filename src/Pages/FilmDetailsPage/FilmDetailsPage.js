import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './FilmDetailsPage.css';
import '../../Components/css s/loading.css'
import useBookmarks from '../../Components/bookmark/useBookmarks';
import localStorageService from '../../Services/LocalStorage/localStorageService';

const FilmDetailsPage = () => {
  const [filmDetails, setFilmDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { title } = useParams();
  const [bookmarks, handleBookmarkClick] = useBookmarks();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const selectedMovieId = localStorageService.getItem('selectedMovieId');
        const response = await axios.get(`https://moviesapi.ir/api/v1/movies/${selectedMovieId}`);
        setFilmDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Error loading film details. Please try again later.');
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, []);

  useEffect(() => {
    if (filmDetails.title) {
      const urlTitle = filmDetails.title.replace(/ /g, '-');
      window.history.replaceState(null, '', `/FilmDetailsPage/FilmName:${urlTitle}`);
    }
  }, [filmDetails]);

  return (
    <div className="film-details">
      <h1>Film Details: {filmDetails.title} - {filmDetails.year}</h1>
      <div className="film-list film-list2">
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
          <div className='film-detailss' id='film-detail'>
            <p><strong>ID:</strong> {filmDetails.id}</p>
            <p><strong>Title:</strong> {filmDetails.title}</p>
            <img src={filmDetails.poster} alt={filmDetails.title} />
            <p><strong>Year:</strong> {filmDetails.year}</p>
            <p><strong>rated:</strong> {filmDetails.rated}</p>
            <p><strong>released:</strong> {filmDetails.released}</p>
            <p><strong>Time:</strong> {filmDetails.runtime}</p>
            <p><strong>director:</strong> {filmDetails.director}</p>
            <p><strong>writer:</strong> {filmDetails.writer}</p>
            <p><strong>actors:</strong> {filmDetails.actors}</p>
            <p><strong>plot:</strong> {filmDetails.plot}</p>
            <p><strong>country:</strong> {filmDetails.country}</p>
            <p><strong>awards:</strong> {filmDetails.awards}</p>
            <p><strong>metascore:</strong> {filmDetails.metascore}</p>
            <p><strong>imdb_rating:</strong> {filmDetails.imdb_rating}</p>
            <p><strong>imdb_votes:</strong> {filmDetails.imdb_votes}</p>
            <p><strong>imdb_id:</strong> {filmDetails.imdb_id}</p>
            <p><strong>type:</strong> {filmDetails.type}</p>
            <p><strong>Genres:</strong> {filmDetails.genres}</p>
            {filmDetails.images && filmDetails.images.map((image, index) => (
              <img key={index} src={image} alt={`Screenshot ${index + 1}`} />
            ))}
            <button id='bookmark-filmlist' className={bookmarks.some((b) => b.id === filmDetails.id) ? 'bookmark-yellow' : 'bookmark'} onClick={(e) => { e.stopPropagation(); handleBookmarkClick(filmDetails.id, filmDetails.title); }} >
              Bookmark </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmDetailsPage;
