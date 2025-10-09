import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFeatherIcons } from '../../../hooks/useFeatherIcons';
import { classNames } from '../../../utils/helpers';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  useFeatherIcons();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays correctly
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Video */}
      <div className={styles.videoOverlay}></div>
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className={styles.heroVideo}
      >
        <source 
          src="https://static.videezy.com/system/resources/previews/000/045/622/original/4K_098.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1 className={classNames(styles.heroTitle, 'logo-font')}>
          <span className={styles.titleLine}>DROP</span>
          <span className={styles.titleLine}>THE</span>
          <span className={styles.titleLine}>SWAG</span>
        </h1>
        
        <p className={styles.heroDescription}>
          Limited edition streetwear that speaks your vibe. Exclusive drops every week.
        </p>
        
        <div className={styles.heroActions}>
          <Link to="/shop" className={styles.primaryButton}>
            Shop Now 
            <i data-feather="arrow-right" className={styles.buttonIcon}></i>
          </Link>
          <Link to="/collections" className={styles.secondaryButton}>
            View Collections
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <a href="#featured" className={styles.scrollLink}>
          <i data-feather="chevron-down" className={styles.scrollIcon}></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;