import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { formatPrice, classNames } from '../../../utils/helpers';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showActions = true,
  className 
}) => {
  const { addToCart } = useCart();

  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const handleAddToCart = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    // TODO: Implement quick view modal
    console.log('Quick view:', product.id);
  };

  const handleAddToWishlist = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    // TODO: Implement wishlist functionality
    console.log('Add to wishlist:', product.id);
  };

  const cardClasses = classNames(
    styles.productCard,
    className
  );

  return (
    <article className={cardClasses}>
      <div className={styles.imageContainer}>
        <Link to={`/product/${product.slug}`} className={styles.productLink}>
          <img 
            src={mainImage.image} 
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
          />
        </Link>
        
        <div className={styles.imageOverlay}></div>
        
        {/* Product Badges */}
        <div className={styles.badges}>
          {hasDiscount && (
            <span className={styles.discountBadge}>
              SALE
            </span>
          )}
          {!product.inStock && (
            <span className={styles.outOfStockBadge}>
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && product.inStock && (
          <div className={styles.actionButtons}>
            <button 
              className={styles.actionButton}
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
            >
              <i data-feather="heart"></i>
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleQuickView}
              aria-label="Quick view"
            >
              <i data-feather="eye"></i>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        <Link to={`/product/${product.slug}`} className={styles.productLink}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productCategory}>{product.category.name}</p>
        </Link>

        <div className={styles.priceSection}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className={styles.oldPrice}>
                {formatPrice(product.oldPrice!)}
              </span>
            )}
          </div>

          {product.inStock ? (
            <button 
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              <i data-feather="shopping-bag" className={styles.cartIcon}></i>
              Add to Cart
            </button>
          ) : (
            <button 
              className={styles.outOfStockButton}
              disabled
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;