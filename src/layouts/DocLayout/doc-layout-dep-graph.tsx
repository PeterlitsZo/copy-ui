import type { FC } from "react";

import type { ColorName } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Graph } from "@/components/Graph";
import { Paper } from "@/components/Paper";

type GraphNode = {
  id: string;
  label: string;
  color?: ColorName;
};

type GraphEdge = {
  from: string;
  to: string;
};

type DocLayoutDepGraphProps = {
  nodes: Array<GraphNode>;
  edges?: Array<GraphEdge>;
};

const DocLayoutDepGraph: FC<DocLayoutDepGraphProps> = (props) => {
  return (
    <Paper radius="md" withBorder withPadding>
      <Flex justifyContent="center">
        <Graph nodes={props.nodes} edges={props.edges} />
      </Flex>
    </Paper>
  );
};

DocLayoutDepGraph.displayName = "DocLayout.DepGraph";

export { DocLayoutDepGraph };
