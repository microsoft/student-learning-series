// The Plugin container chrome: a titled rounded-rect package holding four
// sibling module tiles (Skills, Agent Personas, MCP Servers, + more). Built
// by "Build sharing and the Plugin transformation" (issue #23) as the shared
// middle sequence's destination shape. Exposes its geometry and tile order
// so "Add the Marketplace discovery beat" (issue #24) can continue from this
// exact completed container without re-deriving its layout.
import React from 'react';
import {COLORS, FONT_STACK} from '../../theme';
import {AgentPersonaGlyph} from './AgentPersonaGlyph';
import {FolderGlyph} from './FolderGlyph';
import {McpServerGlyph} from './McpServerGlyph';
import {PluginTile} from './PluginTile';

export const PLUGIN_WIDTH = 1500;
export const PLUGIN_HEIGHT = 560;
export const PLUGIN_TILE_WIDTH = 320;
export const PLUGIN_TILE_HEIGHT = 380;
export const PLUGIN_TILE_GAP = 44;
export const PLUGIN_TILE_LABELS = [
  'Skills',
  'Agent Personas',
  'MCP Servers',
  '+ more',
] as const;

const PlusGlyph = ({size, opacity}: {size: number; opacity: number}) => (
  <div style={{height: size, opacity, position: 'relative', width: size}}>
    <div
      style={{
        background: COLORS.inkMuted,
        borderRadius: 6,
        height: size * 0.18,
        left: 0,
        position: 'absolute',
        top: size * 0.41,
        width: size,
      }}
    />
    <div
      style={{
        background: COLORS.inkMuted,
        borderRadius: 6,
        height: size,
        left: size * 0.41,
        position: 'absolute',
        top: 0,
        width: size * 0.18,
      }}
    />
  </div>
);

export type PluginContainerProps = {
  /** Container chrome + title opacity (the cross-fade-in from the folder). */
  opacity: number;
  /** Per-tile opacity, in `PLUGIN_TILE_LABELS` order (staggered entrance). */
  tileOpacities: readonly [number, number, number, number];
  /** Per-tile translateY, in `PLUGIN_TILE_LABELS` order (staggered entrance). */
  tileTranslateY: readonly [number, number, number, number];
};

export const PluginContainer = ({
  opacity,
  tileOpacities,
  tileTranslateY,
}: PluginContainerProps): React.JSX.Element => {
  const iconSize = PLUGIN_TILE_WIDTH * 0.42;

  return (
    <div
      style={{
        background: COLORS.surface,
        border: `2px solid ${COLORS.line}`,
        borderRadius: 28,
        boxShadow: '0 30px 70px rgba(36, 36, 36, 0.12)',
        height: PLUGIN_HEIGHT,
        opacity,
        padding: '36px 50px',
        width: PLUGIN_WIDTH,
      }}
    >
      <div
        style={{
          color: COLORS.primary,
          fontFamily: FONT_STACK,
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        Plugin
      </div>

      <div
        style={{
          display: 'flex',
          gap: PLUGIN_TILE_GAP,
          justifyContent: 'center',
          marginTop: 28,
        }}
      >
        <PluginTile
          label={PLUGIN_TILE_LABELS[0]}
          width={PLUGIN_TILE_WIDTH}
          height={PLUGIN_TILE_HEIGHT}
          opacity={tileOpacities[0]}
          translateY={tileTranslateY[0]}
        >
          <FolderGlyph
            width={iconSize}
            height={iconSize * 0.78}
            fill={COLORS.primarySoft}
            tabFill={COLORS.primary}
            strokeColor={COLORS.primary}
          />
        </PluginTile>

        <PluginTile
          label={PLUGIN_TILE_LABELS[1]}
          width={PLUGIN_TILE_WIDTH}
          height={PLUGIN_TILE_HEIGHT}
          opacity={tileOpacities[1]}
          translateY={tileTranslateY[1]}
        >
          <AgentPersonaGlyph width={iconSize} opacity={1} />
        </PluginTile>

        {/* MCP Servers is a sibling tile in the same row as Agent Personas,
            not nested beneath it — the two module types read as parallel,
            equal siblings inside Plugin. */}
        <PluginTile
          label={PLUGIN_TILE_LABELS[2]}
          width={PLUGIN_TILE_WIDTH}
          height={PLUGIN_TILE_HEIGHT}
          opacity={tileOpacities[2]}
          translateY={tileTranslateY[2]}
        >
          <McpServerGlyph width={iconSize} opacity={1} />
        </PluginTile>

        <PluginTile
          label={PLUGIN_TILE_LABELS[3]}
          width={PLUGIN_TILE_WIDTH}
          height={PLUGIN_TILE_HEIGHT}
          opacity={tileOpacities[3]}
          translateY={tileTranslateY[3]}
          muted
        >
          <PlusGlyph size={iconSize * 0.6} opacity={1} />
        </PluginTile>
      </div>
    </div>
  );
};
