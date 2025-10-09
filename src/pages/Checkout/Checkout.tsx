import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import { formatPrice } from '../../utils/helpers';
import styles from './Checkout.module.scss';

const Checkout: React.FC = () => {
  useFeatherIcons();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    // Имитация процесса оплаты
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Очищаем корзину и перенаправляем на страницу успеха
    clearCart();
    navigate('/order-success');
  };

  const shippingCost = total > 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <div className={styles.emptyContent}>
          <i data-feather="shopping-cart" className={styles.emptyIcon}></i>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out</p>
          <button 
            className={styles.shopButton}
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

    function classNames(){
        throw new Error('Function not implemented.');
    }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Checkout</h1>

        <div className={styles.checkoutContent}>
          
          {/* Форма заказа */}
          <div className={styles.orderForm}>
            <form onSubmit={handleSubmit}>
              
              {/* Контактная информация */}
              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Информация о доставке */}
              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Shipping Address</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.formLabel}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.formLabel}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.formLabel}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="city" className={styles.formLabel}>
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="zipCode" className={styles.formLabel}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="country" className={styles.formLabel}>
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Информация об оплате */}
              <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Payment Information</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="nameOnCard" className={styles.formLabel}>
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber" className={styles.formLabel}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="expiryDate" className={styles.formLabel}>
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="cvv" className={styles.formLabel}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </section>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ${formatPrice(finalTotal)}`}
              </button>
            </form>
          </div>

          {/* Сводка заказа */}
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.orderItems}>
              {items.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <img 
                    src={item.product.images[0].image} 
                    alt={item.product.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.product.name}</h4>
                    <p className={styles.itemMeta}>
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Discount</span>
                <span>-{formatPrice(0)}</span>
              </div>
              <div>
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;