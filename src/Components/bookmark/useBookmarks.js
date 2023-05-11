import { useState, useEffect } from 'react';

const useBookmarks = () => {
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

  return [bookmarks, handleBookmarkClick];
};

export default useBookmarks;