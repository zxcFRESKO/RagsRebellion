import React, { useEffect, useRef, useState } from 'react';
import imagee from '../../assets/images/ab8dd86e98a886671f511d8fcf13fd76.jpg'
import dream from '../../assets/images/dream.jpg'
import eyes from '../../assets/images/eyes.jpg'
import erd from '../../assets/images/erd.jpg'
import tabi from '../../assets/images/tabi.jpg'
import shouroom from '../../assets/images/shouroom.jpg'
import balenciagaDefender from '../../assets/images/balenciagadefender.jpg'
import newslBgVideo from '../../assets/videos/newsletter-background.mp4'
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import styles from './Home.module.scss';
import VideoBackground from '../../components/common/VideoBackground/VideoBackground';

const Home: React.FC = () => {
  useFeatherIcons();
  const vantaRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Ваши картинки для слоев
  const layerImages = {
    background: dream,
    castle: eyes,
    middle: '/images/mountains.png'
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
      image: erd,
    },
    {
      id: '2',
      name: 'Balenciaga Defender',
      brand: 'Balenciaga',
      price: 1850,
      image: balenciagaDefender,
    },
    {
      id: '3',
      name: 'Margiela Tabi Boots',
      brand: 'Maison Margiela',
      price: 1450,
      image: tabi
    }
  ];

  const newsletterVideo = newslBgVideo

  const brands = ['ERD', 'BALENCIAGA', 'MAISON MARGIELA', 'RAF SIMONS', 'VETEMENTS', 'COMME DES GARÇONS', 'Y/PROJECT'];

  return (
    <div className={styles.home}>
      {/* Hero Section с параллакс эффектом */}
      <section ref={heroRef} className={styles.hero}>
        {/* Слои параллакса */}
        <div className={styles.parallaxContainer}>
          {/* Фоновый слой */}
          <div
            className={styles.parallaxLayer}
            style={{
              backgroundImage: `url(${layerImages.background})`,
              transform: `translateY(${scrollProgress * 30}px) scale(${1 + scrollProgress * 0.05})`
            }}
          />

          {/* Vanta.js эффект поверх фона */}
          <div ref={vantaRef} className={styles.vantaBackground}></div>

          {/* Средний слой */}
          {layerImages.middle && (
            <div
              className={`${styles.parallaxLayer} ${styles.middleLayer}`}
              style={{
                backgroundImage: `url(${layerImages.middle})`,
                transform: `translateY(${scrollProgress * 60}px)`,
                opacity: 1 - scrollProgress * 1.5
              }}
            />
          )}

          {/* Передний слой */}
          <div
            className={`${styles.parallaxLayer} ${styles.foregroundLayer}`}
            style={{
              backgroundImage: `url(${layerImages.castle})`,
              transform: `translateY(${scrollProgress * 90}px) scale(${1 + scrollProgress * 0.1})`,
              opacity: 1 - scrollProgress * 2
            }}
          />
        </div>

        {/* Затемнение */}
        <div
          className={styles.heroOverlay}
          style={{ opacity: 0.7 + scrollProgress * 0.3 }}
        />

        {/* Контент */}
        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <h1
              className={styles.heroTitle}
              style={{
                transform: `translateY(${scrollProgress * 50}px)`,
                opacity: 1 - scrollProgress * 1.2
              }}
            >
              <span className={styles.textStroke}>WEAR</span>
              <span className={styles.textRed}>THE</span>
              <span className={styles.textStroke}>REBELLION</span>
            </h1>
            <p
              className={styles.heroSubtitle}
              style={{
                transform: `translateY(${scrollProgress * 40}px)`,
                opacity: 1 - scrollProgress * 1.5
              }}
            >
              Disruptive fashion for the new generation. Limited drops from ERD, Balenciaga, Maison Margiela, and more.
            </p>
            <div
              className={styles.heroButtons}
              style={{
                transform: `translateY(${scrollProgress * 30}px)`,
                opacity: 1 - scrollProgress * 2
              }}
            >
              <Link to="/shop" className={styles.primaryButton}>
                <span>Shop Now</span>
                <i data-feather="arrow-right"></i>
              </Link>
              <Link to="/drops" className={styles.outlineButton}>
                View Drops
              </Link>
            </div>
          </div>

          {/* Стрелка скролла */}
          <div
            className={styles.scrollDown}
            style={{ opacity: 1 - scrollProgress * 3 }}
          >
            <div className={styles.scrollText}>SCROLL</div>
            <div className={styles.scrollLine}></div>
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
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className={styles.brandItem}>
                <span className={styles.brandName}>{brand}</span>
                <div className={styles.brandDot}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drops */}
      {/* Featured Drops */}
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
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productHoverActions}>
                <button className={styles.quickViewButton}>
                  <i data-feather="eye"></i>
                </button>
                <button className={styles.wishlistButton}>
                  <i data-feather="heart"></i>
                </button>
              </div>
            </div>
            <div className={styles.productOverlay}>
              <div className={styles.overlayContent}>
                <h3 className={styles.productOverlayTitle}>{product.name}</h3>
                <p className={styles.productOverlaySubtitle}>Limited Edition</p>
                <button className={styles.quickAddButton}>
                  <i data-feather="shopping-bag"></i>
                  Quick Add - ${product.price}
                </button>
              </div>
            </div>
            <div className={styles.productBadge}>NEW</div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h3 className={styles.productName}>{product.name}</h3>
              <button className={styles.wishlistIcon}>
                <i data-feather="heart"></i>
              </button>
            </div>
            <p className={styles.productBrand}>{product.brand}</p>
            <div className={styles.productFooter}>
              <p className={styles.productPrice}>${product.price.toLocaleString()}</p>
              <div className={styles.productColors}>
                <span className={styles.colorOption} style={{backgroundColor: '#000'}}></span>
                <span className={styles.colorOption} style={{backgroundColor: '#555'}}></span>
                <span className={styles.colorOption} style={{backgroundColor: '#900'}}></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Full Width Banner */}
      <section className={styles.fullBanner}>
        <div className={styles.bannerBackground}>
          <div className={styles.bannerImage}>
            <img
              src={imagee}
              alt="Rebellion Campaign"
              className={styles.bannerImg}
            />
          </div>
          <div className={styles.bannerOverlay}></div>
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
          <Link to="/about" className={styles.bannerButton}>
            <span>Explore The Movement</span>
            <i data-feather="arrow-up-right"></i>
          </Link>
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={styles.instagramItem}>
                <div className={styles.instagramImageWrapper}>
                  <img
                    src={shouroom}
                    alt="Instagram Post"
                    className={styles.instagramImage}
                  />
                  <div className={styles.instagramOverlay}>
                    <i data-feather="heart" className={styles.instagramIcon}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <VideoBackground
          videoSrc={newsletterVideo}
          fallbackImage="/images/newsletter-fallback.jpg"
          overlayOpacity={0.8}
          filter="brightness(0.3) contrast(1.2)"
        />

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
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                <span>Subscribe</span>
                <i data-feather="send"></i>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;