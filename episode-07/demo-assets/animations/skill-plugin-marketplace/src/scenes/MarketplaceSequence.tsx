// The shared final sequence, built by "Build the Marketplace storefront and
// plugin catalog" (issue #24): continues seamlessly from the completed,
// titled Plugin container (with its four sibling tiles) left by
// SharePluginSequence (issue #23). A continuous pull-back — a uniform
// camera-scale zoom-out, the same disguised-jump technique the Opening and
// Share+Plugin scenes use for their exterior/interior handoffs — reveals the
// Plugin container is inside a storefront, then cross-fades it into a single
// shelf card while the storefront chrome (awning, sign, display window,
// pillars, and shelf) fades in around it. The featured card retains a compact,
// legible view of its Skills / Agent Personas / MCP Servers hierarchy. Three
// more miniature Plugin packages with that exact same labeled-row layout then
// join it on the shelf. One gets a restrained download cue, and both cuts end
// on a Marketplace hold.
//
// The extended (90s) cut additionally pauses that same card's download cue
// under a magnifier + shield "under review" cue before the cue completes —
// the review-before-install trust beat. The modular (60s) cut omits it and
// moves straight through to the completed cue. `cutVariant` is a typed,
// explicit union (not inferred from the display-only `cutLabel` string) so
// a later polish ticket can retime either branch without restructuring this
// scene.
//
// All shapes are original SVG/CSS — no third-party icons, logos, store
// branding, or imported visual assets. No prices, checkout, or currency:
// this is a discovery catalog, not literal commerce.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {HEIGHT, WIDTH} from '../contract';
import {
  buildSchedule,
  EASE_OUT,
  ENTRANCE_FRAMES,
  MIN_HOLD_FRAMES,
  MORPH_FRAMES,
  easedRange,
  ScheduleSegment,
} from '../motion';
import {COLORS, FONT_STACK} from '../theme';
import {AgentPersonaGlyph} from './graphics/AgentPersonaGlyph';
import {DownloadCue} from './graphics/DownloadCue';
import {FolderGlyph} from './graphics/FolderGlyph';
import {MagnifierGlyph} from './graphics/MagnifierGlyph';
import {MarketplaceCard} from './graphics/MarketplaceCard';
import {MarketplaceChrome} from './graphics/MarketplaceChrome';
import {McpServerGlyph} from './graphics/McpServerGlyph';
import {PluginContainer} from './graphics/PluginContainer';
import {ShieldGlyph} from './graphics/ShieldGlyph';

export type MarketplaceCutVariant = 'modular' | 'extended';

export type MarketplaceSequenceProps = {
  /** Frames allotted to this scene within the current cut (duration-aware). */
  durationInFrames: number;
  /** Explicit, typed cut branch — drives whether the trust beat plays. */
  cutVariant: MarketplaceCutVariant;
};

const CANVAS_CENTER_X = WIDTH / 2;
const CANVAS_CENTER_Y = HEIGHT / 2;

// Storefront backdrop panel.
const PANEL_WIDTH = 1560;
const PANEL_HEIGHT = 760;
const PANEL_LEFT = CANVAS_CENTER_X - PANEL_WIDTH / 2;
const PANEL_TOP = CANVAS_CENTER_Y - PANEL_HEIGHT / 2;
const TITLE_TOP = PANEL_TOP + 96;

