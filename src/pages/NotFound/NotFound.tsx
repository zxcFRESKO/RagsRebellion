import React from 'react';
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  useFeatherIcons();

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              <i data-feather="home" className={styles.buttonIcon}></i>
              Back to Home
            </Link>
            <Link to="/shop" className={styles.shopButton}>
              <i data-feather="shopping-bag" className={styles.buttonIcon}></i>
              Go Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;