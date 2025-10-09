import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { classNames } from '../../../utils/helpers';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  className
}) => {
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      onSuccess?.();
    } catch {
      setError('Invalid email or password. Please try again.');
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const formClasses = classNames(styles.loginForm, className);

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Welcome Back</h2>
        <p className={styles.formSubtitle}>Sign in to your account to continue</p>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <i data-feather="alert-circle" className={styles.errorIcon}></i>
          {error}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          Password
        </label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={togglePasswordVisibility}
            disabled={isLoading}
          >
            <i data-feather={showPassword ? 'eye-off' : 'eye'} className={styles.passwordIcon}></i>
          </button>
        </div>
      </div>

      <div className={styles.formOptions}>
        <label className={styles.rememberMe}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.checkboxLabel}>Remember me</span>
        </label>
        <button type="button" className={styles.forgotPassword}>
          Forgot password?
        </button>
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className={styles.loadingSpinner}></div>
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      <div className={styles.socialButtons}>
        <button type="button" className={classNames(styles.socialButton, styles.socialGoogle)}>
          <i data-feather="mail" className={styles.socialIcon}></i>
          Google
        </button>
        <button type="button" className={classNames(styles.socialButton, styles.socialFacebook)}>
          <i data-feather="facebook" className={styles.socialIcon}></i>
          Facebook
        </button>
      </div>

      <div className={styles.formFooter}>
        <span className={styles.footerText}>Don't have an account?</span>
        <button
          type="button"
          className={styles.switchButton}
          onClick={onSwitchToRegister}
          disabled={isLoading}
        >
          Sign up now
        </button>
      </div>
    </form>
  );
};

export default LoginForm;