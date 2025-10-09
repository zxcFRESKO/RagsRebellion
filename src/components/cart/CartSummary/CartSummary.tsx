import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { classNames, formatPrice } from '../../../utils/helpers';
import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { items, total, itemsCount } = useCart();

  const shippingCost = total > 100 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax;

  const handleCheckout = (): void => {
    if (onCheckout) {
      onCheckout();
    } else {
      // TODO: Redirect to checkout page
      console.log('Proceeding to checkout');
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryTitle}>Order Summary</h2>
      
      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal ({itemsCount} items)</span>
          <span className={styles.summaryValue}>{formatPrice(total)}</span>
        </div>
        
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Shipping</span>
          <span className={styles.summaryValue}>
            {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
          </span>
        </div>
        
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Tax</span>
          <span className={styles.summaryValue}>{formatPrice(tax)}</span>
        </div>
        
        <div className={styles.summaryDivider}></div>
        
        <div className={classNames(styles.summaryRow, styles.totalRow)}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      <div className={styles.summaryActions}>
        <button 
          className={styles.checkoutButton}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        
        <Link to="/shop" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>

      {total < 100 && (
        <div className={styles.shippingNotice}>
          <i data-feather="truck" className={styles.noticeIcon}></i>
          <span>
            Add {formatPrice(100 - total)} more for <strong>FREE shipping</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default CartSummary;