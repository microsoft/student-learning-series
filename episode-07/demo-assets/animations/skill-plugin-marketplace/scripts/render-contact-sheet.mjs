// Practical contact-sheet workflow: renders a handful of still frames per
// composition so later final-output work can review beat framing without a
// full render. Uses the Remotion CLI's `still` command per frame — no
// third-party visual assets or extra rendering dependencies required.
import {execFileSync} from 'node:child_process';

const [, , compositionId, ...frameArgs] = process.argv;

if (!compositionId) {
  console.error(
    'Usage: node scripts/render-contact-sheet.mjs <compositionId> <frame> [frame...]',
  );
  process.exit(1);
}

const frames = frameArgs.length > 0 ? frameArgs.map(Number) : [0];
const outDir = `out/contact-sheet/${compositionId}`;

for (const frame of frames) {
  const output = `${outDir}/frame-${String(frame).padStart(5, '0')}.png`;
  execFileSync(
    'npx',
    ['remotion', 'still', 'src/index.ts', compositionId, output, `--frame=${frame}`],
    {stdio: 'inherit', shell: true},
  );
}

console.log(`Contact sheet stills written to ${outDir}`);
