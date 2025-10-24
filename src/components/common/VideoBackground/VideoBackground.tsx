import React, { useEffect, useRef, useState } from 'react';
import styles from './VideoBackground.module.scss';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage?: string;
  className?: string;
  overlayOpacity?: number;
  filter?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoSrc, 
  fallbackImage = '/images/newsletter-fallback.jpg',
  className = '',
  overlayOpacity = 0.7,
  filter = 'brightness(0.4) contrast(1.1)'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !videoError) {
      const playVideo = async () => {
        try {
          await video.play();
          setIsLoading(false);
        } catch (error) {
          console.log('Video autoplay failed:', error);
          setVideoError(true);
          setIsLoading(false);
        }
      };

      playVideo();
    }
  }, [videoError]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  // Если ошибка видео, показываем fallback изображение
  if (videoError && fallbackImage) {
    return (
      <div 
        className={`${styles.videoBackground} ${className}`}
        style={{ 
          backgroundImage: `url(${fallbackImage})`,
          filter 
        }}
      >
        <div 
          className={styles.videoOverlay}
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.videoBackground} ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className={styles.videoLoading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className={styles.videoElement}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        style={{ filter }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div 
        className={styles.videoOverlay}
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default VideoBackground;