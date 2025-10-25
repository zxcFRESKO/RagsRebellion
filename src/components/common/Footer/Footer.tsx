import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../../hooks/useFeatherIcons';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  useFeatherIcons();
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className={`${styles.footer} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <h3 className={styles.brandTitle}>RAGS REBELLION</h3>
            <p className={styles.brandDescription}>
              Disruptive fashion for the new generation. Limited drops from the most avant-garde designers.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <i data-feather="instagram"></i>
              </a>
              <a href="#" className={styles.socialLink}>
                <i data-feather="twitter"></i>
              </a>
              <a href="#" className={styles.socialLink}>
                <i data-feather="facebook"></i>
              </a>
              <a href="#" className={styles.socialLink}>
                <i data-feather="youtube"></i>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Shop</h4>
            <ul className={styles.columnList}>
              <li><Link to="/shop" className={styles.columnLink}>All Products</Link></li>
              <li><Link to="/new-arrivals" className={styles.columnLink}>New Arrivals</Link></li>
              <li><Link to="/best-sellers" className={styles.columnLink}>Best Sellers</Link></li>
              <li><Link to="/sale" className={styles.columnLink}>Sale Items</Link></li>
            </ul>
          </div>

          {/* Information Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Information</h4>
            <ul className={styles.columnList}>
              <li><Link to="/about" className={styles.columnLink}>About Us</Link></li>
              <li><Link to="/contact" className={styles.columnLink}>Contact</Link></li>
              <li><Link to="/shipping" className={styles.columnLink}>Shipping Policy</Link></li>
              <li><Link to="/returns" className={styles.columnLink}>Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <ul className={styles.columnList}>
              <li className={styles.contactItem}>123 Fashion Ave, New York</li>
              <li className={styles.contactItem}>hello@ragsrebellion.com</li>
              <li className={styles.contactItem}>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © 2024 Rags Rebellion. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
              <Link to="/cookies" className={styles.legalLink}>Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;