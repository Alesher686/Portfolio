import { useEffect, useRef, useState } from 'react';

import LaptopCanvas from '@/shared/ui/canvas/Laptop.tsx';
import { DecryptedText } from '@/shared/ui/decryptedText/DecryptedText.tsx';
import { FlexContainer } from '@/shared/ui/flexContainer/FlexContainer.tsx';
import Particles from '@/shared/ui/particles/Particles.tsx';

import s from './lapTopGame.module.scss';

export const LapTopGame = () => {
  const [shouldLoadLaptop, setShouldLoadLaptop] = useState(false);
  const laptopContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadLaptop) {
            setShouldLoadLaptop(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: '50px',
      }
    );

    if (laptopContainerRef.current) {
      observer.observe(laptopContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldLoadLaptop]);

  return (
    <section id={'introduction'}>
      <div className={s.headerContentWrapper}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={300}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={70}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={10}
          className={s.particlesContainer}
        />
        <FlexContainer alignment={'centered'}>
          <div className={s.textContainer}>
            <DecryptedText
              text={'Hello,'}
              animateOn={'view'}
              sequential={true}
              className={s.titleText}
              encryptedClassName={s.encrypted}
            />
            <DecryptedText
              text={'My name is Alexandr'}
              animateOn={'view'}
              sequential={true}
              className={s.subDescription}
              encryptedClassName={s.encrypted}
            />
            <DecryptedText
              text={'I create user interfaces and web applications'}
              animateOn={'view'}
              sequential={true}
              className={s.subDescription}
              encryptedClassName={s.encrypted}
            />
          </div>
          <div
            ref={laptopContainerRef}
            style={{ width: '100%', height: '400px', position: 'relative' }}
          >
            {shouldLoadLaptop && <LaptopCanvas />}
          </div>
        </FlexContainer>
      </div>
    </section>
  );
};
