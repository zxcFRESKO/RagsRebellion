import React, { useState, useEffect } from 'react';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { type Product,type Category, type Brand } from '../../types';
import styles from './Shop.module.scss';

const Shop: React.FC = () => {
  useFeatherIcons();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Фильтры
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('newest');

  // Mock data
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setLoading(true);
      
      // Имитация загрузки данных
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCategories: Category[] = [
        { id: '1', name: 'T-Shirts', slug: 't-shirts' },
        { id: '2', name: 'Hoodies', slug: 'hoodies' },
        { id: '3', name: 'Pants', slug: 'pants' },
        { id: '4', name: 'Accessories', slug: 'accessories' }
      ];
      
      const mockBrands: Brand[] = [
        { id: '1', name: 'ViperSwag', slug: 'viperswag' },
        { id: '2', name: 'StreetStyle', slug: 'streetstyle' },
        { id: '3', name: 'UrbanCore', slug: 'urbancore' }
      ];
      
      const mockProducts: Product[] = [
        // ... добавить больше товаров (20+)
      ];
      
      setCategories(mockCategories);
      setBrands(mockBrands);
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    };

    loadData();
  }, []);

  // Применение фильтров
  useEffect(() => {
    let filtered = [...products];

    // Фильтр по категории
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.slug === selectedCategory
      );
    }

    // Фильтр по бренду
    if (selectedBrand) {
      filtered = filtered.filter(product => 
        product.brand.slug === selectedBrand
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy]);

  const clearFilters = (): void => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 500]);
    setSortBy('newest');
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        
        {/* Заголовок */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>All Products</h1>
          <p className={styles.pageDescription}>
            Discover our complete collection of streetwear essentials
          </p>
        </div>

        <div className={styles.shopContent}>
          
          {/* Сайдбар с фильтрами */}
          <aside className={styles.filtersSidebar}>
            <div className={styles.filtersHeader}>
              <h2 className={styles.filtersTitle}>Filters</h2>
              <button 
                className={styles.clearFilters}
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            {/* Фильтр по категориям */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Categories</h3>
              <div className={styles.filterOptions}>
                {categories.map(category => (
                  <label key={category.id} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="category"
                      value={category.slug}
                      checked={selectedCategory === category.slug}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={styles.filterInput}
                    />
                    <span className={styles.filterLabel}>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Фильтр по брендам */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Brands</h3>
              <div className={styles.filterOptions}>
                {brands.map(brand => (
                  <label key={brand.id} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="brand"
                      value={brand.slug}
                      checked={selectedBrand === brand.slug}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className={styles.filterInput}
                    />
                    <span className={styles.filterLabel}>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Фильтр по цене */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Price Range</h3>
              <div className={styles.priceRange}>
                <div className={styles.priceValues}>
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className={styles.priceSlider}
                />
              </div>
            </div>
          </aside>

          {/* Основной контент */}
          <main className={styles.productsMain}>
            
            {/* Панель управления */}
            <div className={styles.controlsBar}>
              <div className={styles.resultsCount}>
                Showing {filteredProducts.length} of {products.length} products
              </div>
              
              <div className={styles.sortControls}>
                <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Сетка товаров */}
            {filteredProducts.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={styles.productCard}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <i data-feather="search" className={styles.noResultsIcon}></i>
                <h3 className={styles.noResultsTitle}>No products found</h3>
                <p className={styles.noResultsText}>
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button 
                  className={styles.resetFilters}
                  onClick={clearFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
};

export default Shop;