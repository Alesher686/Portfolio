import notFound from '@/shared/assets/img/404.svg';
import { ParticlesBackground } from '@/shared/ui/particles/ParticlesBackground.tsx';

import s from './pagenotFound.module.scss';

const PageNotFound = () => {
  return (
    <div className={s.notFoundContainer}>
      <img src={notFound} alt={'notFoundImage'} className={s.notFoundImg} />
      <div>Page Not Found</div>
      <ParticlesBackground />
    </div>
  );
};

export default PageNotFound;
