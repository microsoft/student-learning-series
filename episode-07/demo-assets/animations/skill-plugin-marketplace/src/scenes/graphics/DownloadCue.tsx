// A minimal "download into tray" cue: a small arrow that travels down into a
// tray shape. Deliberately icon-only (no "Install"/"Download" text) so it
// reads as a restrained affordance rather than a literal commerce/checkout
// element. Built for "Build the Marketplace storefront and plugin catalog"
// (issue #24).
import React from 'react';
import {COLORS} from '../../theme';

export type DownloadCueProps = {
  /** Overall visibility of the cue. */
  opacity: number;
  /** 0 = arrow pending above the tray, 1 = arrow settled in the tray. */
  progress: number;
};

const ARROW_SIZE = 30;
const ARROW_TRAVEL = 26;
const TRAY_WIDTH = 64;
const TRAY_HEIGHT = 14;

export const DownloadCue = ({opacity, progress}: DownloadCueProps): React.JSX.Element => {
  const arrowTranslateY = -ARROW_TRAVEL * (1 - progress);
  const trayFill = progress > 0.85 ? COLORS.accent : COLORS.surfaceMuted;

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        opacity,
      }}
    >
      <svg
        width={ARROW_SIZE}
        height={ARROW_SIZE}
        style={{transform: `translateY(${arrowTranslateY}px)`}}
      >
        <line x1={15} y1={0} x2={15} y2={19} stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
        <polygon points="5,15 25,15 15,26" fill={COLORS.ink} />
      </svg>
      <div
        style={{
          background: trayFill,
          borderRadius: 6,
          height: TRAY_HEIGHT,
          marginTop: 4,
          width: TRAY_WIDTH,
        }}
      />
    </div>
  );
};
