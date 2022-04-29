import React, { useEffect, useState } from 'react';
import Movie from './components/movie/Movie';

const MOVIE_API =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f8d811510bd89f516edfda1a59a03891';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=f8d811510bd89f516edfda1a59a03891&query=';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(MOVIE_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <div className='logo'>
          <h1>Nonton Kuy</h1>
        </div>
        <div className='menu'>
          <a href='/'>Home</a>
          <a href='/'>Movies</a>
          <a href='/'>Tv</a>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className='search'
            type='text'
            placeholder='Search movie...'
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </header>
      <div className='movie-container'>
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
