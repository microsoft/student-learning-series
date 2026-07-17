// The shared middle sequence, built by "Build sharing and the Plugin
// transformation" (issue #23): continues from the intact Skill-folder hold
// left by OpeningSequence (issue #22), shows the folder duplicated and sent
// person-to-person, then refocuses on the received copy. "Build the Rubber
// Duck Agent Persona origin" (issue #32) continues from that refocused
// hero hold: the Skill folder settles into a sibling slot beside a neutral
// AI figure, which receives a Rubber Duck role badge and resolves into a
// legible `rubber-duck.agent.md` card — a parallel, sibling building block,
// not something nested inside the Skill. Both siblings then converge
// together into the titled Plugin container, which still holds the same
// four module tiles (Skills, Agent Personas, MCP Servers, + more) as
// before. Ends on an editor-safe hold of the completed Plugin container,
// which MarketplaceSequence (issue #24's Marketplace beat) continues from
// untouched.
//
// All shapes are original SVG/CSS — no third-party icons, logos, or branded
// UI. Follows the same continuous zoom/morph technique as OpeningSequence:
// a scaled "exterior" layer (the office scene, then the Skill/Agent Persona
// siblings) cross-fades into a native-scale "interior" layer (the Plugin
// container) once the push-in peaks, so the container's contents render at
// legible size rather than inheriting the exterior's zoom factor. The
// neutral-figure-to-document resolve reuses that same "swap representation
// in place" cross-fade technique at a fixed screen position.
//
// "Integrate and retime the expanded animation" (issue #26) retimed this
// sequence's flex-hold weights: issue #32's extra persona beats split the
// same share-plugin frame budget five ways instead of three, which pushed
// several reading holds in the modular (60s) cut under the motion grammar's
// minimum hold length. See the schedule below for the corrected ratio.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {HEIGHT, WIDTH} from '../contract';
import {
  buildSchedule,
  EASE_OUT,
  ENTRANCE_FRAMES,
  LABEL_FADE_FRAMES,
  MIN_HOLD_FRAMES,
  MORPH_FRAMES,
  easedRange,
} from '../motion';
import {COLORS, FONT_STACK} from '../theme';
import {AgentPersonaDocumentGlyph} from './graphics/AgentPersonaDocumentGlyph';
import {AgentPersonaGlyph} from './graphics/AgentPersonaGlyph';
import {FolderGlyph} from './graphics/FolderGlyph';
import {
  PLUGIN_TILE_LABELS,
  PluginContainer,
} from './graphics/PluginContainer';
import {PersonAtComputerGlyph} from './graphics/PersonAtComputerGlyph';
import {RoleBadgeGlyph} from './graphics/RoleBadgeGlyph';
import {HERO_HEIGHT, HERO_WIDTH} from './OpeningSequence';

export type SharePluginSequenceProps = {
  /** Frames allotted to this scene within the current cut (duration-aware). */
  durationInFrames: number;
};

const CANVAS_CENTER_X = WIDTH / 2;
const CANVAS_CENTER_Y = HEIGHT / 2;

// "Desk" layout for the sender/recipient office scene.
const SENDER_X = 460;
const RECIPIENT_X = WIDTH - SENDER_X;
const DESK_FOLDER_Y = 340;
const PERSON_Y = 480;
const PERSON_WIDTH = 260;
const DESK_FOLDER_WIDTH = 170;
const DESK_FOLDER_HEIGHT = 130;
const DESK_LABEL_FONT_SIZE = 22;
const HERO_LABEL_FONT_SIZE = 40;

const PLUGIN_PEAK_SCALE = 2.35;
const TILE_ENTRANCE_STAGGER = 9;

type Point = {x: number; y: number};

const quadraticBezier = (t: number, p0: Point, p1: Point, p2: Point): Point => {
  const oneMinusT = 1 - t;
  return {
    x: oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x,
    y: oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y,
  };
};

