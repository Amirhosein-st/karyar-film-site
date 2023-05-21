import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import localStorageService from '../../Services/LocalStorage/localStorageService';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        setEmailError('Type Your Email');
      } else {
        setEmailError('');
      }

      if (!password) {
        setPasswordError('Type Your Password');
      } else {
        setPasswordError('');
      }

      if (!emailError && !passwordError) {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', email);
        formData.append('password', password);

        const requestOptions = {
          method: 'POST',
          url: 'https://moviesapi.ir/oauth/token',
          data: formData,
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        };

        const response = await axios(requestOptions);

        if (response.data && response.data.access_token) {
          localStorageService.setItem('Access-Token', `Bearer ${response.data.access_token}`);
          localStorageService.setItem('Refresh-Token', response.data.refresh_token);

          const userResponse = await axios.get('/api/user', {
            headers: {
              authorization: `Bearer ${response.data.access_token}`,
              accept: 'application/json'
            }
          });

          localStorageService.setItem('User-Name', userResponse.data.name);

          navigate('/HomePage');
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="ContainerLogin">
      <form onSubmit={handleSubmit} className="ContainerLogin-form">
        <h1 className="ContainerLogin-form-h1">Welcome back to our Movie Website!</h1>
        <h2 className="ContainerLogin-form-h2">
          Please enter your login information below to access your account:
        </h2>

        <input className="ContainerLogin-form-input" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <div className="error-email-login">{emailError}</div>}

        <input className="ContainerLogin-form-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <div className="error-password-login">{passwordError}</div>}

        <button className="ContainerLogin-form-submit" type="submit"> Login </button>

        <h3 className="ContainerLogin-form-h3">
          If you don't have an account yet, please click the
          <Link to="/SignupPage" className="ContainerLogin-form-Sginup"> Sign Up </Link>
          link to create one.
        </h3>
        
        <h4 className="ContainerLogin-form-h4">Thank you for using our website!</h4>
      </form>
    </div>
  );
}

export default LoginPage;
