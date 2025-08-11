import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ items = [] }) {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {items.map((m) => (
        <li key={m.id}>
          <Link to={`/movies/${m.id}`} state={location}>
            {m.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