// Rubber Duck Agent Persona origin ("Build the Rubber Duck Agent Persona
// origin", issue #32): once the hand-off refocus settles the received Skill
// folder at canvas center, it slides into a left sibling slot while a
// neutral AI figure fades in at a matching right sibling slot — Skill and
// Agent Persona read as parallel siblings from the moment either exists.
// The figure then receives a role badge and resolves into the
// `rubber-duck.agent.md` card at that exact same slot, so the card never
// has to travel to "become" a sibling — it already is one.
const SIBLING_OFFSET_X = 260;
const SKILL_SIBLING_CENTER_X = CANVAS_CENTER_X - SIBLING_OFFSET_X;
const PERSONA_SIBLING_CENTER_X = CANVAS_CENTER_X + SIBLING_OFFSET_X;
const PERSONA_ROBOT_SIZE = 220;
const PERSONA_BADGE_SIZE = 92;
const PERSONA_BADGE_SPAWN: Point = {x: PERSONA_SIBLING_CENTER_X + 150, y: CANVAS_CENTER_Y - 220};
const PERSONA_BADGE_ARC_PEAK: Point = {x: PERSONA_SIBLING_CENTER_X + 60, y: CANVAS_CENTER_Y - 140};
const PERSONA_BADGE_DOCK: Point = {
  x: PERSONA_SIBLING_CENTER_X + PERSONA_ROBOT_SIZE * 0.3,
  y: CANVAS_CENTER_Y + PERSONA_ROBOT_SIZE * 0.26,
};

