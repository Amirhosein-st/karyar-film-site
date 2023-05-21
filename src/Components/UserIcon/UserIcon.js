import React from 'react';
import "./UserIcon.css";
import localStorageService from '../../Services/LocalStorage/localStorageService';

const UserIcon = () => {

  const userIconI = `userIcon-${parseInt(localStorageService.getItem('User-Icon'))}`;

  return <div className="user-icon" id={userIconI} ></div>;
};

export default UserIcon;