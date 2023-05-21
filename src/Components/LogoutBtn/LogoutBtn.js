import { useNavigate } from 'react-router-dom';
import "./LogoutBtn.css";
import localStorageService from '../../Services/LocalStorage/localStorageService';

function LogoutBtn() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorageService.clear();
        navigate('/SignupPage');
        window.location.reload();
    };
    
    return (
        <button onClick={handleLogout} className='Logout-btn'> Logout </button>
    );
}

export default LogoutBtn;