export const SharePluginSequence = ({
  durationInFrames,
}: SharePluginSequenceProps): React.JSX.Element => {
  const frame = useCurrentFrame();

  // Flex weights ("Integrate and retime the expanded animation", issue #26):
  // the four short beat-to-beat reading holds (continuedHold, preShareHold,
  // preBadgeHold, roleHold) share one weight tier, the two post-beat "settle"
  // holds (postShareHold, personaHold) a slightly larger tier, and the final
  // pre-Marketplace hold (pluginHold) the largest tier. At the original 1:2:3
  // ratio the modular (60s) cut's four short holds landed at 37f — well
  // under the motion grammar's 54f minimum readable hold — once issue #32's
  // extra persona beats (siblingSplit through personaHold) split the same
  // 60s share-plugin budget five ways instead of three. This 14:15:19 ratio
  // keeps every hold at or above that floor in the 60s cut while still
  // giving the extended (90s) cut generous, differentiated breathing room.
  const schedule = buildSchedule(durationInFrames, [
    {name: 'continuedHold', kind: 'flex', weight: 14},
    {name: 'peopleAndRelocate', kind: 'fixed', frames: MORPH_FRAMES + ENTRANCE_FRAMES},
    {name: 'preShareHold', kind: 'flex', weight: 14},
    {name: 'duplicatePeel', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'duplicateTravel', kind: 'fixed', frames: MORPH_FRAMES * 2},
    {name: 'duplicateSettle', kind: 'fixed', frames: ENTRANCE_FRAMES},
    {name: 'postShareHold', kind: 'flex', weight: 15},
    {name: 'refocusToRecipient', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'siblingSplit', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'preBadgeHold', kind: 'flex', weight: 14},
    {name: 'badgeAssign', kind: 'fixed', frames: MORPH_FRAMES + ENTRANCE_FRAMES},
    {name: 'roleHold', kind: 'flex', weight: 14},
    {name: 'personaResolve', kind: 'fixed', frames: LABEL_FADE_FRAMES},
    {name: 'personaHold', kind: 'flex', weight: 15},
    {name: 'pluginZoomIn', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'pluginContentCrossFade', kind: 'fixed', frames: LABEL_FADE_FRAMES},
    {
      name: 'tilesEntrance',
      kind: 'fixed',
      frames: ENTRANCE_FRAMES + (PLUGIN_TILE_LABELS.length - 1) * TILE_ENTRANCE_STAGGER,
    },
    {name: 'pluginHold', kind: 'flex', weight: 19},
  ]);

  const holdSegmentNames = [
    'continuedHold',
    'preShareHold',
    'postShareHold',
    'preBadgeHold',
    'roleHold',
    'personaHold',
    'pluginHold',
  ] as const;
  for (const holdName of holdSegmentNames) {
    if (schedule[holdName].frames < MIN_HOLD_FRAMES) {
      // A future scene ticket compressing this sequence's share of the cut
      // should see this in dev tooling rather than silently clip a hold that
      // this scene (or the Marketplace beat, issue #24) is meant to read or
      // continue from.
      // eslint-disable-next-line no-console
      console.warn(
        `SharePluginSequence ${holdName} (${schedule[holdName].frames}f) is ` +
          `shorter than the motion grammar's minimum hold (${MIN_HOLD_FRAMES}f).`,
      );
    }
  }

  // --- Office scene: people entrance + sender folder relocating to its desk ---
  const peopleOpacity = easedRange(
    frame,
    schedule.peopleAndRelocate.start,
    schedule.peopleAndRelocate.start + ENTRANCE_FRAMES,
    0,
    1,
  );

  const senderFolderCenterX = easedRange(
    frame,
    schedule.peopleAndRelocate.start,
    schedule.peopleAndRelocate.end,
    CANVAS_CENTER_X,
    SENDER_X,
  );
  const senderFolderCenterY = easedRange(
    frame,
    schedule.peopleAndRelocate.start,
    schedule.peopleAndRelocate.end,
    CANVAS_CENTER_Y,
    DESK_FOLDER_Y,
  );
  const senderFolderWidth = easedRange(
    frame,
    schedule.peopleAndRelocate.start,
    schedule.peopleAndRelocate.end,
    HERO_WIDTH,
    DESK_FOLDER_WIDTH,
  );
  const senderFolderHeight = easedRange(
    frame,
    schedule.peopleAndRelocate.start,
    schedule.peopleAndRelocate.end,
    HERO_HEIGHT,
    DESK_FOLDER_HEIGHT,
  );
  const senderLabelFontSize = easedRange(
    frame,
    schedule.peopleAndRelocate.start,
    schedule.peopleAndRelocate.end,
    HERO_LABEL_FONT_SIZE,
    DESK_LABEL_FONT_SIZE,
  );

  // The sender's original folder + label + both people fade out together as
  // attention shifts entirely to the recipient's copy. The sender's folder
  // itself never animates a "disappearance" tied to the duplication — it sits
  // static at its desk from the moment it arrives there until this shared
  // office-wide refocus fade, well after the duplicate has already traveled.
  const officeOpacity = easedRange(
    frame,
    schedule.refocusToRecipient.start,
    schedule.refocusToRecipient.end,
    1,
    0,
  );

  // --- Duplicate: peels off the original, travels an arc, settles at the recipient ---
  const spawnPoint: Point = {x: SENDER_X + 16, y: DESK_FOLDER_Y + 16};
  const arcPeak: Point = {x: CANVAS_CENTER_X, y: DESK_FOLDER_Y - 170};
  const arrivalPoint: Point = {x: RECIPIENT_X, y: DESK_FOLDER_Y};

  const sharePathOpacity = interpolate(
    frame,
    [
      schedule.duplicatePeel.start,
      schedule.duplicatePeel.end,
      schedule.refocusToRecipient.start,
      schedule.refocusToRecipient.end,
    ],
    [0, 0.5, 0.5, 0],
    {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  let duplicateOpacity: number;
  let duplicatePos: Point;
  if (frame < schedule.duplicatePeel.start) {
    duplicateOpacity = 0;
    duplicatePos = spawnPoint;
  } else if (frame <= schedule.duplicatePeel.end) {
    duplicateOpacity = easedRange(frame, schedule.duplicatePeel.start, schedule.duplicatePeel.end, 0, 1);
    duplicatePos = spawnPoint;
  } else if (frame <= schedule.duplicateTravel.end) {
    duplicateOpacity = 1;
    const t = easedRange(frame, schedule.duplicateTravel.start, schedule.duplicateTravel.end, 0, 1);
    duplicatePos = quadraticBezier(t, spawnPoint, arcPeak, arrivalPoint);
  } else {
    duplicateOpacity = 1;
    duplicatePos = arrivalPoint;
  }

  // --- Recipient/hero folder: settled duplicate -> refocused, canvas-centered hero ---
  const recipientFolderVisible = frame > schedule.duplicateTravel.end;
  let recipientFolderCenterX: number;
  let recipientFolderCenterY: number;
  let recipientFolderWidth: number;
  let recipientFolderHeight: number;
  let recipientLabelFontSize: number;

  if (frame <= schedule.refocusToRecipient.start) {
    recipientFolderCenterX = arrivalPoint.x;
    recipientFolderCenterY = arrivalPoint.y;
    recipientFolderWidth = DESK_FOLDER_WIDTH;
    recipientFolderHeight = DESK_FOLDER_HEIGHT;
    recipientLabelFontSize = DESK_LABEL_FONT_SIZE;
  } else {
    recipientFolderCenterX = easedRange(
      frame,
      schedule.refocusToRecipient.start,
      schedule.refocusToRecipient.end,
      arrivalPoint.x,
      CANVAS_CENTER_X,
    );
    recipientFolderCenterY = easedRange(
      frame,
      schedule.refocusToRecipient.start,
      schedule.refocusToRecipient.end,
      arrivalPoint.y,
      CANVAS_CENTER_Y,
    );
    recipientFolderWidth = easedRange(
      frame,
      schedule.refocusToRecipient.start,
      schedule.refocusToRecipient.end,
      DESK_FOLDER_WIDTH,
      HERO_WIDTH,
    );
    recipientFolderHeight = easedRange(
      frame,
      schedule.refocusToRecipient.start,
      schedule.refocusToRecipient.end,
      DESK_FOLDER_HEIGHT,
      HERO_HEIGHT,
    );
    recipientLabelFontSize = easedRange(
      frame,
      schedule.refocusToRecipient.start,
      schedule.refocusToRecipient.end,
      DESK_LABEL_FONT_SIZE,
      HERO_LABEL_FONT_SIZE,
    );
  }

  // --- Skill folder settles into its left sibling slot right after the
  //     hand-off refocus, making room for the Agent Persona origin beat to
  //     play out beside it as a parallel sibling, not a nested detail. ---
  recipientFolderCenterX += easedRange(
    frame,
    schedule.siblingSplit.start,
    schedule.siblingSplit.end,
    0,
    SKILL_SIBLING_CENTER_X - CANVAS_CENTER_X,
  );

  // --- Neutral AI figure: fades in at the right sibling slot as the Skill
  //     folder settles into its own slot — the two exist as siblings from
  //     first appearance, before any role has been assigned. ---
  const robotOpacity = easedRange(
    frame,
    schedule.siblingSplit.start,
    schedule.siblingSplit.start + ENTRANCE_FRAMES,
    0,
    1,
  );
  const robotTranslateY = easedRange(
    frame,
    schedule.siblingSplit.start,
    schedule.siblingSplit.start + ENTRANCE_FRAMES,
    24,
    0,
  );

  // --- Role badge: travels an arc from its spawn point to dock onto the
  //     neutral figure, the moment the Rubber Duck role is assigned. ---
  const badgeOpacity = easedRange(
    frame,
    schedule.badgeAssign.start,
    schedule.badgeAssign.start + ENTRANCE_FRAMES,
    0,
    1,
  );
  const badgeTravelT = easedRange(
    frame,
    schedule.badgeAssign.start,
    schedule.badgeAssign.end,
    0,
    1,
  );
  const badgePos = quadraticBezier(
    badgeTravelT,
    PERSONA_BADGE_SPAWN,
    PERSONA_BADGE_ARC_PEAK,
    PERSONA_BADGE_DOCK,
  );

  // --- Role resolves: the neutral figure + badge cross-fade into the
  //     legible `rubber-duck.agent.md` card at that same sibling slot — the
  //     same "swap representation in place" technique used below for the
  //     Skill/Plugin hand-off, so the badge never has to travel again once
  //     the card exists. ---
  const roleGroupOpacity = easedRange(
    frame,
    schedule.personaResolve.start,
    schedule.personaResolve.end,
    1,
    0,
  );
  const personaDocOpacity = easedRange(
    frame,
    schedule.personaResolve.start,
    schedule.personaResolve.end,
    0,
    1,
  );
  const personaDocWidth = easedRange(
    frame,
    schedule.personaResolve.start,
    schedule.personaResolve.end,
    PERSONA_ROBOT_SIZE,
    HERO_WIDTH,
  );
  const personaDocHeight = easedRange(
    frame,
    schedule.personaResolve.start,
    schedule.personaResolve.end,
    PERSONA_ROBOT_SIZE,
    HERO_HEIGHT,
  );

  // --- Continuous push-in on the refocused folder, cross-fading into the Plugin container ---
  const cameraScale = interpolate(
    frame,
    [schedule.pluginZoomIn.start, schedule.pluginZoomIn.end],
    [1, PLUGIN_PEAK_SCALE],
    {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const exteriorContentOpacity = easedRange(
    frame,
    schedule.pluginContentCrossFade.start,
    schedule.pluginContentCrossFade.end,
    1,
    0,
  );
  const pluginContainerOpacity = easedRange(
    frame,
    schedule.pluginContentCrossFade.start,
    schedule.pluginContentCrossFade.end,
    0,
    1,
  );

  const tileOpacities = PLUGIN_TILE_LABELS.map((_, index) => {
    const entranceStart = schedule.tilesEntrance.start + index * TILE_ENTRANCE_STAGGER;
    const entranceEnd = entranceStart + ENTRANCE_FRAMES;
    return easedRange(frame, entranceStart, entranceEnd, 0, 1);
  }) as [number, number, number, number];
  const tileTranslateY = PLUGIN_TILE_LABELS.map((_, index) => {
    const entranceStart = schedule.tilesEntrance.start + index * TILE_ENTRANCE_STAGGER;
    const entranceEnd = entranceStart + ENTRANCE_FRAMES;
    return easedRange(frame, entranceStart, entranceEnd, 24, 0);
  }) as [number, number, number, number];

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.canvas}}>
      {/* Exterior layer: the office scene (people, sender's folder, the
          traveling/received duplicate), pushed in by the continuous camera
          scale before cross-fading out to the Plugin container. */}
      <AbsoluteFill
        style={{transform: `scale(${cameraScale})`, transformOrigin: '50% 50%'}}
      >
        <div style={{opacity: peopleOpacity * officeOpacity}}>
          <div style={{position: 'absolute', left: SENDER_X - PERSON_WIDTH / 2, top: PERSON_Y}}>
            <PersonAtComputerGlyph
              width={PERSON_WIDTH}
              opacity={1}
              accentColor={COLORS.primary}
              accentSoft={COLORS.primarySoft}
            />
          </div>
          <div style={{position: 'absolute', left: RECIPIENT_X - PERSON_WIDTH / 2, top: PERSON_Y}}>
            <PersonAtComputerGlyph
              width={PERSON_WIDTH}
              opacity={1}
              accentColor={COLORS.accent}
              accentSoft={COLORS.accentSoft}
            />
          </div>
        </div>

        {/* A subtle dashed arc traces the duplicate's path, so the transfer
            reads as a clear, deliberate hand-off rather than a jump cut. */}
        <svg
          width={WIDTH}
          height={HEIGHT}
          style={{left: 0, position: 'absolute', top: 0}}
        >
          <path
            d={`M ${spawnPoint.x} ${spawnPoint.y} Q ${arcPeak.x} ${arcPeak.y} ${arrivalPoint.x} ${arrivalPoint.y}`}
            fill="none"
            stroke={COLORS.line}
            strokeDasharray="10 10"
            strokeWidth={3}
            opacity={sharePathOpacity}
          />
        </svg>

        {/* Sender's original folder — stays put at its desk for the whole
            share beat; only fades with the rest of the office on refocus. */}
        <div
          style={{
            left: senderFolderCenterX - senderFolderWidth / 2,
            opacity: officeOpacity,
            position: 'absolute',
            top: senderFolderCenterY - senderFolderHeight / 2,
          }}
        >
          <FolderGlyph
            width={senderFolderWidth}
            height={senderFolderHeight}
            fill={COLORS.primarySoft}
            tabFill={COLORS.primary}
            strokeColor={COLORS.primary}
          />
          <div
            style={{
              color: COLORS.ink,
              fontFamily: FONT_STACK,
              fontSize: senderLabelFontSize,
              fontWeight: 700,
              left: 0,
              position: 'absolute',
              textAlign: 'center',
              top: senderFolderHeight + 14,
              width: senderFolderWidth,
            }}
          >
            Skill
          </div>
        </div>

        {/* The duplicate in flight, then the recipient's settled/refocused copy. */}
        {recipientFolderVisible ? (
          <div
            style={{
              left: recipientFolderCenterX - recipientFolderWidth / 2,
              opacity: exteriorContentOpacity,
              position: 'absolute',
              top: recipientFolderCenterY - recipientFolderHeight / 2,
            }}
          >
            <FolderGlyph
              width={recipientFolderWidth}
              height={recipientFolderHeight}
              fill={COLORS.primarySoft}
              tabFill={COLORS.primary}
              strokeColor={COLORS.primary}
            />
            <div
              style={{
                color: COLORS.ink,
                fontFamily: FONT_STACK,
                fontSize: recipientLabelFontSize,
                fontWeight: 700,
                left: 0,
                position: 'absolute',
                textAlign: 'center',
                top: recipientFolderHeight + 14,
                width: recipientFolderWidth,
              }}
            >
              Skill
            </div>
          </div>
        ) : (
          <div
            style={{
              left: duplicatePos.x - DESK_FOLDER_WIDTH / 2,
              opacity: duplicateOpacity,
              position: 'absolute',
              top: duplicatePos.y - DESK_FOLDER_HEIGHT / 2,
            }}
          >
            <FolderGlyph
              width={DESK_FOLDER_WIDTH}
              height={DESK_FOLDER_HEIGHT}
              fill={COLORS.primarySoft}
              tabFill={COLORS.primary}
              strokeColor={COLORS.primary}
            />
          </div>
        )}

        {/* Rubber Duck Agent Persona origin: a neutral AI figure appears as
            a sibling beside the settled Skill folder, receives a role
            badge, then resolves into the legible rubber-duck.agent.md card
            at that same slot — Skill and Agent Persona read as parallel
            siblings the whole time, never as one nested inside the other. */}
        <div
          style={{
            left: PERSONA_SIBLING_CENTER_X - PERSONA_ROBOT_SIZE / 2,
            opacity: robotOpacity * roleGroupOpacity,
            position: 'absolute',
            top: CANVAS_CENTER_Y - PERSONA_ROBOT_SIZE / 2,
            transform: `translateY(${robotTranslateY}px)`,
          }}
        >
          <AgentPersonaGlyph width={PERSONA_ROBOT_SIZE} opacity={1} />
        </div>

        <div
          style={{
            left: badgePos.x - PERSONA_BADGE_SIZE / 2,
            opacity: badgeOpacity * roleGroupOpacity,
            position: 'absolute',
            top: badgePos.y - PERSONA_BADGE_SIZE / 2,
          }}
        >
          <RoleBadgeGlyph width={PERSONA_BADGE_SIZE} opacity={1} />
        </div>

        <div
          style={{
            left: PERSONA_SIBLING_CENTER_X - personaDocWidth / 2,
            opacity: personaDocOpacity * exteriorContentOpacity,
            position: 'absolute',
            top: CANVAS_CENTER_Y - personaDocHeight / 2,
          }}
        >
          <AgentPersonaDocumentGlyph
            width={personaDocWidth}
            height={personaDocHeight}
            opacity={1}
          />
        </div>
      </AbsoluteFill>

      {/* Interior layer: the Plugin container, native scale, cross-faded in
          once the push-in on the recipient's folder peaks. */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <PluginContainer
          opacity={pluginContainerOpacity}
          tileOpacities={tileOpacities}
          tileTranslateY={tileTranslateY}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
