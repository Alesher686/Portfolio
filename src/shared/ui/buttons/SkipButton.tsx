import { useState, useEffect } from 'react';

import s from './skipButton.module.scss';

interface IProps {
  onSkip: () => void;
  isVisible: boolean;
}

const SkipButton = ({ onSkip, isVisible }: IProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowButton(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`${s.skipContainer} ${showButton ? s.visible : ''}`}>
      <button className={s.skipButton} onClick={onSkip} type="button">
        <span className={s.skipText}>Skip</span>
        <span className={s.skipIcon}>→</span>
      </button>
    </div>
  );
};

export default SkipButton;
