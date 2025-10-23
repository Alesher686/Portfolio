import { Cards } from '@/widgets/introduction/ui/Cards.tsx';
import s from './intro.module.scss';

export const Introduction = () => {
  return (
    <section id={'skills'}>
      <div className={s.headerContentWrapper}>
        <div>Introduction</div>
        <div>Overview</div>
        <Cards />
      </div>
    </section>
  );
};
