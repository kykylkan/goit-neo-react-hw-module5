import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, withImage } from '../../services/api';
import styles from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cast.length) return <p>No cast information.</p>;

  return (
    <ul className={styles.cast}>
      {cast.map((c) => (
        <li key={c.cast_id || c.credit_id}>
          {withImage(c.profile_path) ? (
            <img src={withImage(c.profile_path)} alt={c.name} />
          ) : null}
          <p>{c.name}</p>
          {c.character ? <p className={styles.char}>Character: {c.character}</p> : null}
        </li>
      ))}
    </ul>
  );
}
