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
      const hasScrolled = window.scrollY > 20;
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
        <div className={styles.headerContainer}>
          {/* Left Navigation */}
          <nav className={styles.leftNav}>
            <Link to="/shop" className={styles.navLink}>Shop</Link>
            <Link to="/collections" className={styles.navLink}>Collections</Link>
            <Link to="/drops" className={styles.navLink}>New Drops</Link>
          </nav>

          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoContainer}>
              <span className={styles.logoMain}>RAGS</span>
              <span className={styles.logoSub}>REBELLION</span>
            </div>
          </Link>

          {/* Right Navigation */}
          <nav className={styles.rightNav}>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/lookbook" className={styles.navLink}>Lookbook</Link>
            
            <div className={styles.authSection}>
              {isAuthenticated ? (
                <div className={styles.userDropdown}>
                  <button className={classNames(styles.navLink, styles.userToggle)}>
                    <i data-feather="user" className={styles.userIcon}></i>
                    <span className={styles.userName}>{user?.firstName}</span>
                  </button>
                  <div className={styles.userMenu}>
                    <Link to="/profile" className={styles.userMenuItem}>
                      <i data-feather="user"></i>
                      Profile
                    </Link>
                    <Link to="/orders" className={styles.userMenuItem}>
                      <i data-feather="shopping-bag"></i>
                      Orders
                    </Link>
                    <Link to="/wishlist" className={styles.userMenuItem}>
                      <i data-feather="heart"></i>
                      Wishlist
                    </Link>
                    <div className={styles.menuDivider}></div>
                    <button 
                      className={classNames(styles.userMenuItem, styles.logoutButton)}
                      onClick={handleLogout}
                    >
                      <i data-feather="log-out"></i>
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
                  <span>Sign In</span>
                </button>
              )}
              
              <Link to="/cart" className={classNames(styles.navLink, styles.cartLink)}>
                <div className={styles.cartIconWrapper}>
                  <i data-feather="shopping-bag" className={styles.cartIcon}></i>
                  {itemsCount > 0 && (
                    <span className={styles.cartBadge}>{itemsCount}</span>
                  )}
                </div>
                <span className={styles.cartText}>Cart</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuButton}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <div className={classNames(
              styles.menuIcon,
              mobileMenuVisible && styles.menuIconActive
            )}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={mobileMenuStyle}>
          <div className={styles.mobileNavContent}>
            <div className={styles.mobileNavHeader}>
              <div className={styles.mobileUserSection}>
                {isAuthenticated ? (
                  <div className={styles.mobileUserInfo}>
                    <i data-feather="user" className={styles.mobileUserIcon}></i>
                    <span>Hello, {user?.firstName}</span>
                  </div>
                ) : (
                  <button 
                    className={styles.mobileLoginButton}
                    onClick={handleLoginClick}
                  >
                    <i data-feather="log-in"></i>
                    Sign In
                  </button>
                )}
              </div>
            </div>

            <div className={styles.mobileNavMain}>
              <Link to="/shop" className={styles.mobileNavLink}>
                <i data-feather="shopping-bag"></i>
                Shop
              </Link>
              <Link to="/collections" className={styles.mobileNavLink}>
                <i data-feather="grid"></i>
                Collections
              </Link>
              <Link to="/drops" className={styles.mobileNavLink}>
                <i data-feather="zap"></i>
                New Drops
              </Link>
              <Link to="/about" className={styles.mobileNavLink}>
                <i data-feather="info"></i>
                About
              </Link>
              <Link to="/lookbook" className={styles.mobileNavLink}>
                <i data-feather="camera"></i>
                Lookbook
              </Link>
            </div>

            {isAuthenticated && (
              <div className={styles.mobileNavUser}>
                <div className={styles.mobileNavSection}>
                  <h4 className={styles.mobileSectionTitle}>Account</h4>
                  <Link to="/profile" className={styles.mobileNavLink}>
                    <i data-feather="user"></i>
                    Profile
                  </Link>
                  <Link to="/orders" className={styles.mobileNavLink}>
                    <i data-feather="shopping-bag"></i>
                    Orders
                  </Link>
                  <Link to="/wishlist" className={styles.mobileNavLink}>
                    <i data-feather="heart"></i>
                    Wishlist
                  </Link>
                </div>
              </div>
            )}

            <div className={styles.mobileNavFooter}>
              {isAuthenticated && (
                <button 
                  className={styles.mobileLogoutButton}
                  onClick={handleLogout}
                >
                  <i data-feather="log-out"></i>
                  Sign Out
                </button>
              )}
              <Link to="/cart" className={styles.mobileCartButton}>
                <div className={styles.mobileCartInfo}>
                  <i data-feather="shopping-bag"></i>
                  <span>Cart</span>
                  {itemsCount > 0 && (
                    <span className={styles.mobileCartBadge}>{itemsCount}</span>
                  )}
                </div>
                <i data-feather="chevron-right" className={styles.cartArrow}></i>
              </Link>
            </div>
          </div>
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