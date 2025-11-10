import { useEffect, useState, useMemo, useRef } from 'react';

import StarWarsIntro from '@/pages/preview/ui/starWars/StarWarsIntro.tsx';
import StarWarsText from '@/pages/preview/ui/starWars/StarWarsText.tsx';
import type { IStarWarsTextRef } from '@/pages/preview/ui/starWars/StarWarsText.tsx';
import { useNavigation } from '@/shared/contexts/navigationContext.tsx';
import SkipButton from '@/shared/ui/buttons/SkipButton.tsx';
import { ParticlesBackground } from '@/shared/ui/particles/ParticlesBackground.tsx';
import { FadeOutComponent } from '@/shared/ui/transitors/FadeOutComponent.tsx';
import { useNavigate } from 'react-router-dom';

import s from './preview.module.scss';

const Preview = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setNavigateWithAnimation } = useNavigation();
  const navigate = useNavigate();
  const starWarsTextRef = useRef<IStarWarsTextRef>(null);

  const particlesBackground = useMemo(() => <ParticlesBackground />, []);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  };

  const handleSkip = async () => {
    if (starWarsTextRef.current) {
      await starWarsTextRef.current.handleSkip();
    } else {
      console.warn('⚠️ StarWarsText ref not available, using fallback');
      setIsVisible(false);
    }
  };

  const navigateToMain = () => {
    setNavigateWithAnimation();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/main');
    }, 1000);
  };

  useEffect(() => {
    if (!isVisible) {
      navigateToMain();
    }
  }, [isVisible]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={s.previewWrapper}>
      {showIntro && <StarWarsIntro onComplete={handleIntroComplete} />}
      <div className={s.previewContent}>
        <div className={s.starWarsText}>
          {introCompleted && (
            <StarWarsText ref={starWarsTextRef} isVisible={isVisible} setIsVisible={setIsVisible} />
          )}
        </div>
      </div>
      <SkipButton onSkip={handleSkip} isVisible={introCompleted && isVisible} />
      {particlesBackground}
      {isTransitioning && <FadeOutComponent />}
    </div>
  );
};

export default Preview;
