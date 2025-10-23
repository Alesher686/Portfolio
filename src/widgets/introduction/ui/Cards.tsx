import TiltedCard from '@/shared/ui/card/Card.tsx';
import { FlexContainer } from '@/shared/ui/flexContainer/FlexContainer.tsx';
import image from '@/shared/assets/img/cosmo.png';

import s from './cards.module.scss';

export const Cards = () => {
  return (
    <FlexContainer alignment={'centered'} direction={'row'} className={s.cardsContainer}>
      <TiltedCard
        imageSrc={image}
        altText="Kendrick Lamar - GNX Album Cover"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text">Kendrick Lamar - GNX</p>}
      />
      <TiltedCard
        imageSrc={image}
        altText="Kendrick Lamar - GNX Album Cover"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text">Kendrick Lamar - GNX</p>}
      />
      <TiltedCard
        imageSrc={image}
        altText="Kendrick Lamar - GNX Album Cover"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text">Kendrick Lamar - GNX</p>}
      />
    </FlexContainer>
  );
};
