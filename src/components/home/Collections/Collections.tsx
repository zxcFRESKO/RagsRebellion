import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../../utils/helpers';
import styles from './Collections.module.scss';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  theme: 'pink' | 'cyan' | 'white';
}

const collections: Collection[] = [
  {
    id: '1',
    name: 'Underground',
    description: 'Raw, unfiltered street culture',
    image: '/api/placeholder/600/800',
    slug: 'underground',
    theme: 'pink'
  },
  {
    id: '2',
    name: 'Neon Dreams',
    description: 'Vibrant after-hours aesthetic',
    image: '/api/placeholder/600/800',
    slug: 'neon-dreams',
    theme: 'cyan'
  },
  {
    id: '3',
    name: 'Monochrome',
    description: 'Minimal meets maximum impact',
    image: '/api/placeholder/600/800',
    slug: 'monochrome',
    theme: 'white'
  }
];

const Collections: React.FC = () => {
  const getThemeColor = (theme: Collection['theme']): string => {
    const colors = {
      pink: styles.themePink,
      cyan: styles.themeCyan,
      white: styles.themeWhite
    };
    return colors[theme];
  };

  return (
    <section className={styles.collectionsSection}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={classNames(styles.sectionTitle, 'logo-font')}>
            <span className={styles.titleWhite}>COLLECT</span>{' '}
            <span className={styles.titleCyan}>THEM ALL</span>
          </h2>
          <p className={styles.sectionDescription}>
            Each collection tells a story. Find your vibe and wear it proud.
          </p>
        </div>

        {/* Collections Grid */}
        <div className={styles.collectionsGrid}>
          {collections.map((collection) => (
            <article key={collection.id} className={styles.collectionCard}>
              <Link to={`/collections/${collection.slug}`} className={styles.collectionLink}>
                <div className={styles.imageContainer}>
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className={styles.collectionImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}></div>
                  
                  <div className={styles.collectionContent}>
                    <h3 className={styles.collectionName}>{collection.name}</h3>
                    <p className={styles.collectionDescription}>
                      {collection.description}
                    </p>
                    <span className={classNames(styles.exploreLink, getThemeColor(collection.theme))}>
                      Explore <i data-feather="arrow-right" className={styles.linkIcon}></i>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Collections;