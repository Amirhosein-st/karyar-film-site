import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import LogoutBtn from '../../Components/LogoutBtn/LogoutBtn';
import IconModal from '../../Components/IconModal/IconModal';
import UserIcon from '../../Components/UserIcon/UserIcon';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = JSON.parse(localStorage.getItem('Access-Token'));

      try {
        const userResponse = await axios.get('/api/user', {
          headers: {
            authorization: accessToken,
            "accept": "application/json"
          }
        });
        setUser(userResponse.data);
      } catch (error) {
        if (error.response.status === 401) {
          const refreshToken = JSON.parse(localStorage.getItem('Refresh-Token'));
          const formData = new URLSearchParams();
          formData.append('grant_type', 'refresh_token');
          formData.append('refresh_token', refreshToken);

          try {
            const response = await axios.post(
              'https://moviesapi.ir/oauth/token',
              formData,
              { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            localStorage.setItem('Access-Token', JSON.stringify(`Bearer ${response.data.access_token}`));
            localStorage.setItem('Refresh-Token', JSON.stringify(response.data.refresh_token));

            const fetchUserData = async () => {
              const accessToken = response.data.access_token;

              try {
                const userResponse = await axios.get('/api/user', {
                  headers: {
                    authorization: accessToken,
                    "accept": "application/json"
                  }
                });
                setUser(userResponse.data);
              } catch (error) {
                if (error.response.status === 401) {
                  const accessToken = JSON.parse(localStorage.getItem('Access-Token'));
                  try {
                    const userResponse = await axios.get('/api/user', {
                      headers: {
                        authorization: accessToken,
                        "accept": "application/json"
                      }
                    });
                    setUser(userResponse.data);
                  } catch (error) {
                    console.log(error);
                  }
                }
              }
            }

            fetchUserData();

          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      }
    };

    const fetchBookmarks = () => {
      const bookmarksData = JSON.parse(localStorage.getItem('bookmarks')) || [];
      setBookmarks(bookmarksData);
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchUserData(), fetchBookmarks()]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteBookmark = (index) => {
    const newBookmarks = [...bookmarks];
    newBookmarks.splice(index, 1);
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const handleIdMovie = (index) => {
    const newBookmarks = [...bookmarks];
    const selectedMovieId = newBookmarks[index].id;
    localStorage.setItem('selectedMovieId', selectedMovieId);

    navigate('/FilmDetailsPage');
  };
  const handleIdMovie2 = (index) => {
    const selectedAddedMovieId = AddedMovies[index].id;
    localStorage.setItem('selectedMovieId', selectedAddedMovieId);

    navigate('/FilmDetailsPage');
  };

  const openIconModal = () => {
    setIsIconModalOpen(true);
  };

  const closeIconModal = () => {
    setIsIconModalOpen(false);
  };

  const handleSelectIcon = (iconId) => {
    localStorage.setItem('User-Icon', iconId);
  };

  const AddedMovies = JSON.parse(localStorage.getItem('Added-Movies')) || [];

  return (
    <div className="profile-page-back">
      <h1 className='profile-page-h1'>User Profile</h1>
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
        <div className='profile-page'>
          <h2>User Detail</h2>
          <div className="user-info">
            <div className='UserIcon-ProfilePage'><UserIcon /></div>
            <p>Your ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Your Account Created At: {user.created_at}</p>
            {/* <p>Updated At: {user.updated_at}</p> */}
            <LogoutBtn />
            <button className="User-Icon" onClick={openIconModal}>
              Change Icon
            </button>
          </div>
          <h3>Bookmarked Movies</h3>
          <div className="bookmarks">
            <ul>
              {bookmarks.map((movie, index) => (
                <li key={index}>
                  <span className='movie-name-profile' onClick={() => handleIdMovie(index)}>{index + 1}. {movie.title}</span>
                  <button className='movie-delete-profile' onClick={() => handleDeleteBookmark(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <h3>Added Movies</h3>
          <div className="AddedMovies">
            <ul>
              {AddedMovies.map((movie, index) => (
                <li key={index}>
                  <span className='movie-name-profile' onClick={() => handleIdMovie2(index)}>{index + 1}. {movie.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <IconModal
        isOpen={isIconModalOpen}
        onClose={closeIconModal}
        onSelectIcon={handleSelectIcon} />

    </div>
  );
};

export default ProfilePage;