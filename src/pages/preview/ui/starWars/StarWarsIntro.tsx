import { useEffect, useState } from 'react';

import s from './intro.module.scss';

interface IProps {
  onComplete?: () => void;
  duration?: number;
}

const StarWarsIntro = ({ onComplete, duration = 4000 }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 1000);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onComplete]);

  if (!shouldRender) return null;

  return (
    <div className={s.introContainer}>
      <div className={`${s.introText} ${isVisible ? s.visible : ''}`}>
        A long time ago in a galaxy far, far away...
      </div>
    </div>
  );
};

export default StarWarsIntro;
