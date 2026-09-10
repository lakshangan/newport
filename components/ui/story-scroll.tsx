'use client';

import React from 'react';

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
  id?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
  id,
}) => (
  <section
    id={id}
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative min-h-screen w-full overflow-hidden flex flex-col justify-center', className)}
    style={style}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-4 px-[4vw] py-[2.5vw]',
      )}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  return (
    <div
      aria-label={ariaLabel}
      className={cx('w-full relative flex flex-col', className)}
    >
      {children}
    </div>
  );
};

export default FlowArt;
