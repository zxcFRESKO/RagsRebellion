import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { classNames } from '../../../utils/helpers';
import styles from './RegisterForm.module.scss';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  className?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  className
}) => {
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });
      onSuccess?.();
    } catch {
      setErrors({ submit: 'Registration failed. Please try again.' });
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrength = (): { strength: string; width: string; color: string } => {
    const password = formData.password;
    if (!password) return { strength: '', width: '0%', color: 'transparent' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) return { strength: 'Weak', width: '33%', color: '#ef4444' };
    if (score <= 4) return { strength: 'Medium', width: '66%', color: '#f59e0b' };
    return { strength: 'Strong', width: '100%', color: '#22c55e' };
  };

  const passwordStrength = getPasswordStrength();

  const formClasses = classNames(styles.registerForm, className);

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create Account</h2>
        <p className={styles.formSubtitle}>Join ViperSwag community today</p>
      </div>

      {errors.submit && (
        <div className={styles.errorMessage}>
          <i data-feather="alert-circle" className={styles.errorIcon}></i>
          {errors.submit}
        </div>
      )}

      <div className={styles.nameRow}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.formLabel}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={classNames(
              styles.formInput,
              errors.firstName && styles.inputError
            )}
            placeholder="John"
            required
            disabled={isLoading}
          />
          {errors.firstName && (
            <span className={styles.fieldError}>{errors.firstName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.formLabel}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={classNames(
              styles.formInput,
              errors.lastName && styles.inputError
            )}
            placeholder="Doe"
            required
            disabled={isLoading}
          />
          {errors.lastName && (
            <span className={styles.fieldError}>{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.formLabel}>
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={classNames(
            styles.formInput,
            errors.username && styles.inputError
          )}
          placeholder="johndoe"
          required
          disabled={isLoading}
        />
        {errors.username && (
          <span className={styles.fieldError}>{errors.username}</span>
        )}
      </div>

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
          className={classNames(
            styles.formInput,
            errors.email && styles.inputError
          )}
          placeholder="john@example.com"
          required
          disabled={isLoading}
        />
        {errors.email && (
          <span className={styles.fieldError}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.formLabel}>
          Phone Number <span className={styles.optional}>(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="+1 (555) 123-4567"
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
            className={classNames(
              styles.formInput,
              errors.password && styles.inputError
            )}
            placeholder="Create a strong password"
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
        {formData.password && (
          <div className={styles.passwordStrength}>
            <div className={styles.strengthBar}>
              <div 
                className={styles.strengthFill}
                style={{ 
                  width: passwordStrength.width,
                  backgroundColor: passwordStrength.color
                }}
              ></div>
            </div>
            <span className={styles.strengthText}>
              Password strength: <strong>{passwordStrength.strength}</strong>
            </span>
          </div>
        )}
        {errors.password && (
          <span className={styles.fieldError}>{errors.password}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.formLabel}>
          Confirm Password
        </label>
        <div className={styles.passwordInput}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={classNames(
              styles.formInput,
              errors.confirmPassword && styles.inputError
            )}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={toggleConfirmPasswordVisibility}
            disabled={isLoading}
          >
            <i data-feather={showConfirmPassword ? 'eye-off' : 'eye'} className={styles.passwordIcon}></i>
          </button>
        </div>
        {errors.confirmPassword && (
          <span className={styles.fieldError}>{errors.confirmPassword}</span>
        )}
      </div>

      <div className={styles.termsGroup}>
        <label className={styles.termsLabel}>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className={styles.termsCheckbox}
            disabled={isLoading}
          />
          <span className={styles.checkboxText}>
            I agree to the{' '}
            <a href="/terms" className={styles.termsLink}>Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className={styles.termsLink}>Privacy Policy</a>
          </span>
        </label>
        {errors.terms && (
          <span className={styles.fieldError}>{errors.terms}</span>
        )}
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className={styles.loadingSpinner}></div>
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className={styles.formFooter}>
        <span className={styles.footerText}>Already have an account?</span>
        <button
          type="button"
          className={styles.switchButton}
          onClick={onSwitchToRegister}
          disabled={isLoading}
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;