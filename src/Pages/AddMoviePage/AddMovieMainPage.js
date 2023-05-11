import AddMovie from "./AddMovieBase64/AddMovie";
import AddMovie2 from "./AddMovie2Multipart/AddMovie2";
import "./AddMovieMainPage.css";

function AddMovieMainPage() {
    return (
        <div className="Add-Movie-back">
            <h1>Add Movie Page</h1>
            <div className="add-back-main">
                <AddMovie />
                <AddMovie2 />
            </div>
        </div>
    )
}

export default AddMovieMainPage;