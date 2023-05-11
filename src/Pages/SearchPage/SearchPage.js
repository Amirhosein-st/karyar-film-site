import SearchById from "./SearchById/SearchById";
import SearchByName from "./SearchByName/SearchByName";
import GenresList from "./GenresList/GenresList";
import "./SearchPage.css";

function SearchPage() {

  return (
    <div className='search-page-back'>
      <h1>Search Page</h1>

      <div className="search-sections">

        <GenresList />

        <div className="sec-2">
          <SearchByName />
          <SearchById />
        </div>
        
      </div>
    </div>
  );
}

export default SearchPage;