import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import CartItem from '../../components/cart/CartItem/CartItem';
import CartSummary from '../../components/cart/CartSummary/CartSummary';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { type Product } from '../../types';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  useFeatherIcons();
  const { items, clearCart, itemsCount } = useCart();

  const handleClearCart = (): void => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleCheckout = (): void => {
    // TODO: Implement checkout process
    console.log('Starting checkout process');
  };

  // Mock related products
  const relatedProducts: Product[] = [
    {
      id: '5',
      name: 'Viper Beanie',
      slug: 'viper-beanie',
      description: 'Warm beanie with embroidered logo',
      price: 24.99,
      category: { id: '4', name: 'Accessories', slug: 'accessories' },
      brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
      inStock: true,
      images: [{ id: '6', image: '/api/placeholder/400/500', isMain: true }],
      createdAt: '2023-01-05'
    },
    {
      id: '6',
      name: 'Logo Socks Pack',
      slug: 'logo-socks-pack',
      description: '3-pack of premium socks',
      price: 19.99,
      category: { id: '4', name: 'Accessories', slug: 'accessories' },
      brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
      inStock: true,
      images: [{ id: '7', image: '/api/placeholder/400/500', isMain: true }],
      createdAt: '2023-01-06'
    }
  ];

  if (items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>
              <i data-feather="shopping-bag"></i>
            </div>
            <h1 className={styles.emptyTitle}>Your cart is empty</h1>
            <p className={styles.emptyDescription}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/shop" className={styles.shopButton}>
              Start Shopping
            </Link>
          </div>

          {/* Recently Viewed/Related Products */}
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>You might like these</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={styles.relatedProduct}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Shopping Cart</h1>
          <div className={styles.cartStats}>
            <span className={styles.itemsCount}>{itemsCount} items</span>
            <button 
              className={styles.clearCartButton}
              onClick={handleClearCart}
            >
              <i data-feather="trash-2" className={styles.clearIcon}></i>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className={styles.cartContent}>
          
          {/* Cart Items */}
          <div className={styles.cartItems}>
            <div className={styles.itemsHeader}>
              <span className={styles.headerProduct}>Product</span>
              <span className={styles.headerQuantity}>Quantity</span>
              <span className={styles.headerTotal}>Total</span>
            </div>

            <div className={styles.itemsList}>
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className={styles.cartSidebar}>
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>

        {/* Recently Viewed/Related Products */}
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Complete your look</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                className={styles.relatedProduct}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Cart;