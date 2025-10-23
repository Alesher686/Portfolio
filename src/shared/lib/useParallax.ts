import { useEffect, useRef, useCallback } from 'react';

interface UseParallaxOptions {
  speed?: number;
  maxScroll?: number;
  offset?: number;
  disabled?: boolean;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, maxScroll = 1400, offset = 0, disabled = false } = options;

  const elementRef = useRef<HTMLElement>(null);

  const updateTransform = useCallback(
    (scrollY: number) => {
      if (!elementRef.current || disabled) return;

      if (scrollY > maxScroll) return;

      const parallaxOffset = -(scrollY * speed) + offset;
      elementRef.current.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    },
    [speed, maxScroll, offset, disabled]
  );

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = Math.max(window.pageYOffset, 0);
        updateTransform(scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Инициализация
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateTransform, disabled]);

  return elementRef;
};
