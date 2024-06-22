import './App.css';
import {useState, useEffect} from 'react';
import Layout from './Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Trailer from './Trailer';
import Reviews from './Reviews';

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = () => {

    fetch('http://localhost:8080/api/v1/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
  }

  const getMovieData =  (movieId) => {
    
    fetch(`http://localhost:8080/api/v1/movies/${movieId}`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .then(data => setReviews(data.reviews))
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
