import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { type Product } from '../../types';
import styles from './Wishlist.module.scss';

const Wishlist: React.FC = () => {
  useFeatherIcons();
  
  // Mock data - в реальном приложении будет из контекста/API
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    {
      id: '1',
      name: 'Viper Black Tee',
      slug: 'viper-black-tee',
      description: 'Premium black t-shirt',
      price: 49.99,
      oldPrice: 69.99,
      category: { id: '1', name: 'T-Shirts', slug: 't-shirts' },
      brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
      inStock: true,
      images: [{ id: '1', image: '/api/placeholder/400/500', isMain: true }],
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Swag Hoodie',
      slug: 'swag-hoodie',
      description: 'Oversized comfort hoodie',
      price: 89.99,
      category: { id: '2', name: 'Hoodies', slug: 'hoodies' },
      brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
      inStock: true,
      images: [{ id: '2', image: '/api/placeholder/400/500', isMain: true }],
      createdAt: '2023-01-02'
    }
  ]);

  const handleRemoveFromWishlist = (productId: string): void => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearWishlist = (): void => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      setWishlistItems([]);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.wishlistPage}>
        <div className={styles.container}>
          <div className={styles.emptyWishlist}>
            <div className={styles.emptyIcon}>
              <i data-feather="heart"></i>
            </div>
            <h1 className={styles.emptyTitle}>Your wishlist is empty</h1>
            <p className={styles.emptyDescription}>
              Save items you love to your wishlist. Review them anytime and easily move them to your bag.
            </p>
            <Link to="/shop" className={styles.shopButton}>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wishlistPage}>
      <div className={styles.container}>
        
        {/* Заголовок страницы */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Wishlist</h1>
          <div className={styles.pageActions}>
            <span className={styles.itemsCount}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </span>
            <button 
              className={styles.clearButton}
              onClick={handleClearWishlist}
            >
              <i data-feather="trash-2" className={styles.clearIcon}></i>
              Clear All
            </button>
          </div>
        </div>

        {/* Сетка товаров */}
        <div className={styles.wishlistGrid}>
          {wishlistItems.map(product => (
            <div key={product.id} className={styles.wishlistItem}>
              <ProductCard
                product={product}
                showActions={false}
                className={styles.productCard}
              />
              <div className={styles.itemActions}>
                <button 
                  className={styles.moveToCartButton}
                  onClick={() => console.log('Move to cart:', product.id)}
                >
                  <i data-feather="shopping-bag" className={styles.actionIcon}></i>
                  Add to Cart
                </button>
                <button 
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  <i data-feather="x" className={styles.actionIcon}></i>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Рекомендации */}
        <section className={styles.recommendations}>
          <h2 className={styles.recommendationsTitle}>You might also like</h2>
          <div className={styles.recommendationsGrid}>
            {/* Mock recommended products */}
            {[1, 2, 3, 4].map(id => (
              <ProductCard
                key={id}
                product={{
                  id: `rec-${id}`,
                  name: `Recommended Item ${id}`,
                  slug: `recommended-${id}`,
                  description: 'Featured product',
                  price: 39.99 + id * 10,
                  category: { id: '1', name: 'T-Shirts', slug: 't-shirts' },
                  brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
                  inStock: true,
                  images: [{ id: `rec-${id}`, image: '/api/placeholder/400/500', isMain: true }],
                  createdAt: '2023-01-01'
                }}
                className={styles.recommendedProduct}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Wishlist;