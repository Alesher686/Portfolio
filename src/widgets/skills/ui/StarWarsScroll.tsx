import React, { useRef, useEffect, ReactNode, useState } from 'react';
import './starWarsScroll.css';

interface StarWarsScrollItem {
  content: ReactNode;
}

interface StarWarsScrollProps {
  items?: StarWarsScrollItem[];
  textColor: string;
  height?: string;
  width?: string;
  scrollSpeed?: number;
}

const StarWarsScroll: React.FC<StarWarsScrollProps> = ({
  items = [],
  textColor,
  height = '600px',
  width = '100%',
  scrollSpeed = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!items.length || !containerRef.current || !innerContainerRef.current || isInitialized)
      return;

    // const container = containerRef.current;
    const innerContainer = innerContainerRef.current;
    const itemElements = innerContainer.querySelectorAll<HTMLElement>('.sw-skill-item');

    if (!itemElements.length) return;
    console.log('xfdsf');
    const itemHeight = itemElements[0].offsetHeight;
    const itemMargin = parseInt(getComputedStyle(itemElements[0]).marginBottom) || 0;
    const singleSetHeight = items.length * (itemHeight + itemMargin);

    // Применяем фиксированный 3D-поворот и глубину
    innerContainer.style.transform = 'translateY(0) rotateX(20deg)';

    let startTime: number | null = null;
    let animationId: number;
    console.log(startTime);
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = (elapsed / (scrollSpeed * 1000)) * singleSetHeight;

      // Используем только translateY для вертикального движения
      // Держим rotateX постоянным для фиксированного наклона
      const translateY = -progress;

      // Применяем фиксированную трансформацию без изменения глубины
      innerContainer.style.transform = `translateY(${translateY}px) rotateX(20deg)`;

      if (progress >= singleSetHeight) {
        startTime = timestamp;

        const firstSetItems = Array.from(
          innerContainer.querySelectorAll<HTMLElement>('.sw-skill-item')
        ).slice(0, items.length);
        const fragment = document.createDocumentFragment();

        firstSetItems.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          fragment.appendChild(clone);
        });

        innerContainer.appendChild(fragment);

        firstSetItems.forEach((item) => item.remove());
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    setIsInitialized(true);

    return () => {
      console.log(startTime);
      cancelAnimationFrame(animationId);
    };
  }, [items, scrollSpeed, isInitialized]);

  return (
    <div className="sw-wrapper" style={{ height, width }} ref={containerRef}>
      <div className="sw-items-container" ref={innerContainerRef}>
        {items.map((item, index) => (
          <div
            key={`skill-${index}`}
            className="sw-skill-item"
            style={{ color: textColor, borderColor: textColor }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarWarsScroll;
