# Skill/Plugin/Marketplace animation

Remotion project for the Episode 07 Skill → Plugin → Marketplace animation. This is
the final source location; the earlier proof scaffold at
`episode-07/skills-to-marketplace-animation/` (see
[issue #20](https://github.com/microsoft/student-learning-series/issues/20)) was
migrated here in full by
[issue #27](https://github.com/microsoft/student-learning-series/issues/27) and no
longer exists.

## Composition contract

Both compositions render the same shared scene component
(`src/scenes/SharedScene.tsx`) driven by a `{cutVariant, durationInFrames}` prop
contract, so the two cuts stay visually consistent while covering different
runtimes:

| Composition ID                     | Duration            | Resolution | FPS | Audio |
| ----------------------------------- | -------------------- | ---------- | --- | ----- |
| `SkillPluginMarketplaceModular`     | 1,800 frames (60s)   | 1920x1080  | 30  | none  |
| `SkillPluginMarketplaceExtended`    | 2,700 frames (90s)   | 1920x1080  | 30  | none  |

`SharedScene` now composes three parts, split at cumulative beat boundaries
(the same five equal beats used by the earlier placeholder):

- `src/scenes/OpeningSequence.tsx` — the production opening, originally built
  by [issue #22](https://github.com/microsoft/student-learning-series/issues/22)
  and replaced by the workflow-to-Skill formation sequence from
  [issue #31](https://github.com/microsoft/student-learning-series/issues/31):
  four abstract, unlabeled, numbered steps appear connected as a readable
  workflow, then compress/morph in place into the first four instruction
  lines inside a forming `SKILL.md` document. The `scripts`, `references`, and
  `assets` companion folders join alongside it, and a Skill folder forms
  around the complete contents before collapsing to a clean, centered, intact
  Skill folder hold. The panel deliberately establishes the same rounded
  package, accent-title, and explicit-hierarchy language used by the later
  Plugin and Marketplace packages.
- `src/scenes/SharePluginSequence.tsx` — the shared middle sequence built by
  [issue #23](https://github.com/microsoft/student-learning-series/issues/23):
  continues from that hold, shows the folder explicitly duplicated (the
  sender keeps the original; a copy travels a visible arc to a second
  generic person-at-computer illustration), then refocuses on the received
  copy. From that refocused hero hold, the Rubber Duck Agent Persona origin
  built by [issue #32](https://github.com/microsoft/student-learning-series/issues/32)
  continues: the Skill folder settles into a left sibling slot while a
  neutral AI figure (the same robot-badge glyph the `Agent Personas` tile
  already used) fades in at a matching right sibling slot, establishing
  Skill and Agent Persona as parallel siblings from the moment either
  exists. An original role-badge glyph then travels an arc onto the figure
  — the Rubber Duck role being assigned — before the figure and badge
  cross-fade, in place, into a legible `rubber-duck.agent.md` document card
  (`src/scenes/graphics/AgentPersonaDocumentGlyph.tsx`) showing five short
  fields: Name, Role, Method, Priorities, and Boundaries. Both settled
  siblings — the Skill folder and the `rubber-duck.agent.md` card — then
  converge together into a titled `Plugin` container holding four sibling
  tiles — `Skills`, `Agent Personas`, `MCP Servers`, and `+ more` — via
  original folder/robot-badge/server-stack icon glyphs in
  `src/scenes/graphics/`. Ends on an editor-safe hold of the completed
  Plugin container, exactly as before. Its flex-hold weights were retimed by
  [issue #26](https://github.com/microsoft/student-learning-series/issues/26):
  splitting the same share-plugin frame budget across five reading holds
  instead of three (once issue #32 added the sibling/badge/role beats) had
  pushed several of them under the 60s cut's minimum readable-hold length;
  the corrected ratio keeps every hold readable in the 60s cut while the 90s
  cut breathes with proportionally more room.
- `src/scenes/MarketplaceSequence.tsx` — the shared final sequence built by
  [issue #24](https://github.com/microsoft/student-learning-series/issues/24):
  continues from that Plugin-container hold, uses a continuous pull-back
  (a uniform camera-scale zoom-out, cross-fading into a shelf-card face) to
  turn the Plugin into one product card inside an original storefront
  titled `Marketplace` — a friendly shop/catalog with an awning, side pillars,
  framed display window, glazed doorway, plinth, and shelf, deliberately free
  of prices, checkout, or currency. All four products use the same miniature
  Plugin geometry, title treatment, and three legible labeled rows for
  `Skills`, `Agent Personas`, and `MCP Servers`. Existing accent colors flow
  through each package's title, row panel, and original glyphs to distinguish
  the packages without fake product names. The featured card gets a restrained
  download cue. The extended (90s) cut additionally
  pauses that cue under a magnifier + shield "under review" cue before it
  completes — the review-before-install trust beat, kept out of the modular
  (60s) cut via a typed `cutVariant: 'modular' | 'extended'` branch set
  explicitly per composition in `src/Root.tsx`. Both cuts end on an
  uncluttered Marketplace storefront hold with no closing text.

All shapes across every scene are original SVG/CSS on a light neutral
editorial canvas — no third-party icons, logos, or branded OS chrome. Shared
timing/motion helpers live in `src/motion.ts` (easing curve, fixed
motion-grammar frame counts, and a `buildSchedule` helper that lets holds
breathe longer on the 90-second cut without changing the pace of the fixed
motion beats) and visual tokens live in `src/theme.ts`.

Render output is H.264 MP4, video-only (`Config.setMuted(true)`), `yuv420p` pixel
format, with no audio stream — see `remotion.config.ts`. `remotion.config.ts` also
falls back to a system Microsoft Edge install (`Config.setBrowserExecutable`) when
present: the bundled `chrome-headless-shell` binary can fail to spawn
(`ENOENT`/`0xfffffffe`) from worktree paths deep enough to exceed Windows' legacy
260-character `MAX_PATH`, such as `copilot-worktrees\...` checkouts.

The Episode 7 production master is committed as
`skill-plugin-marketplace-60s.mp4`. It is the verified modular render: 1920x1080,
30fps, 1,800 frames, 60 seconds, H.264, and no audio stream. The 90-second
composition remains available in source for extended uses but is not a committed
production render.

## Commands

Install dependencies:

~~~powershell
npm install
~~~

Open Remotion Studio (previews both compositions):

~~~powershell
npm run preview
~~~

Render the modular 60-second cut to `out/skill-plugin-marketplace-modular-60s.mp4`:

~~~powershell
npm run render:modular
~~~

Render the extended 90-second cut to `out/skill-plugin-marketplace-extended-90s.mp4`:

~~~powershell
npm run render:extended
~~~

Render both cuts in one step:

~~~powershell
npm run render:all
~~~

## Contact-sheet workflow

`scripts/render-contact-sheet.mjs` renders a handful of still frames per
composition via the Remotion CLI's `still` command, so later final-output work
can review beat framing without a full render. No third-party visual assets are
imported.

~~~powershell
npm run contact-sheet:modular   # stills for the 60s cut -> out/contact-sheet/SkillPluginMarketplaceModular/
npm run contact-sheet:extended  # stills for the 90s cut -> out/contact-sheet/SkillPluginMarketplaceExtended/
npm run contact-sheet:all       # both
~~~

You can also target arbitrary frames directly:

~~~powershell
node scripts/render-contact-sheet.mjs SkillPluginMarketplaceModular 0 900 1799
~~~

Generated files and contact-sheet stills are written to `out/`, which is
intentionally excluded from source control. Only the selected 60-second production
master is copied from `out/` to `skill-plugin-marketplace-60s.mp4` for versioning.

## Local review page

`review.html` plays both final cuts side by side (with a handful of contact-sheet
thumbnails per cut) directly from `out/`, so both renders can be compared without
a video editor. Regenerate `out/` first (`npm run render:all` and
`npm run contact-sheet:all`), then open `review.html` in a browser. It is not
part of the render pipeline and reads `out/` paths directly, so it always
reflects whatever was rendered most recently.
