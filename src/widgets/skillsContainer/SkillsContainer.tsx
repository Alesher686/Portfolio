import { Cards } from '@/widgets/skillsContainer/ui/Cards.tsx';

import s from './skillsContainer.module.scss';

export const SkillsContainer = () => {
  return (
    <section id={'skills'}>
      <div className={s.headerContentWrapper}>
        <Cards />
      </div>
    </section>
  );
};
