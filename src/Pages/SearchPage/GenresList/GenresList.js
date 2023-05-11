import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./GenresList.css";

function GenresList() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        setIsLoading(true);
        const response = await axios.get('https://moviesapi.ir/api/v1/genres');
        setGenres(response.data);
        setIsLoading(false);
    };

    const handleClick = (id, name) => {
        setSelectedGenre(id, name);
        localStorage.setItem('NumberGenre', id);
        localStorage.setItem('NameGenre', name);
        localStorage.removeItem('currentPage');
    };

    return (
        <>
            {isLoading ? (
                <div className="progress" style={{ direction: "ltr" }}>
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
                <div className='search-genre'>
                    <h1>Genres</h1>
                    <ul className=''>
                        {genres.map((genre) => (
                            <Link key={genre.id} to="/GenreFilmListPage">
                                <li onClick={() => handleClick(genre.id, genre.name)}>
                                    {genre.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

            )}
        </>
    )
}

export default GenresList;