import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import './Components/bookmark/bookmark.css';

import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import HomePage from './Pages/DashboardPage/HomePage';
import FilmListPage from './Pages/FilmListPage/FilmListPage';
import FilmDetailsPage from './Pages/FilmDetailsPage/FilmDetailsPage';
import GenreFilmListPage from './Pages/GenreFilmListPage/GenreFilmListPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import FirstPage from './Pages/FirstPage/FirstPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import AddMovieMainPage from './Pages/AddMoviePage/AddMovieMainPage';
import Header from './Components/Header - Footer = Site/Header';
import Footer from './Components/Header - Footer = Site/Footer';
import FooterII from './Components/Header - Footer = LS/FooterII';
import HeaderPro from './Components/Header - Footer = Pro/HeaderPro';
import FooterPro from './Components/Header - Footer = Pro/FooterPro';

function App() {
  
  const Token = JSON.parse(localStorage.getItem('Access-Token'));

  return (
    <BrowserRouter>
      <Routes>
        {Token ? (
          <>
            <Route
              path="/"
              element={
                <HeaderFooterLS>
                  <FirstPage />
                </HeaderFooterLS>
              }
            />
            <Route
              path="*"
              element={
                <HeaderFooterLS>
                  <FirstPage />
                </HeaderFooterLS>
              }
            />
            <Route
              path="/ProfilePage"
              element={
                <HeaderFooterProfile>
                  <ProfilePage />
                </HeaderFooterProfile>
              }
            />
            <Route
              path="/HomePage"
              element={
                <HeaderFooterSite>
                  <HomePage />
                </HeaderFooterSite>
              }
            />
            <Route
              path="/FilmListPage"
              element={
                <HeaderFooterSite>
                  <FilmListPage />
                </HeaderFooterSite>
              }
            />
            <Route
              path="/FilmDetailsPage"
              element={
                <HeaderFooterSite>
                  <FilmDetailsPage />
                </HeaderFooterSite>
              }
            />
            <Route
              path="/GenreFilmListPage"
              element={
                <HeaderFooterSite>
                  <GenreFilmListPage />
                </HeaderFooterSite>
              }
            />
            <Route
              path="/SearchPage"
              element={
                <HeaderFooterSite>
                  <SearchPage />
                </HeaderFooterSite>
              }
            />
            <Route
              path="/AddMovieMainPage"
              element={
                <HeaderFooterSite>
                  <AddMovieMainPage />
                </HeaderFooterSite>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <HeaderFooterLS>
                  <FirstPage />
                </HeaderFooterLS>
              }
            />
            <Route
              path="*"
              element={
                <HeaderFooterLS>
                  <FirstPage />
                </HeaderFooterLS>
              }
            />
            <Route
              path="/SignupPage"
              element={
                <HeaderFooterLS>
                  <SignupPage />
                </HeaderFooterLS>
              }
            />
            <Route
              path="/LoginPage"
              element={
                <HeaderFooterLS>
                  <LoginPage />
                </HeaderFooterLS>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );

  // if (Token) {
  //   return (
  //     <BrowserRouter>
  //       <Routes>

  //         <Route path="*" element={<AllPages />} />
  //         <Route path="/" element={<AllPages />} />
          
  //         <Route path="/FirstPage" element={
  //           <HeaderFooterLS>
  //             <FirstPage />
  //           </HeaderFooterLS>}/>

  //         {/* <Route path="*" element={
  //           <HeaderFooterLS>
  //             <FirstPage />
  //           </HeaderFooterLS>}/>
  //         <Route path="/" element={
  //           <HeaderFooterLS>
  //             <FirstPage />
  //           </HeaderFooterLS>}/> */}
  
  //         <Route path="/ProfilePage" element={
  //           <HeaderFooterProfile>
  //             <ProfilePage />
  //           </HeaderFooterProfile>}
  //         />
  
  //         <Route path="/DashboardPage" element={
  //           <HeaderFooterSite>
  //             <DashboardPage />
  //           </HeaderFooterSite>
  //         } />
  
  //         <Route path="/FilmListPage" element={
  //           <HeaderFooterSite>
  //             <FilmListPage />
  //           </HeaderFooterSite>
  //         } />
  //         <Route path="/FilmDetailsPage" element={
  //           <HeaderFooterSite>
  //             <FilmDetailsPage />
  //           </HeaderFooterSite>
  //         } />
  //         <Route path="/GenreFilmListPage" element={
  //           <HeaderFooterSite>
  //             <GenreFilmListPage />
  //           </HeaderFooterSite>
  //         } />
  //         <Route path="/SearchPage" element={
  //           <HeaderFooterSite>
  //             <SearchPage />
  //           </HeaderFooterSite>
  //         } />
  //         <Route path="/AddMoviePage" element={
  //           <HeaderFooterSite>
  //             <AddMoviePage />
  //           </HeaderFooterSite>
  //         } />
  //         <Route path="/AddMoviePage2" element={
  //           <HeaderFooterSite>
  //             <AddMoviePage2 />
  //           </HeaderFooterSite>
  //         } />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // } else {
  //   return (
  //     <BrowserRouter>
  //       <Routes>

  //         <Route path="/" element={
  //           <HeaderFooterLS>
  //             <FirstPage />
  //           </HeaderFooterLS>}/>
  //         <Route path="*" element={
  //           <HeaderFooterLS>
  //             <FirstPage />
  //           </HeaderFooterLS>}/>

  //         <Route path="/SignupPage" element={
  //           <HeaderFooterLS>
  //             <SignupPage />
  //           </HeaderFooterLS>}/>

  //         <Route path="/LoginPage" element={
  //           <HeaderFooterLS>
  //             <LoginPage />
  //           </HeaderFooterLS>}/>

  //       </Routes>
  //     </BrowserRouter>
  //   );
  // }


  // return (
  //   <div className='Container-App'>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/FirstPage" element={
  //         <HeaderFooterLS>
  //           <FirstPage />
  //         </HeaderFooterLS>}
  //         />
  //         <Route path="*" element={<AllPages />} />
  //         {/* <Route path="*" element={<HeaderFooterLS><SignupPage /></HeaderFooterLS>}/> */}
  //         {/* <Route path="/" element={<HeaderFooterLS><SignupPage /></HeaderFooterLS>}/> */}
  //         <Route path="/SignupPage" element={
  //         <HeaderFooterLS>
  //           <SignupPage />
  //         </HeaderFooterLS>}
  //         />
  //         <Route path="/LoginPage" element={
  //         <HeaderFooterLS>
  //           <LoginPage />
  //         </HeaderFooterLS>}
  //         />

  //         <Route path="/ProfilePage" element={
  //         <HeaderFooterProfile>
  //           <ProfilePage />
  //         </HeaderFooterProfile>}
  //         />

  //         <Route path="/DashboardPage" element={
  //         <HeaderFooterSite>
  //           <DashboardPage />
  //         </HeaderFooterSite>
  //         }/>

  //         <Route path="/FilmListPage" element={
  //         <HeaderFooterSite>
  //           <FilmListPage />
  //         </HeaderFooterSite>
  //         }/>
  //         <Route path="/FilmDetailsPage" element={
  //         <HeaderFooterSite>
  //           <FilmDetailsPage />
  //         </HeaderFooterSite>
  //         }/>
  //         <Route path="/GenreFilmListPage" element={
  //         <HeaderFooterSite>
  //           <GenreFilmListPage />
  //         </HeaderFooterSite>
  //         }/>
  //         <Route path="/SearchPage" element={
  //         <HeaderFooterSite>
  //           <SearchPage />
  //         </HeaderFooterSite>
  //         }/>
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // );

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