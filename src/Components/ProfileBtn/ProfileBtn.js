import { useNavigate } from 'react-router-dom';
import UserIcon from '../UserIcon/UserIcon';

function ProfileBtn() {
  const userName = JSON.parse(localStorage.getItem('User-Name'));
  const navigate = useNavigate();

  const handleClick = async () => {

      setTimeout(() => {
        navigate('/ProfilePage');
      }, 0);

  };

  return (
    <div className='ProfileBtn-back' >
      <button className='Profile-btn' onClick={handleClick}>
        <u>My Profile</u>
        <u>Name: {userName}</u>
      </button>
      <UserIcon />
    </div>
  );
}

export default ProfileBtn;