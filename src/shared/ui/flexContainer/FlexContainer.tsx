import { ReactNode } from 'react';

import clsx from 'clsx';

import s from './flexContainer.module.scss';

interface IFlexContainerProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  alignment?: 'centered' | 'spaceBetween' | 'default';
  className?: string;
}

export const FlexContainer = ({
  children,
  direction = 'column',
  alignment = 'default',
  className,
}: IFlexContainerProps) => {
  return (
    <div
      className={clsx(
        s.container,
        direction === 'row' && s.row,
        alignment === 'centered' && s.centered,
        alignment === 'spaceBetween' && s.spaceBetween,
        className
      )}
    >
      {children}
    </div>
  );
};
