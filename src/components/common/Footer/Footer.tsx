import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link to="/" className={styles.footerLogo}>
              <span className="logo-font">
                <span className={styles.logoWhite}>RAGS</span>
                <span className={styles.logoPink}> REBELLION</span>
              </span>
            </Link>
            <p className={styles.brandDescription}>
              Streetwear for the bold. Limited drops. Unlimited attitude.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <i data-feather="instagram"></i>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <i data-feather="twitter"></i>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <i data-feather="facebook"></i>
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <i data-feather="youtube"></i>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>Shop</h3>
            <ul className={styles.linkList}>
              <li><Link to="/new-arrivals" className={styles.footerLink}>New Arrivals</Link></li>
              <li><Link to="/best-sellers" className={styles.footerLink}>Best Sellers</Link></li>
              <li><Link to="/t-shirts" className={styles.footerLink}>T-Shirts</Link></li>
              <li><Link to="/hoodies" className={styles.footerLink}>Hoodies</Link></li>
              <li><Link to="/accessories" className={styles.footerLink}>Accessories</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>Help</h3>
            <ul className={styles.linkList}>
              <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
              <li><Link to="/faq" className={styles.footerLink}>FAQs</Link></li>
              <li><Link to="/shipping" className={styles.footerLink}>Shipping</Link></li>
              <li><Link to="/returns" className={styles.footerLink}>Returns</Link></li>
              <li><Link to="/size-guide" className={styles.footerLink}>Size Guide</Link></li>
            </ul>
          </div>

          {/* About Links */}
          <div className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>About</h3>
            <ul className={styles.linkList}>
              <li><Link to="/our-story" className={styles.footerLink}>Our Story</Link></li>
              <li><Link to="/blog" className={styles.footerLink}>Blog</Link></li>
              <li><Link to="/careers" className={styles.footerLink}>Careers</Link></li>
              <li><Link to="/press" className={styles.footerLink}>Press</Link></li>
              <li><Link to="/wholesale" className={styles.footerLink}>Wholesale</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} ViperSwag Threads. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
            <Link to="/cookies" className={styles.legalLink}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;