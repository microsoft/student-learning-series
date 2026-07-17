import {Composition} from 'remotion';
import {SharedScene} from './scenes/SharedScene';
import {
  COMPOSITION_ID_EXTENDED,
  COMPOSITION_ID_MODULAR,
  EXTENDED_DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  MODULAR_DURATION_IN_FRAMES,
  WIDTH,
} from './contract';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id={COMPOSITION_ID_MODULAR}
        component={SharedScene}
        durationInFrames={MODULAR_DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          cutVariant: 'modular',
          durationInFrames: MODULAR_DURATION_IN_FRAMES,
        }}
      />
      <Composition
        id={COMPOSITION_ID_EXTENDED}
        component={SharedScene}
        durationInFrames={EXTENDED_DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          cutVariant: 'extended',
          durationInFrames: EXTENDED_DURATION_IN_FRAMES,
        }}
      />
    </>
  );
};
