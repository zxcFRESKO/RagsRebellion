import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import AuthModal from '../../auth/AuthModal/AuthModal';
import { useModal } from '../../../hooks/useModal';
import { classNames } from '../../../utils/helpers';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const { itemsCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { isOpen: isAuthModalOpen, openModal: openAuthModal, closeModal: closeAuthModal } = useModal();
  const currentPath = useLocation();

  useEffect(() => {
    const checkScroll = () => {
      const hasScrolled = window.scrollY > 50;
      setPageScrolled(hasScrolled);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    setMobileMenuVisible(false);
  }, [currentPath]);

  const handleMobileMenuToggle = (): void => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const handleLoginClick = (): void => {
    openAuthModal();
  };

  const handleLogout = (): void => {
    logout();
  };

  const headerStyle = classNames(
    styles.header,
    pageScrolled && styles.scrolled
  );

  const mobileMenuStyle = classNames(
    styles.mobileMenu,
    mobileMenuVisible && styles.mobileMenuOpen
  );

  return (
    <>
      <header className={headerStyle}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <span className="logo-font">
              <span className={styles.logoWhite}>RAGS</span>
              <span className={styles.logoPink}> REBELLION</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link to="/shop" className={styles.navLink}>Shop</Link>
            <Link to="/collections" className={styles.navLink}>Collections</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            
            <div className={styles.dropdown}>
              <button className={classNames(styles.navLink, styles.dropdownToggle)}>
                More <i data-feather="chevron-down" className={styles.dropdownIcon}></i>
              </button>
              <div className={styles.dropdownMenu}>
                <Link to="/lookbook" className={styles.dropdownLink}>Lookbook</Link>
                <Link to="/blog" className={styles.dropdownLink}>Blog</Link>
                <Link to="/contact" className={styles.dropdownLink}>Contact</Link>
              </div>
            </div>

            <div className={styles.authSection}>
              {isAuthenticated ? (
                <div className={styles.userDropdown}>
                  <button className={classNames(styles.navLink, styles.userToggle)}>
                    <i data-feather="user" className={styles.userIcon}></i>
                    {user?.firstName}
                  </button>
                  <div className={styles.userMenu}>
                    <Link to="/profile" className={styles.userMenuItem}>Profile</Link>
                    <Link to="/orders" className={styles.userMenuItem}>Orders</Link>
                    <Link to="/wishlist" className={styles.userMenuItem}>Wishlist</Link>
                    <button 
                      className={classNames(styles.userMenuItem, styles.logoutButton)}
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  className={classNames(styles.navLink, styles.loginButton)}
                  onClick={handleLoginClick}
                >
                  <i data-feather="log-in" className={styles.loginIcon}></i>
                  Sign In
                </button>
              )}
              
              <Link to="/cart" className={classNames(styles.navLink, styles.cartLink)}>
                <i data-feather="shopping-bag" className={styles.cartIcon}></i>
                Cart
                <span className={styles.cartBadge}>{itemsCount}</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuButton}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <i 
              data-feather={mobileMenuVisible ? "x" : "menu"} 
              className={styles.menuIcon}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={mobileMenuStyle}>
          <Link to="/shop" className={styles.mobileNavLink}>Shop</Link>
          <Link to="/collections" className={styles.mobileNavLink}>Collections</Link>
          <Link to="/about" className={styles.mobileNavLink}>About</Link>
          <Link to="/lookbook" className={styles.mobileNavLink}>Lookbook</Link>
          <Link to="/blog" className={styles.mobileNavLink}>Blog</Link>
          <Link to="/contact" className={styles.mobileNavLink}>Contact</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className={styles.mobileNavLink}>Profile</Link>
              <Link to="/wishlist" className={styles.mobileNavLink}>Wishlist</Link>
              <button 
                className={classNames(styles.mobileNavLink, styles.mobileLogoutButton)}
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button 
              className={classNames(styles.mobileNavLink, styles.mobileLoginButton)}
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          )}
          
          <Link to="/cart" className={classNames(styles.mobileNavLink, styles.mobileCartLink)}>
            <i data-feather="shopping-bag" className={styles.mobileCartIcon}></i>
            Cart
            <span className={styles.mobileCartBadge}>{itemsCount}</span>
          </Link>
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </>
  );
};

export default Header;