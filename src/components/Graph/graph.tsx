import dagre from "@dagrejs/dagre";
import type { FC } from "react";
import { useId, useMemo } from "react";

import { type ColorName, useJss, useTheme } from "@/components/CopyUiProvider";

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
      nodesep: 40,
      ranksep: 60,
    });

    g.setDefaultEdgeLabel(() => ({}));

    for (const node of nodes) {
      g.setNode(node.id, {
        label: node.label,
        width: 130,
        height: 40,
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
      minX = Math.min(minX, x - 50);
      minY = Math.min(minY, y - 20);
      maxX = Math.max(maxX, x + 50);
      maxY = Math.max(maxY, y + 20);
    }

    const padding = 20;
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
  const arrowheadId = useId();

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
          <polygon points="0 0, 6 3, 0 6" fill={theme.colors.gray["600"]} />
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

  if (points.length < 2) return null;

  const pathData = points
    .map((point, idx) => {
      const command = idx === 0 ? "M" : "L";
      return `${command} ${point.x} ${point.y}`;
    })
    .join(" ");

  return (
    <path
      d={pathData}
      fill="none"
      stroke={theme.colors.gray["600"]}
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

  const theme = useTheme();
  const jss = useJss();

  const nodeTextStx = jss.hash({
    color: theme.colors.gray["800"],
    dominantBaseline: "middle",
    textAnchor: "middle",
  });

  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <rect
        x={-65}
        y={-20}
        width={130}
        height={40}
        fill={theme.colors[color]["000"]}
        stroke={theme.colors[color]["600"]}
        rx="0.25rem"
      />
      <text className={nodeTextStx}>{label}</text>
    </g>
  );
};

export { Graph };
