import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from '@/shared/ui/dock/Dock.tsx';
import s from './collapsibleDock.module.scss';

interface CollapsibleDockProps {
  items: Array<{
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick?: () => void;
    className?: string;
    scrollTo?: string;
    smooth?: boolean;
    duration?: number;
    offset?: number;
  }>;
  toggleIcon?: React.ReactNode;
  position?: {
    bottom?: number | string;
    right?: number | string;
    top?: number | string;
    left?: number | string;
  };
  direction?: 'left' | 'right' | 'top' | 'bottom';
  openOnClick?: boolean;
}

const CollapsibleDock: React.FC<CollapsibleDockProps> = ({
  items,
  toggleIcon = '⋮',
  position = { bottom: 0, right: 20 },
  direction = 'left',
  openOnClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getAnimationProperties = () => {
    switch (direction) {
      case 'left':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 },
          className: s.dockWrapperLeft,
        };
      case 'right':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 },
          className: s.dockWrapperRight,
        };
      case 'top':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 50 },
          className: s.dockWrapperTop,
        };
      case 'bottom':
        return {
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 },
          className: s.dockWrapperBottom,
        };
      default:
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 },
          className: s.dockWrapperLeft,
        };
    }
  };

  const animationProps = getAnimationProperties();

  const handleMouseEvents = openOnClick
    ? {
        onClick: () => setIsOpen(!isOpen),
      }
    : {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      };

  return (
    <div
      className={s.collapsibleDockContainer}
      style={{ ...position, position: 'fixed' }}
      onMouseEnter={!openOnClick ? () => setIsOpen(true) : undefined}
      onMouseLeave={!openOnClick ? () => setIsOpen(false) : undefined}
    >
      <div className={s.contentWrapper}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={animationProps.initial}
              animate={animationProps.animate}
              exit={animationProps.exit}
              transition={{ duration: 0.2 }}
              className={animationProps.className}
            >
              <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={s.toggleButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          {...handleMouseEvents}
        >
          {toggleIcon}
        </motion.div>
      </div>
    </div>
  );
};

export default CollapsibleDock;
