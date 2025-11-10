import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import { useAudio } from '@/shared/lib/useAudio.ts';

import s from './audioControl.module.scss';

interface IProps {
  isVisible: boolean;
  audioSrc: string;
}

export interface IAudioControlRef {
  fadeOutAndStop: (duration?: number) => Promise<void>;
}

const AudioControl = forwardRef<IAudioControlRef, IProps>(({ isVisible, audioSrc }, ref) => {
  const [showButton, setShowButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const audioHook = useAudio(audioSrc, {
    autoPlay: true,
    loop: true,
    volume: 0.3,
  });

  const {
    play,
    stopWithFade,
    toggleMute,
    isPlaying,
    isMuted,
    isLoaded,
    isFading,
    error,
    canAutoPlay,
  } = audioHook;

  useImperativeHandle(
    ref,
    () => ({
      fadeOutAndStop: async (duration = 1000) => {
        console.log('🎵 External fade out request');
        if (stopWithFade && isPlaying) {
          await stopWithFade(duration);
        }
      },
    }),
    [stopWithFade, isPlaying]
  );

  useEffect(() => {
    const status = {
      '🎵 Loaded': isLoaded ? '✅' : '⏳',
      '▶️ Playing': isPlaying ? '✅' : '❌',
      '🔇 Muted': isMuted ? '✅' : '❌',
      '🔉 Fading': isFading ? '✅' : '❌',
      '🚀 Can AutoPlay': canAutoPlay ? '✅' : '❌',
      '👁️ Visible': isVisible ? '✅' : '❌',
      '🎛️ Button Shown': showButton ? '✅' : '❌',
    };

    console.log('🎵 Audio Control Status:', status);

    if (error) {
      console.error('❌ Audio Error:', error);
    }
  }, [isLoaded, isPlaying, isMuted, isFading, canAutoPlay, isVisible, showButton, error]);

  useEffect(() => {
    if (isVisible) {
      console.log('🎬 Audio control becoming visible');
      const timer = setTimeout(() => {
        setShowButton(true);
        setTimeout(() => setIsAnimating(true), 50);
        console.log('🎛️ Audio control buttons shown');
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      console.log('🎬 Audio control becoming hidden');
      setIsAnimating(false);
      setTimeout(() => setShowButton(false), 300);

      // НЕ останавливаем аудио здесь автоматически,
      // это будет делаться через внешний вызов fadeOutAndStop
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && isLoaded && !isPlaying && play) {
      console.log('🚀 Attempting forced autoplay');
      const attemptPlay = async () => {
        try {
          await play();
          console.log('✅ Forced autoplay successful');
        } catch (e) {
          console.log('❌ Could not autoplay, user will need to interact:', e);
        }
      };

      const timer = setTimeout(attemptPlay, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded, isPlaying, play]);

  useEffect(() => {
    if (error) {
      console.error('🔴 Audio Component Error:', error);
    }
  }, [error]);

  if (!showButton) return null;

  const handleButtonClick = () => {
    console.log('🎯 Audio buttons clicked');
    if (isPlaying && toggleMute) {
      console.log('🔇 Toggling mute');
      toggleMute();
    } else if (play) {
      console.log('▶️ Manual play triggered');
      play();
    }
  };

  return (
    <div className={`${s.audioControlContainer} ${isAnimating ? s.visible : s.hidden}`}>
      <button
        className={`${s.audioButton} ${isMuted ? s.muted : !isLoaded ? s.loading : ''} ${isFading ? s.fading : ''}`}
        onClick={handleButtonClick}
        type="button"
        title={
          !isLoaded
            ? 'Загружается музыка...'
            : isFading
              ? 'Звук затухает...'
              : isPlaying
                ? isMuted
                  ? 'Включить звук'
                  : 'Выключить звук'
                : 'Воспроизвести музыку'
        }
        disabled={!isLoaded || isFading}
      >
        <div className={`${s.iconContainer} ${!isLoaded ? s.rotating : ''}`}>
          {!isLoaded ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : !isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="8,5 19,12 8,19" fill="currentColor" />
            </svg>
          ) : isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>

        <span className={s.buttonText}>
          {!isLoaded
            ? 'Loading...'
            : isFading
              ? 'Fading...'
              : !isPlaying
                ? 'Play'
                : isMuted
                  ? 'Sound off'
                  : 'Sound on'}
        </span>
      </button>

      {isPlaying && !isMuted && !isFading && (
        <div className={s.visualizer}>
          <div className={s.bar}></div>
          <div className={s.bar}></div>
          <div className={s.bar}></div>
        </div>
      )}
    </div>
  );
});

AudioControl.displayName = 'AudioControl';

export default AudioControl;
