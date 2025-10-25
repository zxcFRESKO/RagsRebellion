import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../../utils/helpers';
import type { Product } from '../../../types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const mainImage = product.images.find(img => img.isMain) || product.images[0];

  return (
    <div className={classNames(styles.productCard, className)}>
      <Link to={`/product/${product.slug || product.id}`} className={styles.productLink}>
        <div className={styles.imageContainer}>
          <img 
            src={mainImage?.image || '/api/placeholder/400/500'} 
            alt={product.name}
            className={styles.productImage}
          />
          {!product.inStock && (
            <div className={styles.outOfStock}>OUT OF STOCK</div>
          )}
          <div className={styles.productOverlay}>
            <button className={styles.quickView}>
              QUICK VIEW
            </button>
          </div>
        </div>
        
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productBrand}>{product.brand.name}</p>
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>${product.price}</span>
            {hasDiscount && (
              <span className={styles.oldPrice}>${product.oldPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;