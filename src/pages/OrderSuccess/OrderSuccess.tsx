import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import styles from './OrderSuccess.module.scss';

const OrderSuccess: React.FC = () => {
  useFeatherIcons();
  const navigate = useNavigate();

  useEffect(() => {
    // Автоматический redirect через 10 секунд
    const timer = setTimeout(() => {
      navigate('/profile');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.successPage}>
      <div className={styles.container}>
        
        {/* Иконка успеха */}
        <div className={styles.successIcon}>
          <i data-feather="check-circle"></i>
        </div>

        {/* Заголовок */}
        <h1 className={styles.successTitle}>Order Confirmed!</h1>
        
        {/* Сообщение */}
        <div className={styles.successMessage}>
          <p className={styles.messageText}>
            Thank you for your purchase! Your order has been confirmed and will be shipped soon.
          </p>
          <p className={styles.orderNumber}>
            Order #: <strong>VS-{Date.now().toString().slice(-8)}</strong>
          </p>
          <p className={styles.confirmationText}>
            A confirmation email has been sent to your email address.
          </p>
        </div>

        {/* Детали заказа */}
        <div className={styles.orderDetails}>
          <div className={styles.detailCard}>
            <i data-feather="package" className={styles.detailIcon}></i>
            <div className={styles.detailContent}>
              <h4 className={styles.detailTitle}>Estimated Delivery</h4>
              <p className={styles.detailText}>3-5 business days</p>
            </div>
          </div>
          
          <div className={styles.detailCard}>
            <i data-feather="truck" className={styles.detailIcon}></i>
            <div className={styles.detailContent}>
              <h4 className={styles.detailTitle}>Shipping Method</h4>
              <p className={styles.detailText}>Standard Shipping</p>
            </div>
          </div>
          
          <div className={styles.detailCard}>
            <i data-feather="credit-card" className={styles.detailIcon}></i>
            <div className={styles.detailContent}>
              <h4 className={styles.detailTitle}>Payment Method</h4>
              <p className={styles.detailText}>Credit Card •••• 4242</p>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className={styles.actionButtons}>
          <Link to="/profile" className={styles.primaryButton}>
            <i data-feather="user" className={styles.buttonIcon}></i>
            View Order Details
          </Link>
          
          <Link to="/shop" className={styles.secondaryButton}>
            <i data-feather="shopping-bag" className={styles.buttonIcon}></i>
            Continue Shopping
          </Link>
        </div>

        {/* Таймер redirect */}
        <div className={styles.redirectNotice}>
          <p>
            You will be redirected to your profile in <strong>10 seconds</strong>
          </p>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;