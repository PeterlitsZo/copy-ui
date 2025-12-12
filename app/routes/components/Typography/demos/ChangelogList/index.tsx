import { Paper } from "@/components/Paper";
import { Typography as Ty, Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Paper withBorder withPadding radius="md" style={{ width: "40rem" }}>
      <Typography>
        <Ty.Ul>
          <Ty.Li>
            2025-10-02: Initial version (with <Ty.Code>Typography.H1</Ty.Code>{" "}
            component).
          </Ty.Li>
          <Ty.Li>
            2025-10-03: Added <Ty.Code>Typography.H2</Ty.Code>,{" "}
            <Ty.Code>Typography.H3</Ty.Code> and <Ty.Code>Typography.P</Ty.Code>
            components. Support the <Ty.Code>mt</Ty.Code> prop for margin-top
            spacing & update CSS styles to make it look better.
          </Ty.Li>
          <Ty.Li>
            2025-10-04: Add <Ty.Code>Typography.H4</Ty.Code> component. Support{" "}
            <Ty.Code>mb</Ty.Code> prop for margin-bottom spacing. Increase{" "}
            <Ty.Code>H1</Ty.Code> font size and improve prop handling
            consistency.
          </Ty.Li>
        </Ty.Ul>
      </Typography>
    </Paper>
  );
}
