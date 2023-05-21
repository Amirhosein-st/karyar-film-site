import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        setEmailError('Type your Email');
      } else {
        setEmailError('');
      }

      if (!name) {
        setNameError('Type your Name');
      } else {
        setNameError('');
      }

      if (!password) {
        setPasswordError('Type your Password');
      } else {
        setPasswordError('');
      }

      if (!emailError && !passwordError && !nameError) {
        const response = await axios.post('/api/v1/register', {
          email,
          password,
          name
        });

        if (response.data) {
          navigate('/LoginPage');
        }

      }

    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className='ContainerSignup'>
      <form onSubmit={handleSubmit} className="ContainerSignup-form">
        <h1 className='ContainerSignup-form-h1'>Welcome to our Movie Website!</h1>
        <h2 className='ContainerSignup-form-h2'>Please fill out the form below to create your account:</h2>

        <input className='ContainerSignup-form-input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <div className='error'>{emailError}</div>}
        
        <input className='ContainerSignup-form-input' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {nameError && <div className='error'>{nameError}</div>}

        <input className='ContainerSignup-form-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <div className='error'>{passwordError}</div>}

        <button type="submit" className='ContainerSignup-form-submit'>Signup</button>

        <h3 className='ContainerSignup-form-h3'>If you already have an account, please click the
          <Link to="/LoginPage" className='ContainerSignup-form-Sginup'> Login</Link> 
          link to access it.
        </h3>
        
        <h4 className='ContainerSignup-form-h4'>Thank you for choosing our website!</h4>
      </form>

    </div>
  );
}

export default SignupPage;