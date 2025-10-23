import { useLayoutEffect, useState } from 'react';

import { FirstTitle } from '@/widgets/firstTitle/FirstTitle.tsx';
import { useNavigation } from '@/shared/contexts/navigationContext.tsx';
import { FadeInComponent } from '@/shared/ui/transitors/FadeInComponent.tsx';
import { Introduction } from '@/widgets/introduction/Introduction.tsx';
import { Description } from '@/widgets/description/Description.tsx';
import { Experience } from '@/widgets/experience/Experience.tsx';
import ParallaxBlock from '@/widgets/parallaxBlock/ParallaxBlock.tsx';
import { endorParallaxLayers } from '@/shared/constants/endorParallaxLayers.ts';
import s from './main.module.scss';
import { ContactForm } from '@/widgets/contactForm/ContactForm.tsx';

const Main = () => {
  const [isRevealing, setIsRevealing] = useState(false);
  const { checkAndClearNavigateWithAnimation } = useNavigation();

  useLayoutEffect(() => {
    if (checkAndClearNavigateWithAnimation()) {
      setIsRevealing(true);
    }
  }, [checkAndClearNavigateWithAnimation]);

  return (
    <div className={s.mainContentWrapper}>
      <ParallaxBlock
        layers={endorParallaxLayers}
        maxScroll={1400}
        height="95vh"
        className={s.endorParallax}
      />
      <div className={s.contentAfterParallax}>
        <FirstTitle />
        <Description />
        <Experience />
        <Description />
        <Introduction />
        <Description color={'red'} />
        <ContactForm />
        {isRevealing && <FadeInComponent />}
      </div>
    </div>
  );
};

export default Main;
