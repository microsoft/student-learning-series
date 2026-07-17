// Four abstract, unlabeled workflow steps connected as a readable sequence
// — the opening image for "Build the workflow-to-Skill formation sequence"
// (issue #31), replacing the earlier file-browser-first opening. Each step
// is drawn as a plain numbered node (no captions, no icons standing in for
// specific tools) so the shape reads as "a repeatable procedure" in the
// abstract, before OpeningSequence morphs these same four nodes into the
// instruction lines inside SKILL.md.
//
// Every node's position, size, corner rounding, fill, and numeral opacity
// are driven entirely by props (computed per-frame by OpeningSequence), so
// this component can render the same four nodes across the entrance, hold,
// and compress-into-document phases without knowing about scheduling itself
// — it only knows how to draw a node and the connectors between them.
import React from 'react';
import {COLORS, FONT_STACK} from '../../theme';

export type WorkflowStepNode = {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  cornerRadius: number;
  fill: string;
  numeralOpacity: number;
  /** Node's own entrance opacity (independent of the shared connector fade). */
  opacity: number;
  /** Entrance offset in px; settles to 0 before the node ever needs to move. */
  translateY: number;
};

export type WorkflowStepsProps = {
  nodes: readonly [WorkflowStepNode, WorkflowStepNode, WorkflowStepNode, WorkflowStepNode];
  /** Opacity of the connecting lines/arrows between consecutive nodes. */
  connectorOpacity: number;
};

export const WorkflowSteps = ({
  nodes,
  connectorOpacity,
}: WorkflowStepsProps): React.JSX.Element => {
  return (
    <>
      {/* Connectors render first (behind the nodes) as a single SVG layer
          covering the whole canvas, so the arrowheads can be simple SVG
          markers rather than rotated CSS triangles. */}
      <svg
        width="100%"
        height="100%"
        style={{left: 0, opacity: connectorOpacity, position: 'absolute', top: 0}}
      >
        <defs>
          <marker
            id="workflow-step-arrow"
            markerWidth={10}
            markerHeight={10}
            refX={7}
            refY={5}
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill={COLORS.primary} />
          </marker>
        </defs>
        {nodes.slice(0, -1).map((node, index) => {
          const next = nodes[index + 1];
          const startX = node.centerX + node.width / 2;
          const endX = next.centerX - next.width / 2 - 12;
          return (
            <line
              key={index}
              x1={startX}
              y1={node.centerY}
              x2={endX}
              y2={next.centerY}
              stroke={COLORS.primary}
              strokeWidth={3}
              markerEnd="url(#workflow-step-arrow)"
            />
          );
        })}
      </svg>

      {nodes.map((node, index) => (
        <div
          key={index}
          style={{
            alignItems: 'center',
            background: node.fill,
            borderRadius: node.cornerRadius,
            display: 'flex',
            height: node.height,
            justifyContent: 'center',
            left: node.centerX - node.width / 2,
            opacity: node.opacity,
            position: 'absolute',
            top: node.centerY - node.height / 2,
            transform: `translateY(${node.translateY}px)`,
            width: node.width,
          }}
        >
          <div
            style={{
              color: COLORS.surface,
              fontFamily: FONT_STACK,
              fontSize: Math.min(node.width, node.height) * 0.42,
              fontWeight: 700,
              opacity: node.numeralOpacity,
            }}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </>
  );
};
