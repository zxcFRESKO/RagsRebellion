import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import type { Product as ProductType } from '../../types';
import { formatPrice, classNames } from '../../utils/helpers';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import styles from './Product.module.scss';

const Product: React.FC = () => {
  useFeatherIcons();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data - в реальном приложении будет API запрос
  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockProduct: ProductType = {
          id: '1',
          name: 'Viper Black Tee',
          slug: 'viper-black-tee',
          description: 'The essential streetwear staple. Our premium black tee features the signature ViperSwag logo in a subtle yet bold design. Made from 100% heavyweight cotton for maximum comfort and durability.',
          price: 49.99,
          oldPrice: 69.99,
          category: { id: '1', name: 'T-Shirts', slug: 't-shirts' },
          brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
          inStock: true,
          images: [
            { id: '1', image: '/api/placeholder/800/1000', isMain: true },
            { id: '2', image: '/api/placeholder/800/1000', isMain: false },
            { id: '3', image: '/api/placeholder/800/1000', isMain: false },
            { id: '4', image: '/api/placeholder/800/1000', isMain: false }
          ],
          createdAt: '2023-01-01'
        };
        
        setProduct(mockProduct);
        setSelectedImage(mockProduct.images[0].image);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (): void => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      // Можно добавить уведомление или redirect к корзине
    }
  };

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
  };

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = [
    { name: 'Black', value: 'black', class: styles.colorBlack },
    { name: 'Charcoal', value: 'charcoal', class: styles.colorCharcoal },
    { name: 'White', value: 'white', class: styles.colorWhite },
    { name: 'Pink', value: 'pink', class: styles.colorPink }
  ];

  const relatedProducts: ProductType[] = [
    {
      id: '2',
      name: 'Swag Hoodie',
      slug: 'swag-hoodie',
      description: 'Oversized comfort hoodie',
      price: 89.99,
      category: { id: '2', name: 'Hoodies', slug: 'hoodies' },
      brand: { id: '1', name: 'ViperSwag', slug: 'viperswag' },
      inStock: true,
      images: [{ id: '5', image: '/api/placeholder/400/500', isMain: true }],
      createdAt: '2023-01-02'
    },
    // ... другие товары
  ];

  if (loading) {
    return <div className={styles.loading}>Loading product...</div>;
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/shop" className={styles.backLink}>Back to Shop</Link>
      </div>
    );
  }

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link to="/shop" className={styles.breadcrumbLink}>Shop</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className={styles.productMain}>
          
          {/* Product Images */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img 
                src={selectedImage} 
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            
            <div className={styles.imageThumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  className={classNames(
                    styles.thumbnail,
                    selectedImage === image.image && styles.thumbnailActive
                  )}
                  onClick={() => handleImageSelect(image.image)}
                >
                  <img 
                    src={image.image} 
                    alt={`${product.name} view ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.detailsSection}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            
            {/* Rating */}
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <i 
                    key={index}
                    data-feather="star" 
                    className={styles.starIcon}
                  ></i>
                ))}
              </div>
              <span className={styles.ratingText}>(42 reviews)</span>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className={styles.oldPrice}>
                    {formatPrice(product.oldPrice!)}
                  </span>
                  <span className={styles.discountBadge}>
                    {Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className={styles.productDescription}>
              {product.description}
            </p>

            {/* Size Selection */}
            <div className={styles.optionSection}>
              <h3 className={styles.optionTitle}>Size</h3>
              <div className={styles.sizeOptions}>
                {sizeOptions.map(size => (
                  <button
                    key={size}
                    className={classNames(
                      styles.sizeOption,
                      selectedSize === size && styles.sizeOptionSelected
                    )}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Link to="/size-guide" className={styles.sizeGuideLink}>
                <i data-feather="ruler" className={styles.sizeGuideIcon}></i>
                Size Guide
              </Link>
            </div>

            {/* Color Selection */}
            <div className={styles.optionSection}>
              <h3 className={styles.optionTitle}>Color</h3>
              <div className={styles.colorOptions}>
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    className={classNames(
                      styles.colorOption,
                      color.class,
                      selectedColor === color.value && styles.colorOptionSelected
                    )}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className={styles.purchaseSection}>
              <div className={styles.quantitySelector}>
                <button 
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <i data-feather="minus"></i>
                </button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <button 
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <i data-feather="plus"></i>
                </button>
              </div>

              <button 
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <i data-feather="shopping-bag" className={styles.cartIcon}></i>
                Add to Cart
              </button>
            </div>

            {/* Additional Actions */}
            <div className={styles.additionalActions}>
              <button className={styles.actionButton}>
                <i data-feather="heart" className={styles.actionIcon}></i>
                Save for later
              </button>
              <button className={styles.actionButton}>
                <i data-feather="share-2" className={styles.actionIcon}></i>
                Share
              </button>
            </div>

            {/* Product Features */}
            <div className={styles.features}>
              <h3 className={styles.featuresTitle}>Details</h3>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <i data-feather="check" className={styles.featureIcon}></i>
                  <span>100% premium heavyweight cotton</span>
                </li>
                <li className={styles.featureItem}>
                  <i data-feather="check" className={styles.featureIcon}></i>
                  <span>Screen-printed design for durability</span>
                </li>
                <li className={styles.featureItem}>
                  <i data-feather="check" className={styles.featureIcon}></i>
                  <span>Regular fit (true to size)</span>
                </li>
                <li className={styles.featureItem}>
                  <i data-feather="check" className={styles.featureIcon}></i>
                  <span>Made with ethical manufacturing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You might also like</h2>
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

export default Product;