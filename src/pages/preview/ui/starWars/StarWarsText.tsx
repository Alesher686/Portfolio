import { useEffect, useState, useMemo, useRef, useImperativeHandle, forwardRef } from 'react';

import AudioControl from '@/shared/ui/audioControl/AudioControl.tsx';
import { DecryptedText } from '@/shared/ui/decryptedText/DecryptedText.tsx';

import s from './starWarsText.module.scss';

interface IProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export interface IStarWarsTextRef {
  handleSkip: () => Promise<void>;
}

export interface IAudioControlRef {
  fadeOutAndStop: (duration?: number) => Promise<void>;
}

const StarWarsText = forwardRef<IStarWarsTextRef, IProps>(({ isVisible, setIsVisible }, ref) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [decryptionQueue, setDecryptionQueue] = useState<number[]>([]);
  const [activeDecryptions, setActiveDecryptions] = useState<Set<number>>(new Set());
  const audioControlRef = useRef<IAudioControlRef>(null);

  const audioSrc = '/audio/star-wars-theme.mp3';

  const storyText = `
Episode IV

A NEW HOPE

It is a period of civil war.
Rebel spaceships, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empires wardens,
ultimate weapon, the death
Star, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire's
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save
her people and restore
freedom to the galaxy....

Now, as Imperial forces
spread across the galaxy,
searching every system for
the stolen Death Star plans,
the Rebellion faces its
darkest hour. Time is
running out before the
Empire can complete their
terrible weapon.

The fate of countless worlds
hangs in the balance, as
brave men and women risk
everything to deliver hope
to a galaxy oppressed by
tyranny. Each passing moment
brings the Empire closer to
ultimate victory...
  `.trim();

  const handleSkip = async () => {
    console.log('⏭️ Skip requested in StarWarsText, fading audio...');

    if (audioControlRef.current) {
      await audioControlRef.current.fadeOutAndStop(1000);
    }

    setIsVisible(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      handleSkip,
    }),
    []
  );

  useEffect(() => {
    if (isVisible) {
      const triggerInteraction = () => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        document.dispatchEvent(event);
      };

      const timer = setTimeout(triggerInteraction, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const words = useMemo(() => {
    const lines = storyText.split('\n');
    const wordList: { text: string; lineIndex: number; wordIndex: number; isTitle: boolean }[] = [];

    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const lineWords = trimmedLine.split(/(\s+)/);
        lineWords.forEach((word, wordIndex) => {
          if (word.trim()) {
            const isTitle = lineIndex <= 2;
            wordList.push({
              text: word,
              lineIndex,
              wordIndex,
              isTitle,
            });
          }
        });
      }
    });

    return wordList;
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const decryptableWords = words
      .map((_, index) => index)
      .filter((index) => !words[index].isTitle && words[index].text.length > 3);

    const shuffled = [...decryptableWords].sort(() => Math.random() - 0.5);
    setDecryptionQueue(shuffled);
  }, [shouldAnimate, words]);

  useEffect(() => {
    if (decryptionQueue.length === 0) return;

    const interval = setInterval(
      () => {
        setDecryptionQueue((prev) => {
          if (prev.length === 0) return prev;

          const nextWordIndex = prev[0];
          setActiveDecryptions((current) => new Set([...current, nextWordIndex]));

          setTimeout(
            () => {
              setActiveDecryptions((current) => {
                const updated = new Set(current);
                updated.delete(nextWordIndex);
                return updated;
              });
            },
            Math.random() * 3000 + 2000
          );

          return prev.slice(1);
        });
      },
      Math.random() * 1500 + 500
    );

    return () => clearInterval(interval);
  }, [decryptionQueue]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 100);

      const endTimer = setTimeout(async () => {
        await handleSkip();
        setIsVisible(false);
      }, 60000);

      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    }
  }, [isVisible, setIsVisible]);

  const renderTextWithDecryption = () => {
    let wordIndex = 0;

    return storyText.split('\n').map((line, lineIndex) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={lineIndex} />;

      const lineWords = trimmedLine.split(/(\s+)/);

      return (
        <div key={lineIndex} className={lineIndex <= 2 ? s.title : s.content}>
          {lineWords.map((segment, segmentIndex) => {
            if (!segment.trim()) {
              return <span key={segmentIndex}>{segment}</span>;
            }

            const currentWordIndex = wordIndex++;
            const shouldDecrypt = activeDecryptions.has(currentWordIndex);
            const isTitle = lineIndex <= 2;

            if (shouldDecrypt && !isTitle) {
              return (
                <span key={segmentIndex} className={s.decryptedWordContainer}>
                  <DecryptedText
                    key={`${currentWordIndex}-${shouldDecrypt}`}
                    text={segment}
                    speed={70}
                    maxIterations={15}
                    sequential={true}
                    revealDirection="start"
                    animateOn="view"
                    encryptedClassName={s.encryptedChar}
                    parentClassName={s.decryptedWordContainer}
                  />
                </span>
              );
            }

            return <span key={segmentIndex}>{segment}</span>;
          })}
        </div>
      );
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={s.starWarsContainer}>
        <div className={s.starWarsWrapper}>
          <div className={s.fade} />
          <section className={s.starWars}>
            <div className={`${s.crawl} ${shouldAnimate ? s.animate : ''}`}>
              {renderTextWithDecryption()}
            </div>
          </section>
        </div>
      </div>
      <AudioControl ref={audioControlRef} isVisible={isVisible} audioSrc={audioSrc} />
    </>
  );
});

StarWarsText.displayName = 'StarWarsText';

export default StarWarsText;
