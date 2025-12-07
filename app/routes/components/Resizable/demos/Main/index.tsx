import { Paper } from "@/components/Paper";
import { Resizable } from "@/components/Resizable";

export default function Demo() {
  return (
    <Paper radius="md" withBorder style={{ height: "20rem", width: "100%" }}>
      <Resizable.PanelGroup direction="horizontal">
        <Resizable.Panel defaultSize={30} minSize={20}>
          <Paper withPadding>
            This is the left panel. You can drag the divider to resize it.
          </Paper>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={70} minSize={30}>
          <Paper withPadding>
            This is the right panel. Drag the divider between the panels to
            adjust their sizes.
          </Paper>
        </Resizable.Panel>
      </Resizable.PanelGroup>
    </Paper>
  );
}
