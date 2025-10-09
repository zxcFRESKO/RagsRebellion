import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
// import RegisterForm from '../RegisterForm/RegisterForm';
import { useAuth } from '../../../context/AuthContext';
import { classNames } from '../../../utils/helpers';
import styles from './AuthModal.module.scss';
import RegisterForm from '../RegisterForm/RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

type AuthView = 'login' | 'register';

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login'
}) => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>(initialView);

  // Закрыть модальное окно если пользователь авторизовался
  React.useEffect(() => {
    if (isAuthenticated && isOpen) {
      onClose();
    }
  }, [isAuthenticated, isOpen, onClose]);

  const handleSuccess = (): void => {
    onClose();
  };

  const switchToRegister = (): void => {
    setCurrentView('register');
  };

  const switchToLogin = (): void => {
    setCurrentView('login');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={true}
    >
      <div className={styles.authModal}>
        
        {/* Header с логотипом */}
        <div className={styles.modalHeader}>
          <div className={classNames(styles.modalLogo, 'logo-font')}>
            <span className={styles.logoWhite}>Rags</span>
            <span className={styles.logoPink}>Rebellion</span>
          </div>
          <p className={styles.modalSubtitle}>
            {currentView === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <div className={styles.modalContent}>
          
          {/* Табы для переключения между логином и регистрацией */}
          <div className={styles.tabNavigation}>
            <button
              className={classNames(
                styles.tabButton,
                currentView === 'login' && styles.tabButtonActive
              )}
              onClick={switchToLogin}
            >
              Sign In
            </button>
            <button
              className={classNames(
                styles.tabButton,
                currentView === 'register' && styles.tabButtonActive
              )}
              onClick={switchToRegister}
            >
              Sign Up
            </button>
          </div>

          {/* Формы */}
          {currentView === 'login' ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToRegister={switchToRegister}
            />
          ) : (
            <RegisterForm
              onSuccess={handleSuccess}
              onSwitchToRegister={switchToLogin}
            />
          )}

        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;