import { Typography } from "@/components/Typography";
import { DocLayout } from "@/layouts/DocLayout";

import Demo01 from "./demos/Demo01";
import demo01SourceCode from "./demos/Demo01.source_code.codegen";
import Demo02 from "./demos/Demo02";
import demo02SourceCode from "./demos/Demo02.source_code.codegen";

const code01 = `\
const [isOpen, setIsOpen] = useState(false);

return (
  <Modal isOpen={isOpen}>
    <Modal.Overlay onClick={() => setIsOpen(false)} />
    <Modal.Content center shadow>
      {anyThingYouWantToRender}
    </Modal.Content>
  </Modal>
);
`;

export function Doc() {
  return (
    <>
      <DocLayout.Live node={<Demo01 />} code={demo01SourceCode} />
      <Typography.P>
        You can use the Modal component to display content in a modal overlay.
        The code to render the Modal component looks like the following:
      </Typography.P>
      <Typography.CodeBlock withLineNumbers lang="tsx" code={code01} />
      <Typography.P>
        It contains two main sub-components:{" "}
        <Typography.Code>Modal.Overlay</Typography.Code> and{" "}
        <Typography.Code>Modal.Content</Typography.Code>. The{" "}
        <Typography.Code>Modal.Overlay</Typography.Code> is used to render the
        overlay background, and the{" "}
        <Typography.Code>Modal.Content</Typography.Code> is used to render the
        actual content of the modal (you can use the{" "}
        <Typography.Code>center</Typography.Code> and{" "}
        <Typography.Code>shadow</Typography.Code> props to make it place
        properly and have good shadow).
      </Typography.P>
      <Typography.P>
        It also provides a <Typography.Code>Modal.Raw</Typography.Code>{" "}
        sub-component that can render the modal but without any default styling.
        See the section below for an example.
      </Typography.P>
      <Typography.H2>Examples</Typography.H2>
      <Typography.H3>Using Modal.Raw</Typography.H3>
      <DocLayout.Live node={<Demo02 />} code={demo02SourceCode} />
    </>
  );
}
