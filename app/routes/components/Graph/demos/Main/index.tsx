import { Graph } from "@/components/Graph/graph";

export default function Demo() {
  return (
    <Graph
      nodes={[
        { id: "graph", label: "Graph" },
        { id: "copy-ui-provider", label: "CopyUiProvider" },
        { id: "dagre", label: "@dagrejs/dagre", color: "green" },
      ]}
      edges={[
        { from: "graph", to: "copy-ui-provider" },
        { from: "graph", to: "dagre" },
      ]}
    />
  );
}
