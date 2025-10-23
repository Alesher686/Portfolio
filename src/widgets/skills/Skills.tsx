import s from './skills.module.scss';

import StarWarsScroll from '@/widgets/skills/ui/StarWarsScroll.tsx';
import Particles from '@/shared/ui/particles/Particles.tsx';

const skillItems = [
  { content: 'React' },
  { content: 'TypeScript' },
  { content: 'JavaScript' },
  { content: 'HTML5 & CSS3' },
  { content: 'Framer Motion' },
  { content: 'GSAP' },
  { content: 'Node.js' },
  { content: 'REST API' },
  { content: 'GraphQL' },
  { content: 'Redux' },
  { content: 'Webpack' },
  { content: 'Git & GitHub' },
  { content: 'CSS-in-JS' },
  { content: 'Responsive Design' },
];

export const Skills = () => {
  return (
    <section id={'skills'}>
      <div className={s.headerContentWrapper}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={300}
          particleSpread={30}
          speed={0.05}
          particleBaseSize={50}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={10}
          className={s.particlesContainer}
        />
        <StarWarsScroll
          items={skillItems}
          textColor="var(--color-accent-300, #3ef882)"
          height="600px"
          scrollSpeed={20}
        />
      </div>
    </section>
  );
};
