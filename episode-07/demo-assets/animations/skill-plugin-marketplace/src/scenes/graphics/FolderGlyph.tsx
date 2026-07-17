// Original folder glyph (tab + body), drawn as plain SVG shapes. No
// third-party icon package or OS chrome — just two rounded rectangles.
import React from 'react';

export type FolderGlyphProps = {
  width: number;
  height: number;
  fill: string;
  tabFill: string;
  strokeColor?: string;
};

export const FolderGlyph = ({
  width,
  height,
  fill,
  tabFill,
  strokeColor,
}: FolderGlyphProps): React.JSX.Element => {
  const tabWidth = width * 0.42;
  const tabHeight = height * 0.16;
  const bodyTop = tabHeight * 0.75;
  const bodyHeight = height - bodyTop;
  const radius = Math.min(width, height) * 0.06;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{display: 'block'}}
    >
      <rect
        x={0}
        y={0}
        width={tabWidth}
        height={tabHeight}
        rx={radius}
        fill={tabFill}
      />
      <rect
        x={0}
        y={bodyTop}
        width={width}
        height={bodyHeight}
        rx={radius}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeColor ? 3 : 0}
      />
    </svg>
  );
};
