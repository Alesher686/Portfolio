import { useEffect, useRef, useState } from 'react';

import SpotlightCard from '@/shared/ui/spotlightCard/SpotlightCard.tsx';
import { motion, useScroll, useTransform } from 'framer-motion';

import s from './experience.module.scss';

interface IExperienceItem {
  id: number;
  title: string;
  date: string;
  company: string;
  description: string;
  skills: string[];
  icon?: string;
}

const experienceData: IExperienceItem[] = [
  {
    id: 1,
    title: 'Frontend Разработчик',
    company: 'Tech Solutions',
    date: '2022 - Настоящее время',
    description: 'Разработка пользовательских интерфейсов с использованием React и TypeScript.',
    skills: ['React', 'TypeScript', 'CSS Modules'],
  },
  {
    id: 2,
    title: 'UI/UX Дизайнер',
    company: 'Creative Studio',
    date: '2020 - 2022',
    description: 'Создание дизайн-систем и пользовательских интерфейсов для веб-приложений.',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
  },
  {
    id: 3,
    title: 'HTML/CSS Разработчик',
    company: 'Web Agency',
    date: '2018 - 2020',
    description: 'Вёрстка адаптивных веб-сайтов и приложений с нуля.',
    skills: ['HTML5', 'CSS3', 'SCSS', 'JavaScript'],
  },
  {
    id: 4,
    title: 'Стажёр',
    company: 'Digital Solutions',
    date: '2017 - 2018',
    description: 'Изучение веб-разработки и помощь в реализации проектов.',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
];

const useVisibilityControl = (defaultValue = false) => {
  const [isVisible, setIsVisible] = useState(defaultValue);

  return {
    isVisible,
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
  };
};

const ExperienceItem = ({ item, isLeft }: { item: IExperienceItem; isLeft: boolean }) => {
  const itemRef = useRef(null);
  const visibility = useVisibilityControl(false);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'center center'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.3 && !visibility.isVisible) {
        visibility.show();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, visibility]);

  const initialX = isLeft ? 50 : -50;

  return (
    <motion.div
      ref={itemRef}
      className={`${s.experienceItem} ${isLeft ? s.left : s.right}`}
      initial={{ opacity: 0, x: initialX }}
      animate={visibility.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <SpotlightCard className={s.spotlightWrapper} spotlightColor={'rgba(56, 152, 76, 0.59)'}>
        <div className={s.experienceContent}>
          <h3 className={s.title}>{item.title}</h3>
          <div className={s.company}>{item.company}</div>
          <div className={s.date}>{item.date}</div>
          <p className={s.description}>{item.description}</p>
          <div className={s.skills}>
            {item.skills.map((skill, index) => (
              <span key={index} className={s.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const AnimatedCircle = ({
  index,
  scrollYProgress,
  totalItems,
}: {
  index: number;
  scrollYProgress: any;
  totalItems: number;
}) => {
  const segmentSize = 0.85 / totalItems;
  const circleThreshold = segmentSize * index;

  const pathLength = useTransform(
    scrollYProgress,
    [circleThreshold, circleThreshold + 0.1],
    [0, 1]
  );

  return (
    <div className={s.circle}>
      <svg width="100%" height="100%" viewBox="0 0 50 50">
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#3ef882"
          strokeWidth="3"
          style={{ pathLength: pathLength }}
        />
      </svg>
      <div
        className={s.innerCircle}
        style={{
          position: 'absolute',
          width: '30px',
          height: '30px',
          borderRadius: '150px',
        }}
      ></div>
    </div>
  );
};

export const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 0.2, 0.85], ['0%', '0%', '100%']);
  const currentProgress = useTransform(scrollYProgress, [0.25, 0.85], [0, 1]);

  return (
    <section id={'experience'}>
      <div className={s.headerContentWrapper} ref={containerRef}>
        <motion.div className={s.experienceContainer}>
          <motion.div
            className={s.timeline}
            style={{
              height: timelineHeight,
            }}
          />

          <div className={s.timelineItems}>
            {experienceData.map((item, index) => {
              return (
                <div key={item.id} className={s.timelineItem}>
                  <motion.div>
                    <AnimatedCircle
                      index={index}
                      scrollYProgress={currentProgress}
                      totalItems={experienceData.length - 1}
                    />
                  </motion.div>
                  <ExperienceItem item={item} isLeft={index % 2 === 0} />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
