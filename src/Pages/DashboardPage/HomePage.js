import Genre3 from '../../Components/Genres/Genre3';
import Genre15 from '../../Components/Genres/Genre15';
import Genre9 from '../../Components/Genres/Genre9';
import Genre13 from '../../Components/Genres/Genre13';
import Genre14 from '../../Components/Genres/Genre14';
import './DashboardPage.css'
import '../../Components/Genres/Genre.css';

const HomePage = () => {

  return (
    <div className='Genre-list-dashboard'>
      <h1 className='Genre-list-dashboard-h1'>Home page</h1>
      <Genre3 />
      <Genre15 />
      <Genre9 />
      <Genre13 />
      <Genre14 />
    </div>
  );
};

export default HomePage;