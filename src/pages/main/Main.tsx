import { useLayoutEffect, useState } from 'react';

import { PARALLAX_LAYERS } from '@/shared/constants/parallaxLayers.ts';
import { useNavigation } from '@/shared/contexts/navigationContext.tsx';
import { FadeInComponent } from '@/shared/ui/transitors/FadeInComponent.tsx';
import { ContactForm } from '@/widgets/contactForm/ContactForm.tsx';
import { Experience } from '@/widgets/experience/Experience.tsx';
import { GlitchBlock } from '@/widgets/glitchBlock/GlitchBlock.tsx';
import { LapTopGame } from '@/widgets/lapTopGame/LapTopGame.tsx';
import ParallaxBlock from '@/widgets/parallaxBlock/ParallaxBlock.tsx';
import { SkillsContainer } from '@/widgets/skillsContainer/SkillsContainer.tsx';

import s from './main.module.scss';

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
        layers={PARALLAX_LAYERS}
        maxScroll={1400}
        height="95vh"
        className={s.endorParallax}
      />
      <div className={s.contentAfterParallax}>
        <LapTopGame />
        <GlitchBlock />
        <Experience />
        <GlitchBlock />
        <SkillsContainer />
        <GlitchBlock color={'red'} />
        <ContactForm />
        {isRevealing && <FadeInComponent />}
      </div>
    </div>
  );
};

export default Main;
