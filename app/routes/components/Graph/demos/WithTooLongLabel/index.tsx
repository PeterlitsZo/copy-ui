import { Graph } from "@/components/Graph/graph";

export default function Demo() {
  return (
    <Graph
      nodes={[
        { id: "graph", label: "Graph" },
        {
          id: "with-too-long-label",
          label:
            "This is a very long label -- it should be rendered correctly!",
        },
      ]}
      edges={[{ from: "graph", to: "with-too-long-label" }]}
    />
  );
}
