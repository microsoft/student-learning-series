import {AbsoluteFill, Sequence} from 'remotion';
import {MarketplaceCutVariant, MarketplaceSequence} from './MarketplaceSequence';
import {OpeningSequence} from './OpeningSequence';
import {SharePluginSequence} from './SharePluginSequence';

// One shared scene composed of three parts, all driven by the same
// {cutLabel, durationInFrames} contract so the 60s and 90s cuts stay
// visually consistent while covering different runtimes. Boundaries are
// computed as cumulative beat fractions (rather than per-segment fractions)
// so rounding never drifts and every segment's frame count sums exactly to
// `durationInFrames`:
//
// - OpeningSequence (beats 1-2 of 5: Skill folder, SKILL.md): the production
//   opening reveal built by "Build the Skill folder and SKILL.md reveal"
//   (issue #22). Ends on a clean, centered, intact Skill-folder hold.
// - SharePluginSequence (beats 3-4 of 5: Share, Plugin): built by "Build
//   sharing and the Plugin transformation" (issue #23). Continues from that
//   hold, duplicates the folder to a second person, then refocuses and
//   expands the received copy into a titled Plugin container holding Skills,
//   Agent Personas, MCP Servers, and + more tiles. Ends on an editor-safe
//   hold of the completed Plugin container.
// - MarketplaceSequence (beat 5 of 5: Marketplace): built by "Build the
//   Marketplace storefront and plugin catalog" (issue #24). Continues from
//   that Plugin-container hold, pulls back into an original storefront
//   titled Marketplace, reveals multiple distinct Plugin cards, and ends on
//   an uncluttered storefront hold. `cutVariant` is threaded through
//   explicitly (not inferred from `cutLabel`) so the extended cut's
//   review-before-install trust beat is a typed branch.
const TOTAL_BEATS = 5;
const OPENING_BEATS = 2;
const SHARE_PLUGIN_BEATS = 2;

export type SharedSceneProps = {
  cutVariant: MarketplaceCutVariant;
  durationInFrames: number;
};

export const SharedScene = ({cutVariant, durationInFrames}: SharedSceneProps) => {
  const openingFrames = Math.round((OPENING_BEATS / TOTAL_BEATS) * durationInFrames);
  const sharePluginEnd = Math.round(
    ((OPENING_BEATS + SHARE_PLUGIN_BEATS) / TOTAL_BEATS) * durationInFrames,
  );
  const sharePluginFrames = sharePluginEnd - openingFrames;
  const marketplaceFrames = durationInFrames - sharePluginEnd;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={openingFrames} layout="none">
        <OpeningSequence durationInFrames={openingFrames} />
      </Sequence>
      <Sequence from={openingFrames} durationInFrames={sharePluginFrames} layout="none">
        <SharePluginSequence durationInFrames={sharePluginFrames} />
      </Sequence>
      <Sequence from={sharePluginEnd} durationInFrames={marketplaceFrames} layout="none">
        <MarketplaceSequence cutVariant={cutVariant} durationInFrames={marketplaceFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};
