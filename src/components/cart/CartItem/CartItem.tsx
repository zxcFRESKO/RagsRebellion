import React from 'react';
import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { formatPrice,  } from '../../../utils/helpers';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = (): void => {
    removeFromCart(item.id);
  };

  const mainImage = item.product.images.find(img => img.isMain) || item.product.images[0];
  const itemTotal = item.product.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      {/* Product Image */}
      <Link 
        to={`/product/${item.product.slug}`} 
        className={styles.productImageLink}
      >
        <img 
          src={mainImage.image} 
          alt={item.product.name}
          className={styles.productImage}
          loading="lazy"
        />
      </Link>

      {/* Product Details */}
      <div className={styles.productDetails}>
        <Link 
          to={`/product/${item.product.slug}`} 
          className={styles.productName}
        >
          {item.product.name}
        </Link>
        
        <div className={styles.productMeta}>
          <span className={styles.productSize}>Size: {item.size}</span>
          <span className={styles.productColor}>Color: {item.color}</span>
        </div>

        <div className={styles.mobilePrice}>
          {formatPrice(item.product.price)}
        </div>

        {/* Quantity Controls */}
        <div className={styles.quantityControls}>
          <button 
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <i data-feather="minus" className={styles.quantityIcon}></i>
          </button>
          
          <span className={styles.quantityDisplay}>{item.quantity}</span>
          
          <button 
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= 10}
            aria-label="Increase quantity"
          >
            <i data-feather="plus" className={styles.quantityIcon}></i>
          </button>
        </div>
      </div>

      {/* Price and Actions */}
      <div className={styles.priceSection}>
        <div className={styles.priceDesktop}>
          {formatPrice(item.product.price)}
        </div>
        
        <div className={styles.itemTotal}>
          {formatPrice(itemTotal)}
        </div>

        <button 
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove item from cart"
        >
          <i data-feather="trash-2" className={styles.removeIcon}></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;