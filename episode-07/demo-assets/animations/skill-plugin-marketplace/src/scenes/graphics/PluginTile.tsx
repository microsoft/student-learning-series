// A single component tile inside the Plugin container: an icon area over a
// label, styled as a plain card. Shared by all four Plugin module tiles
// (Skills, Agent Personas, MCP Servers, + more) so they render as visually
// parallel siblings — same size, same card treatment — regardless of which
// icon glyph is passed in. `muted` softens the "+ more" tile (dashed border,
// quieter label) to read as open-ended rather than a fourth named module.
import React from 'react';
import {COLORS, FONT_STACK} from '../../theme';

export type PluginTileProps = {
  label: string;
  width: number;
  height: number;
  opacity: number;
  translateY: number;
  muted?: boolean;
  children: React.ReactNode;
};

export const PluginTile = ({
  label,
  width,
  height,
  opacity,
  translateY,
  muted = false,
  children,
}: PluginTileProps): React.JSX.Element => {
  return (
    <div
      style={{
        alignItems: 'center',
        background: COLORS.surface,
        border: muted ? `2px dashed ${COLORS.line}` : `2px solid ${COLORS.line}`,
        borderRadius: 20,
        boxShadow: muted ? 'none' : '0 16px 40px rgba(36, 36, 36, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        height,
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
        width,
      }}
    >
      <div style={{alignItems: 'center', display: 'flex', height: height * 0.5, justifyContent: 'center'}}>
        {children}
      </div>
      <div
        style={{
          color: muted ? COLORS.inkMuted : COLORS.ink,
          fontFamily: FONT_STACK,
          fontSize: 30,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
};
