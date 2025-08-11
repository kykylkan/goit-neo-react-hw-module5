import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.box}>
      <h2>Page not found</h2>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
    </div>
  );
}
