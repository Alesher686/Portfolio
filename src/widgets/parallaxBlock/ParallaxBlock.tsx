import { useEffect, useRef, useState } from 'react';
import s from './parallaxBlock.module.scss';

interface ParallaxLayerData {
  id: string;
  imageUrl: string;
  speed: number;
  zIndex: number;
  topOffset?: number;
}

interface IProps {
  layers: ParallaxLayerData[];
  maxScroll?: number;
  height?: string;
  className?: string;
}

const ParallaxBlock = ({ layers, maxScroll = 1400, height = '100vh', className = '' }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      requestAnimationFrame(() => {
        const scrollY = Math.max(window.pageYOffset, 0);

        if (scrollY > maxScroll) return;

        layersRef.current.forEach((layer, index) => {
          if (layer && layers[index]) {
            const speed = layers[index].speed;
            const offset = -(scrollY * speed);

            layer.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [layers, maxScroll, isScrolling]);

  return (
    <div className={`${s.sceneContainer} ${className}`} ref={containerRef} style={{ height }}>
      <div className={s.parallaxContainer}>
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            ref={(el) => (layersRef.current[index] = el)}
            className={`${s.parallaxLayer} ${s[`layer${layer.id}`]}`}
            style={{
              backgroundImage: `url(${layer.imageUrl})`,
              zIndex: layer.zIndex,
              top: layer.topOffset ? `${layer.topOffset}px` : '0',
            }}
            data-speed={layer.speed}
            data-max-scroll={maxScroll}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxBlock;
