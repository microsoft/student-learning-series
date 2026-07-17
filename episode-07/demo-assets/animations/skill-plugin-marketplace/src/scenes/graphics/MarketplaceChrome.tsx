// Storefront chrome for the Marketplace beat: a light-neutral facade with a
// framed display window, side pillars, shelf, and striped/scalloped awning.
// Deliberately has no price, checkout, or currency elements — this is a
// discovery catalog, not literal commerce.
// Built for "Build the Marketplace storefront and plugin catalog"
// (issue #24).
import React from 'react';
import {COLORS, FONT_STACK} from '../../theme';

export type MarketplaceChromeProps = {
  opacity: number;
  panelLeft: number;
  panelTop: number;
  panelWidth: number;
  panelHeight: number;
  titleTop: number;
  shelfLineTop: number;
  doorWidth: number;
  doorGap: number;
};

const STRIPE_COUNT = 10;
const AWNING_HEIGHT = 64;
const SCALLOP_RADIUS = 18;
const FACADE_INSET = 42;
const PILLAR_WIDTH = 34;

export const MarketplaceChrome = ({
  opacity,
  panelLeft,
  panelTop,
  panelWidth,
  panelHeight,
  titleTop,
  shelfLineTop,
  doorWidth,
  doorGap,
}: MarketplaceChromeProps): React.JSX.Element => {
  const stripeWidth = panelWidth / STRIPE_COUNT;
  const displayTop = titleTop - panelTop + 112;
  const displayBottom = shelfLineTop - panelTop + 42;
  const displayWidth = panelWidth - FACADE_INSET * 2 - doorWidth - doorGap;
  const doorLeft = FACADE_INSET + displayWidth + doorGap;

  return (
    <div
      style={{
        height: panelHeight,
        left: panelLeft,
        opacity,
        position: 'absolute',
        top: panelTop,
        width: panelWidth,
      }}
    >
      <div
        style={{
          background: COLORS.surfaceMuted,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 36,
          height: '100%',
          position: 'absolute',
          width: '100%',
        }}
      />

      {/* A single framed display window keeps the catalog reading as a real
          storefront while remaining in the existing flat shape language. */}
      <div
        style={{
          background: COLORS.surface,
          border: `10px solid ${COLORS.line}`,
          borderRadius: 28,
          boxShadow: 'inset 0 0 0 4px rgba(255, 255, 255, 0.9)',
          height: displayBottom - displayTop,
          left: FACADE_INSET,
          position: 'absolute',
          top: displayTop,
          width: displayWidth,
        }}
      />

      {/* A simple glazed doorway makes the facade unambiguously physical
          without borrowing branded store chrome. */}
      <div
        style={{
          background: COLORS.surface,
          border: `10px solid ${COLORS.line}`,
          borderRadius: '24px 24px 8px 8px',
          bottom: 38,
          boxSizing: 'border-box',
          left: doorLeft,
          position: 'absolute',
          top: displayTop,
          width: doorWidth,
        }}
      >
        <div
          style={{
            background: COLORS.canvas,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 12,
            height: '57%',
            left: 16,
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        />
        <div
          style={{
            background: COLORS.surfaceMuted,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 10,
            bottom: 16,
            height: '25%',
            left: 16,
            position: 'absolute',
            right: 16,
          }}
        />
        <div
          style={{
            background: COLORS.primary,
            borderRadius: '50%',
            height: 13,
            position: 'absolute',
            right: 22,
            top: '62%',
            width: 13,
          }}
        />
      </div>

      {/* Restrained side pillars and a low plinth complete the facade. */}
      {[FACADE_INSET / 2, panelWidth - FACADE_INSET / 2 - PILLAR_WIDTH].map((left) => (
        <div
          key={left}
          style={{
            background: COLORS.surface,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 12,
            bottom: 24,
            left,
            position: 'absolute',
            top: AWNING_HEIGHT + 16,
            width: PILLAR_WIDTH,
          }}
        />
      ))}
      <div
        style={{
          background: COLORS.surface,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 12,
          bottom: 22,
          height: 30,
          left: FACADE_INSET,
          position: 'absolute',
          width: panelWidth - FACADE_INSET * 2,
        }}
      />

      {/* Generic awning: original alternating stripes and a scalloped hem. */}
      <svg
        width={panelWidth}
        height={AWNING_HEIGHT + 20}
        style={{left: 0, position: 'absolute', top: 0}}
      >
        {Array.from({length: STRIPE_COUNT}).map((_, index) => (
          <rect
            key={`stripe-${index}`}
            x={index * stripeWidth}
            y={0}
            width={stripeWidth}
            height={AWNING_HEIGHT}
            fill={index % 2 === 0 ? COLORS.primary : COLORS.primarySoft}
          />
        ))}
        {Array.from({length: STRIPE_COUNT}).map((_, index) => (
          <circle
            key={`scallop-${index}`}
            cx={index * stripeWidth + stripeWidth / 2}
            cy={AWNING_HEIGHT}
            r={SCALLOP_RADIUS}
            fill={index % 2 === 0 ? COLORS.primary : COLORS.primarySoft}
          />
        ))}
      </svg>

      <div
        style={{
          color: COLORS.primary,
          fontFamily: FONT_STACK,
          fontSize: 58,
          fontWeight: 700,
          left: 0,
          position: 'absolute',
          textAlign: 'center',
          top: titleTop - panelTop,
          width: panelWidth,
        }}
      >
        Marketplace
      </div>

      <div
        style={{
          background: COLORS.line,
          borderRadius: 8,
          boxShadow: '0 7px 0 rgba(216, 220, 226, 0.55)',
          height: 12,
          left: FACADE_INSET + 18,
          position: 'absolute',
          top: shelfLineTop - panelTop,
          width: displayWidth - 36,
        }}
      />
    </div>
  );
};
