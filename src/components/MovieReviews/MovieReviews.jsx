import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <ul className={styles.reviews}>
      {reviews.map((r) => (
        <li key={r.id}>
          <p className={styles.author}>
            <strong>Author: {r.author}</strong>
          </p>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
