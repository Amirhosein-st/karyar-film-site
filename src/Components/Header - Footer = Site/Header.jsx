import { Link } from 'react-router-dom';
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import "./Header.css";

function Header() {

    return (
        <div className="header-container">

            <div className="header-right">
            <Link to="/HomePage"><div className="header-logo"></div></Link>
                <h1 className='header-right-h1'>Movie Site</h1>
            </div>

            <div className="header-center">
                <Link to="/HomePage">
                    <button className='menu-btns'>Home</button></Link>
                <Link to="/SearchPage">
                    <button className='menu-btns'>Search Movie</button></Link>
                <Link to="/AddMovieMainPage">
                    <button className='menu-btns'>Add Movie</button></Link>
                    <Link to="/FilmListPage">
                    <button className='menu-btns'>Movies List</button></Link>
            </div>

            <div className="header-left">
                <ProfileBtn />
            </div>

        </div>
    )
}

export default Header;