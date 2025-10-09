import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { type Product } from '../../../types';
import { formatPrice, classNames } from '../../../utils/helpers';
import styles from './FeaturedProducts.module.scss';

// Mock data - в реальном приложении будет приходить с API
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Viper Black Tee',
    slug: 'viper-black-tee',
    description: 'Premium black t-shirt with signature ViperSwag logo',
    price: 49.99,
    oldPrice: 69.99,
    category: { id: '1', name: 'T-Shirts', slug: 't-shirts' },
    brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
    inStock: true,
    images: [
      { id: '1', image: 'http://static.photos/black/640x360/1', isMain: true }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: '2',
    name: 'Swag Hoodie',
    slug: 'swag-hoodie',
    description: 'Oversized comfort hoodie for street style',
    price: 89.99,
    category: { id: '2', name: 'Hoodies', slug: 'hoodies' },
    brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
    inStock: true,
    images: [
      { id: '2', image: 'http://static.photos/black/640x360/2', isMain: true }
    ],
    createdAt: '2023-01-02'
  }
];

const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product): void => {
    addToCart(product, 1);
  };

  return (
    <section id="featured" className={styles.featuredSection}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={classNames(styles.sectionTitle, 'logo-font')}>
            <span className={styles.titleWhite}>HOT</span>{' '}
            <span className={styles.titlePink}>DROPS</span>
          </h2>
          <p className={styles.sectionDescription}>
            Fresh from the factory. Limited stock available. Don't sleep on these.
          </p>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {featuredProducts.map((product) => {
            const mainImage = product.images.find(img => img.isMain) || product.images[0];
            const hasDiscount = product.oldPrice && product.oldPrice > product.price;

            return (
              <div key={product.id} className={styles.productCard}>
                
                {/* Product Image */}
                <div className={styles.imageContainer}>
                  <Link to={`/product/${product.slug}`}>
                    <img 
                      src={mainImage.image} 
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </Link>
                  
                  {/* Image Overlay */}
                  <div className={styles.imageOverlay}></div>
                  
                  {/* Product Badge */}
                  {hasDiscount && (
                    <div className={styles.productBadge}>
                      <span className={styles.badgeNew}>NEW</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.actionButton}
                      aria-label="Add to wishlist"
                    >
                      <i data-feather="heart"></i>
                    </button>
                    <button 
                      className={styles.actionButton}
                      aria-label="Quick view"
                    >
                      <i data-feather="eye"></i>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <div className={styles.productHeader}>
                    <div>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productCategory}>{product.category.name}</p>
                    </div>
                    <div className={styles.priceContainer}>
                      <p className={styles.currentPrice}>
                        {formatPrice(product.price)}
                      </p>
                      {hasDiscount && (
                        <p className={styles.oldPrice}>
                          {formatPrice(product.oldPrice!)}
                        </p>
                      )}
                    </div>
                  </div>

                  <button 
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    <i data-feather="shopping-bag" className={styles.cartIcon}></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className={styles.viewAllContainer}>
          <Link to="/shop" className={styles.viewAllLink}>
            View All Products <i data-feather="arrow-right" className={styles.linkIcon}></i>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;