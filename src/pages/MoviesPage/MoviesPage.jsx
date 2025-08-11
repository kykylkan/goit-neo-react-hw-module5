import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { searchMovies } from '../../services/api';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useSearchParams();
  const query = params.get('query') || '';

  useEffect(() => {
    const load = async () => {
      if (!query) {
        setItems([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(query);
        setItems(data);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    const value = e.currentTarget.elements.search.value.trim();
    setParams(value ? { query: value } : {});
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {items.length > 0 && <MovieList items={items} />}
    </div>
  );
}
