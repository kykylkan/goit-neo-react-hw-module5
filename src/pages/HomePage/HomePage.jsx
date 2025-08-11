import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { getTrending } from '../../services/api';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTrending();
        setMovies(data);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList items={movies} />}
    </div>
  );
}
