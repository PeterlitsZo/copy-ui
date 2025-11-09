import type { FC } from "react";
import { useJss, useTheme } from "@/components/CopyUiProvider";

type GraphNode = {
  id: string;
  label: string;
};

type GraphProps = {
  nodes: Array<GraphNode>;
};

const Graph: FC<GraphProps> = (props) => {
  const theme = useTheme();
  const jss = useJss();

  const nodeTextStx = jss.hash({
    color: theme.colors.gray['800'],
    dominantBaseline: "middle",
    textAnchor: "middle",
  });

  return (
    <svg role="img" aria-label="graph" width="400" height="200">
      {props.nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={150}
            y={80}
            width={100}
            height={40}
            fill={theme.colors.blue['100']}
            stroke={theme.colors.blue['400']}
            rx="0.25rem"
          />
          <text x={200} y={100} className={nodeTextStx}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export { Graph };
