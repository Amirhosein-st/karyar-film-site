import { useState, useEffect } from 'react';
import localStorageService from '../../Services/LocalStorage/localStorageService';
import './bookmark.css';

const useBookmarks = () => {
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

  return [bookmarks, handleBookmarkClick];
};

export default useBookmarks;
