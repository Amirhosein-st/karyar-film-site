import "./NotFoundPage.css";
import { Link } from 'react-router-dom';
import localStorageService from '../../Services/LocalStorage/localStorageService';

function NotFoundPage() {
    const Token = localStorageService.getItem('Access-Token');

    return (
        <div className='NotFound-back'>
            {Token ? (
                <div className='NotFound-LogedIN'>
                    <h1>404</h1>
                    <h2>Pgae Not Found</h2>
                    <h3>Find a way out of here quickly and go.</h3>
                    <div>
                        <Link to='/ProfilePage'>
                            <button className='Container-NotFound-LogedIN-btn-ProfilePage' >
                                Go To Profile Page
                            </button>
                        </Link>
                        <Link to='/HomePage'>
                            <button className='Container-NotFound-LogedIN-btn-DashboardPage'>
                                Go To Home Page
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='NotFound-LogedOUT'>
                    <h1>404</h1>
                    <h2>Pgae Not Found</h2>
                    <h3>Find a way out of here quickly and go.</h3>
                    <div>
                        <Link to='/SignupPage'>
                            <button className='Container-NotFound-LogedOUT-btn-SignupPage'>SignupPage</button>
                        </Link>
                        <Link to='/LoginPage'>
                            <button className='Container-NotFound-LogedOUT-btn-LoginPage'>LoginPage</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotFoundPage;