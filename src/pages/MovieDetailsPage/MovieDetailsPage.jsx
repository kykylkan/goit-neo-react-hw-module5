import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails, withImage } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backRef = useRef(location.state);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [movieId]);

  return (
    <div>
      <Link className={styles.back} to={backRef.current || '/movies'}>&larr; Go back</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movie && (
        <div className={styles.header}>
          {withImage(movie.poster_path) ? (
            <img src={withImage(movie.poster_path)} alt={movie.title} />
          ) : null}
          <div>
            <h2>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h2>
            {movie.vote_average != null && (
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
            )}
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genres</h4>
            <p>{(movie.genres || []).map((g) => g.name).join(' ')}</p>
          </div>
        </div>
      )}

      <div className={styles.additional}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