// Shelf-card row (4 miniature Plugin packages), centered in the display
// window so the storefront doorway remains visibly separate.
const STORE_DOOR_WIDTH = 250;
const STORE_DOOR_GAP = 28;
const CARD_WIDTH = 252;
const CARD_HEIGHT = 320;
const CARD_GAP = 28;
const CARD_COUNT = 4;
const ROW_WIDTH = CARD_COUNT * CARD_WIDTH + (CARD_COUNT - 1) * CARD_GAP;
const ROW_CENTER_X = CANVAS_CENTER_X - (STORE_DOOR_WIDTH + STORE_DOOR_GAP) / 2;
const ROW_CENTER_Y = PANEL_TOP + PANEL_HEIGHT / 2 + 60;
const ROW_START_CENTER_X = ROW_CENTER_X - ROW_WIDTH / 2 + CARD_WIDTH / 2;
const SHELF_LINE_TOP = ROW_CENTER_Y + CARD_HEIGHT / 2 + 40;
const cardCenterX = (index: number) => ROW_START_CENTER_X + index * (CARD_WIDTH + CARD_GAP);

// Card 0 is the settled morph target (the continued Plugin, now a shelf
// item); cards 1-3 are new catalog entries. Every card repeats the Plugin
// title + capability-tile structure, with accents distinguishing packages
// instead of invented product names.
const CARD_ACCENTS = [COLORS.primary, COLORS.accent, COLORS.highlight, COLORS.inkMuted] as const;
const CARD_ACCENT_SOFTS = [
  COLORS.primarySoft,
  COLORS.accentSoft,
  COLORS.highlightSoft,
  COLORS.surfaceMuted,
] as const;

const PULL_BACK_SCALE = 0.55; // uniform zoom-out revealing the storefront around the Plugin
const CATALOG_EXTRA_CARDS = CARD_COUNT - 1; // cards 1-3
const CATALOG_CARD_STAGGER = 9;
const TRUST_HOLD_FRAMES = 45;

type MiniPluginContentsProps = {
  accentFill: string;
  accentSoft: string;
};

