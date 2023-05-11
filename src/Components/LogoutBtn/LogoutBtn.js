import {  useNavigate } from 'react-router-dom';
import "./LogoutBtn.css";

function LogoutBtn() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
    localStorage.clear();
    navigate('/SignupPage');
    window.location.reload();
  }
    return (
        <button onClick={handleLogout} className='Logout-btn'>Logout</button>
    )
}

export default LogoutBtn;