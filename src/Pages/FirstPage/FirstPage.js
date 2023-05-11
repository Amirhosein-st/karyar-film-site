import React from 'react';
import { Link } from 'react-router-dom';
import "./FirstPage.css";
import LogoutBtn from "../../Components/LogoutBtn/LogoutBtn";

function FirstPage() {

  const userName = JSON.parse(localStorage.getItem('User-Name'));
  const Token = JSON.parse(localStorage.getItem('Access-Token'));


  if (Token && userName) {
    return (
      <div className='Container-Firstpage-Logedin-back'>
        <div className='Container-Firstpage-Logedin'>
          <h1 className='Container-Firstpage-Logedin-h1'>Hiii {userName}</h1>
          <h2 className='Container-Firstpage-Logedin-h2'>
            Welcome back!
            We're so glad to see you again.</h2>
          <div>
            <Link to='/ProfilePage'>
              <button className='Container-Firstpage-Logedin-btn-ProfilePage' >
                Go To Profile Page</button>
            </Link>
            <Link to='/HomePage'>
              <button className='Container-Firstpage-Logedin-btn-DashboardPage'>
                Go To Home Page</button>
            </Link>
          </div>
          <LogoutBtn />
        </div>
      </div>
    );
  } else {
    return (
      <div className='Container-Firstpage-Logeout-back'>
        <div className='Container-Firstpage-Logeout'>
          <h1 className='Container-Firstpage-Logeout-h1'>Hello human, Why aren't you logged in?</h1>
          <h2 className='Container-Firstpage-Logeout-h2'>Select an entry way to access our Movie Site.</h2>
          <Link to='/SignupPage'>
            <button className='Container-Firstpage-Logedin-btn-SignupPage'>SignupPage</button>
          </Link>
          <Link to='/LoginPage'>
            <button className='Container-Firstpage-Logedin-btn-LoginPage'>LoginPage</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FirstPage;