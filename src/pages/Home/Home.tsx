import React, { useRef } from 'react';
import Hero from '../../components/home/Hero/Hero';
import FeaturedProducts from '../../components/home/FeaturedProducts/FeaturedProducts';
import Collections from '../../components/home/Collections/Collections';
// import About from '../../components/home/About/About';
// import Newsletter from '../../components/home/Newsletter/Newsletter';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  useFeatherIcons();
  const vantaRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let vantaEffect: any;

//     const initializeVanta = async (): Promise<void> => {
//       if (typeof window !== 'undefined' && vantaRef.current) {
//         try {
//         //   const { default: VANTA } = await import('vanta/dist/vanta.waves.min');
          
//     //       vantaEffect = VANTA({
//     //         el: vantaRef.current,
//     //         mouseControls: true,
//     //         touchControls: true,
//     //         gyroControls: false,
//     //         minHeight: 200.00,
//     //         minWidth: 200.00,
//     //         scale: 1.00,
//     //         scaleMobile: 1.00,
//     //         color: 0x1a1a1a,
//     //         shininess: 35.00,
//     //         waveHeight: 15.00,
//     //         waveSpeed: 0.85,
//     //         zoom: 0.75
//     //       });
//     //     } catch (error) {
//     //       console.warn('VANTA effect could not be loaded:', error);
//     //     }
//     //   }
//     // };

//     initializeVanta();

//     return () => {
//       if (vantaEffect) {
//         vantaEffect.destroy();
//       }
//     };
//   }, []);

  return (
    <div className={styles.home}>
      <div ref={vantaRef} className={styles.vantaBackground}></div>
      <Hero />
      <FeaturedProducts />
      <Collections />
      {/* <About /> */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default Home;