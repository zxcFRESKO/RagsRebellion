import React, { useEffect, useRef, useState } from 'react';
import imagee from '../../assets/images/ab8dd86e98a886671f511d8fcf13fd76.jpg'
import dream from '../../assets/images/dream.jpg'
import eyes from '../../assets/images/eyes.jpg'
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import styles from './Home.module.scss';

const Home: React.FC = () => {  
  useFeatherIcons();
  const vantaRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Ваши картинки для слоев
  const layerImages = {
    background: dream,    // Лес с туманом (фон)
    castle: eyes,           // Замок (передний план)
    middle: '/images/mountains.png'         // Горы (средний план, опционально)
  };

  // Обработчик скролла для анимации
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroSection = heroRef.current;
        const rect = heroSection.getBoundingClientRect();
        const progress = 1 - (rect.bottom / window.innerHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vanta.js эффект
  useEffect(() => {
    if (typeof window !== 'undefined' && vantaRef.current) {
      // @ts-ignore
      if (window.VANTA && window.VANTA.WAVES) {
        // @ts-ignore
        const effect = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x1a1a1a,
          shininess: 50.00,
          waveHeight: 20.00,
          waveSpeed: 0.50,
          zoom: 0.65
        });

        return () => {
          if (effect) effect.destroy();
        };
      }
    }
  }, []);

  const featuredProducts = [
    {
      id: '1',
      name: 'ERD Distressed Hoodie',
      brand: 'Enfants Riches Déprimés',
      price: 1250,
      image: 'http://static.photos/fashion/1024x576/1'
    },
    {
      id: '2', 
      name: 'Balenciaga Defender',
      brand: 'Balenciaga',
      price: 1850,
      image: 'http://static.photos/fashion/1024x576/2'
    },
    {
      id: '3',
      name: 'Margiela Tabi Boots', 
      brand: 'Maison Margiela',
      price: 1450,
      image: 'http://static.photos/fashion/1024x576/3'
    }
  ];

  const brands = ['ERD', 'BALENCIAGA', 'MAISON MARGIELA', 'RAF SIMONS', 'VETEMENTS', 'COMME DES GARÇONS', 'Y/PROJECT'];

  return (
    <div className={styles.home}>
      {/* Hero Section с параллакс эффектом */}
      <section ref={heroRef} className={styles.hero}>
        {/* Слои параллакса */}
        <div className={styles.parallaxContainer}>
          {/* Фоновый слой - лес с туманом */}
          <div 
            className={styles.parallaxLayer}
            style={{ 
              backgroundImage: `url(${layerImages.background})`,
              transform: `translateY(${scrollProgress * 50}px) scale(${1 + scrollProgress * 0.1})`
            }}
          />
          
          {/* Vanta.js эффект поверх фона */}
          <div ref={vantaRef} className={styles.vantaBackground}></div>
          
          {/* Средний слой - горы (опционально) */}
          {layerImages.middle && (
            <div 
              className={`${styles.parallaxLayer} ${styles.middleLayer}`}
              style={{ 
                backgroundImage: `url(${layerImages.middle})`,
                transform: `translateY(${scrollProgress * 100}px)`,
                opacity: 1 - scrollProgress * 2
              }}
            />
          )}
          
          {/* Передний слой - замок */}
          <div 
            className={`${styles.parallaxLayer} ${styles.foregroundLayer}`}
            style={{ 
              backgroundImage: `url(${layerImages.castle})`,
              transform: `translateY(${scrollProgress * 150}px) scale(${1 + scrollProgress * 0.2})`,
              opacity: 1 - scrollProgress * 3
            }}
          />
        </div>
        
        {/* Затемнение */}
        <div 
          className={styles.heroOverlay}
          style={{ opacity: 0.6 + scrollProgress * 0.4 }}
        />
        
        {/* Контент */}
        <div className={styles.heroContent}>
          <h1 
            className={styles.heroTitle}
            style={{ 
              transform: `translateY(${scrollProgress * 100}px)`,
              opacity: 1 - scrollProgress * 1.5
            }}
          >
            <span className={styles.textStroke}>WEAR</span> 
            <span className={styles.textRed}>THE</span> 
            <span className={styles.textStroke}>REBELLION</span>
          </h1>
          <p 
            className={styles.heroSubtitle}
            style={{ 
              transform: `translateY(${scrollProgress * 80}px)`,
              opacity: 1 - scrollProgress * 2
            }}
          >
            Disruptive fashion for the new generation. Limited drops from ERD, Balenciaga, Maison Margiela, and more.
          </p>
          <div 
            className={styles.heroButtons}
            style={{ 
              transform: `translateY(${scrollProgress * 60}px)`,
              opacity: 1 - scrollProgress * 2.5
            }}
          >
            <Link to="/shop" className={styles.primaryButton}>Shop Now</Link>
            <Link to="/drops" className={styles.outlineButton}>View Drops</Link>
          </div>
          
          {/* Стрелка скролла */}
          <div 
            className={styles.scrollDown}
            style={{ opacity: 1 - scrollProgress * 4 }}
          >
            <i data-feather="chevron-down" className={styles.scrollIcon}></i>
          </div>
        </div>
        
        {/* Индикатор прогресса скролла */}
        <div className={styles.scrollProgress}>
          <div 
            className={styles.progressBar}
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </section>

      {/* Brand Marquee */}
      <section className={styles.brandMarquee}>
        <div className={styles.marqueeContent}>
          {[...brands, ...brands].map((brand, index) => (
            <span key={index} className={styles.brandName}>{brand}</span>
          ))}
        </div>
      </section>

      {/* Остальные секции... */}
      <section className={styles.featuredDrops}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.textStroke}>LATEST</span> 
              <span className={styles.textRed}>DROPS</span>
            </h2>
            <Link to="/shop" className={styles.viewAllLink}>
              View All <i data-feather="arrow-right" className={styles.arrowIcon}></i>
            </Link>
          </div>
          
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <div className={styles.productOverlay}>
                    <h3 className={styles.productOverlayTitle}>{product.name}</h3>
                    <p className={styles.productOverlaySubtitle}>Limited Edition Drop</p>
                    <button className={styles.quickAddButton}>Quick Add</button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productBrand}>{product.brand}</p>
                  <p className={styles.productPrice}>${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Full Width Banner */}
      <section className={styles.fullBanner}>
        <div className={styles.bannerImage}>
          <img 
            src={imagee}
            alt="Rebellion Campaign" 
            className={styles.bannerImg}
          />
        </div>
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>
            <span className={styles.textStroke}>DRESS</span> 
            <span className={styles.textRed}>TO</span> 
            <span className={styles.textStroke}>DESTROY</span>
          </h2>
          <p className={styles.bannerText}>
            Our curation process ensures only the most disruptive pieces make the cut.
          </p>
          <Link to="/about" className={styles.outlineButton}>Explore The Movement</Link>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className={styles.instagramSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.textStroke}>JOIN</span> 
              <span className={styles.textRed}>THE REBELLION</span>
            </h2>
            <a href="#" className={styles.viewAllLink}>
              @ragsrebellion <i data-feather="arrow-right" className={styles.arrowIcon}></i>
            </a>
          </div>
          
          <div className={styles.instagramGrid}>
            {[5, 6, 7, 8].map((num) => (
              <div key={num} className={styles.instagramItem}>
                <img 
                  src={`http://static.photos/fashion/640x360/${num}`}
                  alt="Instagram Post"
                  className={styles.instagramImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>
            <span className={styles.textStroke}>GET</span> 
            <span className={styles.textRed}>EXCLUSIVE</span> 
            <span className={styles.textStroke}>ACCESS</span>
          </h2>
          <p className={styles.newsletterText}>
            Sign up for early access to drops, private events, and 10% off your first order.
          </p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your Email" 
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.primaryButton}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;