import React from 'react';
import "./UserIcon.css";

const UserIcon = () => {

  const userIconI = `userIcon-${parseInt(localStorage.getItem('User-Icon'))}`;

  return <div className="user-icon" id={userIconI} ></div>;
};

export default UserIcon;
