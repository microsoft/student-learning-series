// A single shelf-item card inside the Marketplace catalog: a plain card
// shell with a colored top accent bar and an icon area. Deliberately
// label-free — cards read as visually distinct Plugin packages by icon and
// accent color alone, so the catalog reads as "discoverable bundles," not a
// list of named individual Skills. Built for "Build the Marketplace
// storefront and plugin catalog" (issue #24); a sibling of PluginTile (issue
// #23) rather than a reuse of it, since the two need different visual
// treatments (accent bar + no label vs. bordered tile + label).
import React from 'react';
import {COLORS} from '../../theme';

export type MarketplaceCardProps = {
  width: number;
  height: number;
  opacity: number;
  translateY: number;
  accentFill: string;
  children: React.ReactNode;
};

const ACCENT_BAR_HEIGHT = 10;

export const MarketplaceCard = ({
  width,
  height,
  opacity,
  translateY,
  accentFill,
  children,
}: MarketplaceCardProps): React.JSX.Element => {
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `2px solid ${COLORS.line}`,
        borderRadius: 20,
        boxShadow: '0 18px 42px rgba(36, 36, 36, 0.10)',
        height,
        opacity,
        overflow: 'hidden',
        position: 'relative',
        transform: `translateY(${translateY}px)`,
        width,
      }}
    >
      <div
        style={{
          background: accentFill,
          height: ACCENT_BAR_HEIGHT,
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