const MiniPluginContents = ({
  accentFill,
  accentSoft,
}: MiniPluginContentsProps): React.JSX.Element => {
  const capabilities = [
    {
      label: 'Skills',
      icon: (
        <FolderGlyph
          width={25}
          height={20}
          fill={accentSoft}
          tabFill={accentFill}
          strokeColor={accentFill}
        />
      ),
    },
    {
      label: 'Agent Personas',
      icon: (
        <AgentPersonaGlyph
          width={24}
          opacity={1}
          accentColor={accentFill}
          softColor={accentSoft}
        />
      ),
    },
    {
      label: 'MCP Servers',
      icon: (
        <McpServerGlyph
          width={27}
          opacity={1}
          accentColor={accentFill}
          dataColor={accentFill}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '30px 21px 20px',
        width: '100%',
      }}
    >
      <div style={{alignItems: 'center', display: 'flex', gap: 11}}>
        <div
          style={{
            background: accentFill,
            borderRadius: 6,
            height: 30,
            width: 8,
          }}
        />
        <div
          style={{
            color: accentFill,
            fontFamily: FONT_STACK,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Plugin
        </div>
      </div>

      <div
        style={{
          background: accentSoft,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 14,
          marginTop: 18,
          overflow: 'hidden',
        }}
      >
        {capabilities.map(({label, icon}, index) => (
          <div
            key={label}
            style={{
              alignItems: 'center',
              borderBottom:
                index < capabilities.length - 1 ? `1px solid ${COLORS.line}` : undefined,
              color: COLORS.ink,
              display: 'grid',
              fontFamily: FONT_STACK,
              fontSize: 17,
              fontWeight: 600,
              gap: 9,
              gridTemplateColumns: '28px 1fr',
              height: 48,
              padding: '0 11px',
              textAlign: 'left',
            }}
          >
            <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
              {icon}
            </div>
            <div>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SHARED_SEGMENTS: ScheduleSegment[] = [
  {name: 'continuedHold', kind: 'fixed', frames: ENTRANCE_FRAMES},
  {name: 'pullBackScale', kind: 'fixed', frames: MORPH_FRAMES},
  {name: 'pullBackCrossFade', kind: 'fixed', frames: MORPH_FRAMES},
  {
    name: 'catalogReveal',
    kind: 'fixed',
    frames: ENTRANCE_FRAMES + (CATALOG_EXTRA_CARDS - 1) * CATALOG_CARD_STAGGER,
  },
];

// Explicit per-cut schedules: the modular cut moves straight from catalog
// reveal into the install cue; the extended cut inserts the review-before-
// install trust beat (magnifier + shield) ahead of that same cue.
const buildModularSchedule = (durationInFrames: number) =>
  buildSchedule(durationInFrames, [
    ...SHARED_SEGMENTS,
    {name: 'installCue', kind: 'fixed', frames: ENTRANCE_FRAMES + MORPH_FRAMES},
    {name: 'finalHold', kind: 'flex', weight: 1},
  ]);

const buildExtendedSchedule = (durationInFrames: number) =>
  buildSchedule(durationInFrames, [
    ...SHARED_SEGMENTS,
    {name: 'trustBeatIn', kind: 'fixed', frames: ENTRANCE_FRAMES},
    {name: 'trustBeatHold', kind: 'fixed', frames: TRUST_HOLD_FRAMES},
    {name: 'installCue', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'finalHold', kind: 'flex', weight: 1},
  ]);

export const MarketplaceSequence = ({
  durationInFrames,
  cutVariant,
}: MarketplaceSequenceProps): React.JSX.Element => {
  const frame = useCurrentFrame();

  const schedule =
    cutVariant === 'extended'
      ? buildExtendedSchedule(durationInFrames)
      : buildModularSchedule(durationInFrames);

  if (schedule.finalHold.frames < MIN_HOLD_FRAMES) {
    // A future polish ticket (issue #26) retiming this scene's share of the
    // cut should see this in dev tooling rather than silently clip the
    // closing Marketplace hold.
    // eslint-disable-next-line no-console
    console.warn(
      `MarketplaceSequence final hold (${schedule.finalHold.frames}f) is ` +
        `shorter than the motion grammar's minimum hold (${MIN_HOLD_FRAMES}f).`,
    );
  }

  // --- Continuity + pull-back: the completed Plugin container (real tiles,
  // held exactly as SharePluginSequence left it) scales down uniformly,
  // revealing the storefront chrome fading in around it. ---
  const pluginScale = easedRange(
    frame,
    schedule.pullBackScale.start,
    schedule.pullBackScale.end,
    1,
    PULL_BACK_SCALE,
  );
  const chromeOpacity = easedRange(
    frame,
    schedule.pullBackScale.start,
    schedule.pullBackScale.end,
    0,
    1,
  );

  // Cross-fade from the scaled-down Plugin container into the simplified
  // card0 face once the pull-back settles.
  const pluginContainerOpacity = easedRange(
    frame,
    schedule.pullBackCrossFade.start,
    schedule.pullBackCrossFade.end,
    1,
    0,
  );
  const card0Opacity = easedRange(
    frame,
    schedule.pullBackCrossFade.start,
    schedule.pullBackCrossFade.end,
    0,
    1,
  );

  // --- Catalog reveal: cards 1-3 fade/slide into their shelf slots. ---
  const extraCardOpacities = Array.from({length: CATALOG_EXTRA_CARDS}, (_, index) => {
    const entranceStart = schedule.catalogReveal.start + index * CATALOG_CARD_STAGGER;
    return easedRange(frame, entranceStart, entranceStart + ENTRANCE_FRAMES, 0, 1);
  });
  const extraCardTranslateY = Array.from({length: CATALOG_EXTRA_CARDS}, (_, index) => {
    const entranceStart = schedule.catalogReveal.start + index * CATALOG_CARD_STAGGER;
    return easedRange(frame, entranceStart, entranceStart + ENTRANCE_FRAMES, 24, 0);
  });

  // --- Install/download cue on card0, plus the extended-only trust beat.
  // Typed, explicit per-cut branch: the modular cut fades the cue in and
  // completes it in one beat; the extended cut lets the cue arrive pending,
  // holds it under the magnifier + shield, then completes it only after
  // that inspection fades out. ---
  let downloadOpacity: number;
  let downloadProgress: number;
  let trustOpacity: number;

  if (cutVariant === 'extended') {
    downloadOpacity = easedRange(
      frame,
      schedule.trustBeatIn.start,
      schedule.trustBeatIn.start + ENTRANCE_FRAMES,
      0,
      1,
    );
    downloadProgress = easedRange(frame, schedule.installCue.start, schedule.installCue.end, 0, 1);
    trustOpacity = interpolate(
      frame,
      [
        schedule.trustBeatIn.start,
        schedule.trustBeatIn.start + ENTRANCE_FRAMES,
        schedule.installCue.start,
        schedule.installCue.end,
      ],
      [0, 1, 1, 0],
      {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    );
  } else {
    downloadOpacity = easedRange(
      frame,
      schedule.installCue.start,
      schedule.installCue.start + ENTRANCE_FRAMES,
      0,
      1,
    );
    downloadProgress = easedRange(frame, schedule.installCue.start, schedule.installCue.end, 0, 1);
    trustOpacity = 0;
  }

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.canvas}}>
      <MarketplaceChrome
        opacity={chromeOpacity}
        panelLeft={PANEL_LEFT}
        panelTop={PANEL_TOP}
        panelWidth={PANEL_WIDTH}
        panelHeight={PANEL_HEIGHT}
        titleTop={TITLE_TOP}
        shelfLineTop={SHELF_LINE_TOP}
        doorWidth={STORE_DOOR_WIDTH}
        doorGap={STORE_DOOR_GAP}
      />

      {/* The continued, completed Plugin container: held at native scale,
          then pulled back via a uniform camera-scale before cross-fading
          into its shelf-card face. */}
      <AbsoluteFill style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            opacity: pluginContainerOpacity,
            transform: `scale(${pluginScale})`,
            transformOrigin: '50% 50%',
          }}
        >
          <PluginContainer opacity={1} tileOpacities={[1, 1, 1, 1]} tileTranslateY={[0, 0, 0, 0]} />
        </div>
      </AbsoluteFill>

      {/* Shelf-card row. */}
      {Array.from({length: CARD_COUNT}).map((_, index) => {
        const isHero = index === 0;
        const cardOpacity = isHero ? card0Opacity : extraCardOpacities[index - 1];
        const cardTranslateY = isHero ? 0 : extraCardTranslateY[index - 1];
        return (
          <div
            key={index}
            style={{
              left: cardCenterX(index) - CARD_WIDTH / 2,
              position: 'absolute',
              top: ROW_CENTER_Y - CARD_HEIGHT / 2,
            }}
          >
            <MarketplaceCard
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              opacity={cardOpacity}
              translateY={cardTranslateY}
              accentFill={CARD_ACCENTS[index]}
            >
              <MiniPluginContents
                accentFill={CARD_ACCENTS[index]}
                accentSoft={CARD_ACCENT_SOFTS[index]}
              />
            </MarketplaceCard>

            {isHero ? (
              <>
                {/* Restrained install/download cue, below the card. */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    top: CARD_HEIGHT + 16,
                    width: CARD_WIDTH,
                  }}
                >
                  <DownloadCue opacity={downloadOpacity * cardOpacity} progress={downloadProgress} />
                </div>

                {/* Extended cut only: review-before-install trust cue,
                    paused over the card ahead of the download cue
                    completing. Presence alone signals "under review" --
                    it does not assert that a Marketplace listing is safe. */}
                {cutVariant === 'extended' ? (
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 10,
                      justifyContent: 'center',
                      left: 0,
                      position: 'absolute',
                      top: -78,
                      width: CARD_WIDTH,
                    }}
                  >
                    <ShieldGlyph width={60} opacity={trustOpacity} />
                    <MagnifierGlyph width={42} opacity={trustOpacity} />
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
