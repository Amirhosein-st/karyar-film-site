import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import localStorageService from './Services/LocalStorage/localStorageService';

import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import HomePage from './Pages/HomePage/HomePage';
import FilmListPage from './Pages/FilmListPage/FilmListPage';
import FilmDetailsPage from './Pages/FilmDetailsPage/FilmDetailsPage';
import GenreFilmListPage from './Pages/GenreFilmListPage/GenreFilmListPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import FirstPage from './Pages/FirstPage/FirstPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import AddMovieMainPage from './Pages/AddMoviePage/AddMovieMainPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import Header from './Components/Header - Footer = Site/Header';
import Footer from './Components/Header - Footer = Site/Footer';
import FooterII from './Components/Header - Footer = LS/FooterII';
import HeaderPro from './Components/Header - Footer = Pro/HeaderPro';
import FooterPro from './Components/Header - Footer = Pro/FooterPro';

function App() {
  
  const Token = localStorageService.getItem('Access-Token');

  return (
    <BrowserRouter>
      <Routes>
        {Token ? (
          <>
            <Route path="/" element={
                <HeaderFooterLS>
                  <FirstPage />
                </HeaderFooterLS>
              } />

            <Route path="*" element={
                <HeaderFooterLS>
                  <NotFoundPage />
                </HeaderFooterLS>
              } />

            <Route path="/ProfilePage" element={
                <HeaderFooterProfile>
                  <ProfilePage />
                </HeaderFooterProfile>
              } />

            <Route path="/HomePage" element={
                <HeaderFooterSite>
                  <HomePage />
                </HeaderFooterSite>
              } />

            <Route path="/FilmListPage" element={
                <HeaderFooterSite>
                  <FilmListPage />
                </HeaderFooterSite>
              } />

            <Route path="/FilmDetailsPage" element={
                <HeaderFooterSite>
                  <FilmDetailsPage />
                </HeaderFooterSite>
              } />

            <Route path="/GenreFilmListPage" element={
                <HeaderFooterSite>
                  <GenreFilmListPage />
                </HeaderFooterSite>
              } />

            <Route path="/SearchPage" element={
                <HeaderFooterSite>
                  <SearchPage />
                </HeaderFooterSite>
              } />

            <Route path="/AddMovieMainPage" element={
                <HeaderFooterSite>
                  <AddMovieMainPage />
                </HeaderFooterSite>
              } />
          </>
        ) : (
          <>
            <Route path="/" element={
                <HeaderFooterLS>
                  <FirstPage />
                </HeaderFooterLS>
              } />

            <Route path="*" element={
                <HeaderFooterLS>
                  <NotFoundPage />
                </HeaderFooterLS>
              } />

            <Route path="/SignupPage" element={
                <HeaderFooterLS>
                  <SignupPage />
                </HeaderFooterLS>
              } />

            <Route path="/LoginPage" element={
                <HeaderFooterLS>
                  <LoginPage />
                </HeaderFooterLS>
              } />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

function HeaderFooterSite({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
function HeaderFooterLS({ children }) {
  return (
    <>
      {children}
      <FooterII />
    </>
  );
}
function HeaderFooterProfile({ children }) {
  return (
    <>
      <HeaderPro />
      {children}
      <FooterPro />
    </>
  );
}

export default App;