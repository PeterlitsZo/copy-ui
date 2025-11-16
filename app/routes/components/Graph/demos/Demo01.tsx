import { Graph } from "@/components/Graph/graph";

export default function Demo() {
  return (
    <Graph
      nodes={[
        { id: "graph", label: "Graph" },
        { id: "copyuiprovider", label: "CopyUiProvider" },
        { id: "dagre", label: "@dagrejs/dagre", color: "green" },
      ]}
      edges={[
        { from: "graph", to: "dagre" },
        { from: "graph", to: "copyuiprovider" },
      ]}
    />
  );
}
