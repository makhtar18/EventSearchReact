import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Navbar";
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import {Route, Routes} from "react-router-dom";

function App() {
  const favoriteTableString = localStorage.getItem('favoriteTable');
  var favoriteTable = JSON.parse(favoriteTableString);
  if(favoriteTable===null||favoriteTable===undefined){
    localStorage.setItem('favoriteTable','{}');
    favoriteTable={}
  }
  return (
      
      <div className="">
        <header>
          <div className='navRoutes'>
            <NavBar />
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
  
  );
}

export default App;
