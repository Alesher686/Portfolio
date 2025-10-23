import LetterGlitch from '@/widgets/letterGlitch/LetterGlitch.tsx';
import s from './description.module.scss';

interface IProps {
  color?: 'red' | 'green';
}

export const Description = ({ color = 'green' }: IProps) => {
  const palette =
    color === 'red' ? ['#e0807e', '#a85c5b', '#643938'] : ['#38b265', '#1d6236', '#113a21'];

  return (
    <div className={s.headerContentWrapper}>
      <LetterGlitch
        glitchColors={palette}
        glitchSpeed={33}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />
    </div>
  );
};
