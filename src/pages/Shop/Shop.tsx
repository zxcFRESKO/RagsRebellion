import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import type { Product, Category, Brand } from '../../types';
import styles from './Shop.module.scss';

// Mock данные адаптированные под твой интерфейс
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ERD DISTRESSED HOODIE',
    slug: 'erd-distressed-hoodie',
    description: 'Distressed oversized hoodie from Enfants Riches Déprimés',
    price: 1250,
    oldPrice: 1500,
    category: { id: '1', name: 'Hoodies', slug: 'hoodies' },
    brand: { id: '1', name: 'Enfants Riches Déprimés', slug: 'erd' },
    inStock: true,
    images: [{ id: '1', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'BALENCIAGA DEFENDER',
    slug: 'balenciaga-defender',
    description: 'Balenciaga Defender sneakers',
    price: 1850,
    category: { id: '2', name: 'Shoes', slug: 'shoes' },
    brand: { id: '2', name: 'Balenciaga', slug: 'balenciaga' },
    inStock: true,
    images: [{ id: '2', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'MARGIELA TABI BOOTS',
    slug: 'margiela-tabi-boots',
    description: 'Maison Margiela Tabi boots',
    price: 1450,
    category: { id: '2', name: 'Shoes', slug: 'shoes' },
    brand: { id: '3', name: 'Maison Margiela', slug: 'maison-margiela' },
    inStock: false,
    images: [{ id: '3', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'RAF SIMONS OVERSIZED BLAZER',
    slug: 'raf-simons-oversized-blazer',
    description: 'Oversized blazer by Raf Simons',
    price: 2200,
    category: { id: '3', name: 'Jackets', slug: 'jackets' },
    brand: { id: '4', name: 'Raf Simons', slug: 'raf-simons' },
    inStock: true,
    images: [{ id: '4', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    name: 'VETEMENTS HOODIE',
    slug: 'vetements-hoodie',
    description: 'Oversized hoodie from Vetements',
    price: 950,
    oldPrice: 1200,
    category: { id: '1', name: 'Hoodies', slug: 'hoodies' },
    brand: { id: '5', name: 'Vetements', slug: 'vetements' },
    inStock: true,
    images: [{ id: '5', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'CDG PLAY T-SHIRT',
    slug: 'cdg-play-t-shirt',
    description: 'Comme des Garçons PLAY t-shirt',
    price: 450,
    category: { id: '4', name: 'T-Shirts', slug: 't-shirts' },
    brand: { id: '6', name: 'Comme des Garçons', slug: 'comme-des-garcons' },
    inStock: true,
    images: [{ id: '6', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-06'
  },
  {
    id: '7',
    name: 'Y/PROJECT DENIM',
    slug: 'y-project-denim',
    description: 'Y/Project deconstructed denim',
    price: 780,
    category: { id: '5', name: 'Pants', slug: 'pants' },
    brand: { id: '7', name: 'Y/Project', slug: 'y-project' },
    inStock: true,
    images: [{ id: '7', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-07'
  },
  {
    id: '8',
    name: 'ERD LEATHER JACKET',
    slug: 'erd-leather-jacket',
    description: 'Leather jacket from Enfants Riches Déprimés',
    price: 3200,
    category: { id: '3', name: 'Jackets', slug: 'jackets' },
    brand: { id: '1', name: 'Enfants Riches Déprimés', slug: 'erd' },
    inStock: false,
    images: [{ id: '8', image: '/api/placeholder/400/500', isMain: true }],
    createdAt: '2024-01-08'
  }
];

const categories = [
  { id: 'all', name: 'ALL PRODUCTS', count: 8 },
  { id: 'hoodies', name: 'HOODIES', count: 2 },
  { id: 'jackets', name: 'JACKETS', count: 2 },
  { id: 'shoes', name: 'SHOES', count: 2 },
  { id: 't-shirts', name: 'T-SHIRTS', count: 1 },
  { id: 'pants', name: 'PANTS', count: 1 }
];

const brands = [
  'ALL BRANDS',
  'ERD',
  'BALENCIAGA', 
  'MAISON MARGIELA',
  'RAF SIMONS',
  'VETEMENTS',
  'COMME DES GARÇONS',
  'Y/PROJECT'
];

const priceRanges = [
  { id: 'all', label: 'ALL PRICES', min: 0, max: 10000 },
  { id: 'under500', label: 'UNDER $500', min: 0, max: 500 },
  { id: '500-1000', label: '$500 - $1000', min: 500, max: 1000 },
  { id: '1000-2000', label: '$1000 - $2000', min: 1000, max: 2000 },
  { id: 'over2000', label: 'OVER $2000', min: 2000, max: 10000 }
];

const Shop: React.FC = () => {
  useFeatherIcons();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('ALL BRANDS');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  // Фильтрация продуктов
  useEffect(() => {
    let filtered = [...mockProducts];

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category.slug === selectedCategory);
    }

    // Фильтр по бренду
    if (selectedBrand !== 'ALL BRANDS') {
      filtered = filtered.filter(product => product.brand.name.toUpperCase() === selectedBrand);
    }

    // Фильтр по цене
    if (selectedPriceRange !== 'all') {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(product => product.price >= range.min && product.price <= range.max);
      }
    }

    // Сортировка
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('ALL BRANDS');
    setSelectedPriceRange('all');
    setSortBy('newest');
  };

  return (
    <div className={styles.shop}>
      {/* Hero Section */}
      <section className={styles.shopHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>SHOP</h1>
          <p className={styles.heroSubtitle}>
            DISRUPTIVE FASHION FOR THE NEW GENERATION
          </p>
        </div>
      </section>

      <div className={styles.shopContainer}>
        {/* Sidebar Filters */}
        <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>FILTERS</h3>
            <button 
              className={styles.clearFilters}
              onClick={clearFilters}
            >
              CLEAR ALL
            </button>
          </div>

          {/* Categories */}
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>CATEGORIES</h4>
            <div className={styles.filterList}>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`${styles.filterItem} ${selectedCategory === category.id ? styles.filterItemActive : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className={styles.filterName}>{category.name}</span>
                  <span className={styles.filterCount}>({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>BRANDS</h4>
            <div className={styles.filterList}>
              {brands.map(brand => (
                <button
                  key={brand}
                  className={`${styles.filterItem} ${selectedBrand === brand ? styles.filterItemActive : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>PRICE RANGE</h4>
            <div className={styles.filterList}>
              {priceRanges.map(range => (
                <button
                  key={range.id}
                  className={`${styles.filterItem} ${selectedPriceRange === range.id ? styles.filterItemActive : ''}`}
                  onClick={() => setSelectedPriceRange(range.id)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <button 
                className={styles.filterToggle}
                onClick={() => setShowFilters(!showFilters)}
              >
                <i data-feather="filter"></i>
                FILTERS
              </button>
              <span className={styles.resultsCount}>
                {filteredProducts.length} PRODUCTS
              </span>
            </div>
            
            <div className={styles.toolbarRight}>
              <select 
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">NEWEST</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="name">NAME</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                className={styles.productCard}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className={styles.emptyState}>
              <i data-feather="search" className={styles.emptyIcon}></i>
              <h3 className={styles.emptyTitle}>NO PRODUCTS FOUND</h3>
              <p className={styles.emptyText}>
                Try adjusting your filters to find what you're looking for.
              </p>
              <button 
                className={styles.emptyButton}
                onClick={clearFilters}
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Overlay для мобильного фильтра */}
      {showFilters && (
        <div 
          className={styles.sidebarOverlay}
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Shop;