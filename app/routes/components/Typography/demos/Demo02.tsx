import { Paper } from "@/components/Paper";
import { Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Paper withBorder withPadding radius="md" style={{ width: "40rem" }}>
      <Typography>
        <Typography.Ul>
          <Typography.Li>
            2025-10-02: Initial version (with{" "}
            <Typography.Code>Typography.H1</Typography.Code> component).
          </Typography.Li>
          <Typography.Li>
            2025-10-03: Added <Typography.Code>Typography.H2</Typography.Code>,{" "}
            <Typography.Code>Typography.H3</Typography.Code> and{" "}
            <Typography.Code>Typography.P</Typography.Code>
            components. Support the <Typography.Code>mt</Typography.Code> prop
            for margin-top spacing & update CSS styles to make it look better.
          </Typography.Li>
          <Typography.Li>
            2025-10-04: Add <Typography.Code>Typography.H4</Typography.Code>{" "}
            component. Support <Typography.Code>mb</Typography.Code> prop for
            margin-bottom spacing. Increase{" "}
            <Typography.Code>H1</Typography.Code> font size and improve prop
            handling consistency.
          </Typography.Li>
        </Typography.Ul>
      </Typography>
    </Paper>
  );
}
