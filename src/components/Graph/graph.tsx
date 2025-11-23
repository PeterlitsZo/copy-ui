import dagre from "@dagrejs/dagre";
import type { FC } from "react";
import { useId, useMemo } from "react";

import {
  type ColorName,
  useJss,
  useMode,
  useTheme,
} from "@/components/CopyUiProvider";

const NODESEP = 25;
const RANKSEP = 60;
const NODEWIDTH = 140;
const NODEHEIGHT = 40;
const PADDING = 20;

type GraphNode = {
  id: string;
  label: string;
  color?: ColorName;
};

type GraphEdge = {
  from: string;
  to: string;
};

type GraphProps = {
  nodes: Array<GraphNode>;
  edges?: Array<GraphEdge>;
};

const Graph: FC<GraphProps> = (props) => {
  const { nodes, edges = [] } = props;

  const layout = useMemo(() => {
    const g = new dagre.graphlib.Graph();

    g.setGraph({
      rankdir: "LR",
      nodesep: NODESEP,
      ranksep: RANKSEP,
    });

    g.setDefaultEdgeLabel(() => ({}));

    for (const node of nodes) {
      g.setNode(node.id, {
        label: node.label,
        width: NODEWIDTH,
        height: NODEHEIGHT,
      });
    }

    for (const edge of edges) {
      g.setEdge(edge.from, edge.to);
    }

    dagre.layout(g);

    const nodePositions = new Map<string, { x: number; y: number }>();
    for (const node of nodes) {
      const n = g.node(node.id);
      nodePositions.set(node.id, { x: n.x, y: n.y });
    }

    const edgePaths = edges.map((edge) => {
      const e = g.edge(edge.from, edge.to);
      return { from: edge.from, to: edge.to, points: e.points };
    });

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const { x, y } of nodePositions.values()) {
      minX = Math.min(minX, x - NODEWIDTH / 2);
      minY = Math.min(minY, y - NODEHEIGHT / 2);
      maxX = Math.max(maxX, x + NODEWIDTH / 2);
      maxY = Math.max(maxY, y + NODEHEIGHT / 2);
    }

    const padding = PADDING;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const offsetX = -minX + padding;
    const offsetY = -minY + padding;

    return {
      nodePositions,
      edgePaths,
      width,
      height,
      offsetX,
      offsetY,
    };
  }, [nodes, edges]);

  const theme = useTheme();
  const mode = useMode();
  const arrowheadId = useId();

  const arrowheadColor =
    mode === "dark" ? theme.colors.gray["400"] : theme.colors.gray["600"];

  return (
    <svg
      role="img"
      aria-label="graph"
      width={layout.width}
      height={layout.height}
    >
      <defs>
        <marker
          id={arrowheadId}
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill={arrowheadColor} />
        </marker>
      </defs>

      <g transform={`translate(${layout.offsetX}, ${layout.offsetY})`}>
        {layout.edgePaths.map((edge) => (
          <GraphEdge
            key={`${edge.from}-${edge.to}`}
            points={edge.points}
            arrowheadId={arrowheadId}
          />
        ))}

        {nodes.map((node) => {
          const pos = layout.nodePositions.get(node.id);
          if (!pos) return null;
          return (
            <GraphNode
              key={node.id}
              x={pos.x}
              y={pos.y}
              color={node.color ?? "blue"}
              label={node.label}
            />
          );
        })}
      </g>
    </svg>
  );
};

Graph.displayName = "Graph";

type GraphEdgeProps = {
  points: Array<{ x: number; y: number }>;
  arrowheadId: string;
};

const GraphEdge: FC<GraphEdgeProps> = (props) => {
  const { points, arrowheadId } = props;

  const theme = useTheme();
  const mode = useMode();

  if (points.length !== 3) return null;

  const [start, control, end] = points;

  const midStart = {
    x: (start.x + control.x) / 2,
    y: (start.y + control.y) / 2,
  };
  const midEnd = { x: (control.x + end.x) / 2, y: (control.y + end.y) / 2 };

  const pathData = [
    `M ${start.x} ${start.y}`,
    `L ${midStart.x} ${midStart.y}`,
    `C ${control.x} ${control.y} ${midEnd.x} ${midEnd.y} ${end.x} ${end.y}`,
  ].join(" ");

  const edgeColor =
    mode === "dark" ? theme.colors.gray["400"] : theme.colors.gray["600"];

  return (
    <path
      d={pathData}
      fill="none"
      stroke={edgeColor}
      strokeWidth="1"
      markerEnd={`url(#${arrowheadId})`}
    />
  );
};

type GraphNodeProps = {
  x: number;
  y: number;
  color: ColorName;
  label: string;
};

const GraphNode: FC<GraphNodeProps> = (props) => {
  const { x, y, color, label } = props;

  const mode = useMode();
  const theme = useTheme();
  const jss = useJss();

  const nodeTextColor =
    mode === "dark" ? theme.colors.gray["200"] : theme.colors.gray["800"];
  const nodeBorderColor =
    mode === "dark" ? theme.colors[color]["400"] : theme.colors[color]["600"];
  const nodeBackgroundColor =
    mode === "dark" ? theme.colors[color]["800"] : theme.colors[color]["000"];

  const nodeTextStx = jss.hash({
    dominantBaseline: "middle",
    textAnchor: "middle",
  });

  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <rect
        x={-NODEWIDTH / 2}
        y={-NODEHEIGHT / 2}
        width={NODEWIDTH}
        height={NODEHEIGHT}
        fill={nodeBackgroundColor}
        stroke={nodeBorderColor}
        rx="0.25rem"
      />
      <text className={nodeTextStx} fill={nodeTextColor}>
        {label}
      </text>
    </g>
  );
};

export { Graph };
