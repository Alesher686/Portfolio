import { useEffect, useRef, useState, useCallback } from 'react';

interface UseAudioOptions {
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

export const useAudio = (src: string, options: UseAudioOptions = {}) => {
  const { autoPlay = false, loop = false, volume = 1 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canAutoPlay, setCanAutoPlay] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const fadeIntervalRef = useRef<number | null>(null);
  const originalVolumeRef = useRef<number>(volume);

  useEffect(() => {
    const audioState = {
      src,
      autoPlay,
      loop,
      volume,
      isLoaded,
      isPlaying,
      isMuted,
      canAutoPlay,
      hasError: !!error,
      isFading,
    };

    console.log('🎵 Audio Hook State:', audioState);
  }, [src, autoPlay, loop, volume, isLoaded, isPlaying, isMuted, canAutoPlay, error, isFading]);

  const play = useCallback(async () => {
    if (!audioRef.current) {
      console.warn('🔸 Audio ref is null');
      return;
    }

    if (!isLoaded) {
      console.warn('🔸 Audio not loaded yet');
      return;
    }

    try {
      console.log('🚀 Attempting to play audio');
      await audioRef.current.play();
      console.log('✅ Audio play successful');
    } catch (error) {
      console.error('❌ Error playing audio:', error);
      setError(`Play error: ${error}`);
    }
  }, [isLoaded]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      console.log('⏸️ Pausing audio');
      audioRef.current.pause();
    }
  }, []);

  const fadeOut = useCallback(
    (duration: number = 1000): Promise<void> => {
      return new Promise((resolve) => {
        if (!audioRef.current || !isPlaying) {
          resolve();
          return;
        }

        console.log('🔉 Starting fade out');
        setIsFading(true);

        const audio = audioRef.current;
        const startVolume = audio.volume;
        const fadeStep = startVolume / (duration / 50);
        let currentVolume = startVolume;

        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }

        fadeIntervalRef.current = window.setInterval(() => {
          currentVolume -= fadeStep;

          if (currentVolume <= 0) {
            currentVolume = 0;
            audio.volume = 0;

            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }

            setIsFading(false);
            console.log('🔇 Fade out completed');
            resolve();
          } else {
            audio.volume = currentVolume;
          }
        }, 50);
      });
    },
    [isPlaying]
  );

  const fadeIn = useCallback((duration: number = 1000): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }

      console.log('🔊 Starting fade in');
      setIsFading(true);

      const audio = audioRef.current;
      const targetVolume = originalVolumeRef.current;
      const fadeStep = targetVolume / (duration / 50);
      let currentVolume = 0;

      audio.volume = 0;

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      fadeIntervalRef.current = window.setInterval(() => {
        currentVolume += fadeStep;

        if (currentVolume >= targetVolume) {
          currentVolume = targetVolume;
          audio.volume = targetVolume;

          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }

          setIsFading(false);
          console.log('🔊 Fade in completed');
          resolve();
        } else {
          audio.volume = currentVolume;
        }
      }, 50);
    });
  }, []);

  const stopWithFade = useCallback(
    async (fadeDuration: number = 1000) => {
      if (!audioRef.current) return;

      console.log('⏹️ Stopping audio with fade');
      await fadeOut(fadeDuration);

      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      audioRef.current.volume = originalVolumeRef.current;
    },
    [fadeOut]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      console.log('⏹️ Stopping audio immediately');

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = originalVolumeRef.current;
      setIsFading(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      console.log(`🔇 Audio ${newMutedState ? 'muted' : 'unmuted'}`);
    }
  }, []);

  const setVolumeLevel = useCallback((newVolume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = clampedVolume;
      originalVolumeRef.current = clampedVolume;
      console.log('🔊 Volume set to:', clampedVolume);
    }
  }, []);

  const checkAutoPlayCapability = useCallback(async () => {
    try {
      console.log('🧪 Testing autoplay capability...');
      const testAudio = new Audio();
      testAudio.volume = 0;
      testAudio.muted = true;

      testAudio.src =
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2+LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIGZdP2/7dYEgxZndd5';

      await testAudio.play();
      testAudio.pause();

      setCanAutoPlay(true);
      console.log('✅ AutoPlay is supported');
      return true;
    } catch (e) {
      console.log('🚫 AutoPlay not supported, will require user interaction');
      setCanAutoPlay(false);
      return false;
    }
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    let hasInteracted = false;

    const handleFirstInteraction = async () => {
      if (!hasInteracted && audioRef.current && isLoaded) {
        hasInteracted = true;
        console.log('👆 First user interaction detected, attempting autoplay');

        try {
          await play();
        } catch (error) {
          console.error('❌ Failed to play on interaction:', error);
        }

        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);

        console.log('🧹 Removed interaction listeners');
      }
    };

    console.log('👂 Adding interaction listeners for autoplay');

    document.addEventListener('click', handleFirstInteraction, { passive: true });
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    document.addEventListener('keydown', handleFirstInteraction, { passive: true });
    document.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      console.log('🧹 Cleaned up interaction listeners');
    };
  }, [autoPlay, isLoaded, play]);

  useEffect(() => {
    if (!src) {
      console.warn('🔸 Audio src is empty');
      return;
    }

    console.log('📥 Loading audio from:', src);

    audioRef.current = new Audio();
    const audio = audioRef.current;

    audio.loop = loop;
    audio.volume = volume;
    originalVolumeRef.current = volume;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    console.log('⚙️ Audio configured:', { loop, volume, preload: 'auto' });

    const handleCanPlayThrough = async () => {
      console.log('✅ Audio can play through');
      setIsLoaded(true);
      setError(null);

      await checkAutoPlayCapability();

      if (autoPlay) {
        try {
          await audio.play();
          console.log('🎉 Autoplay successful');
        } catch (e) {
          console.log('🚫 Autoplay blocked, waiting for user interaction');
        }
      }
    };

    const handleLoadedData = () => {
      console.log('📊 Audio loaded data');
      setIsLoaded(true);
      setError(null);
    };

    const handlePlay = () => {
      console.log('▶️ Audio started playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('⏸️ Audio paused');
      setIsPlaying(false);
    };

    const handleEnded = () => {
      console.log('🏁 Audio ended');
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const errorMessage = `Audio error: ${target.error?.message || 'Unknown error'}`;
      console.error('💥 Audio error occurred:', errorMessage);
      setError(errorMessage);
      setIsLoaded(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    console.log('👂 Audio event listeners added');

    audio.src = src;
    audio.load();

    console.log('📡 Audio loading started');

    return () => {
      console.log('🧹 Cleaning up audio');

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      console.log('✅ Audio cleanup completed');
    };
  }, [src, loop, volume, autoPlay, checkAutoPlayCapability]);

  return {
    play,
    pause,
    stop,
    stopWithFade,
    fadeIn,
    fadeOut,
    toggleMute,
    setVolume: setVolumeLevel,
    isPlaying,
    isMuted,
    isLoaded,
    isFading,
    error,
    canAutoPlay,
    audioRef,
  };
};
