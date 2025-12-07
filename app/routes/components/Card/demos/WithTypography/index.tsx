import { Card } from "@/components/Card";
import { Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Card width="30rem">
      <Card.Content withTypography>
        <Typography.P>
          This Card component demonstrates the use of Typography components
          within Card.Content. When the{" "}
          <Typography.Code>withTypography</Typography.Code> prop is enabled, all
          content is automatically wrapped in a Typography container.
        </Typography.P>
        <Typography.H2>Features</Typography.H2>
        <Typography.H3>Automatic Typography Wrapping</Typography.H3>
        <Typography.P>
          The <Typography.Code>withTypography</Typography.Code> prop ensures
          consistent typography styling across all content within the Card.
        </Typography.P>
        <Typography.H3>Rich Content Support</Typography.H3>
        <Typography.P>
          You can use various Typography components like headings, paragraphs,
          and inline code to create rich, structured content.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}
