import { Paper } from "@/components/Paper";
import { Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Paper withBorder withPadding radius="md" style={{ width: "40rem" }}>
      <Typography>
        <Typography.P>
          This is the main source code repository for Rust. It contains the
          compiler, standard library, and documentation.
        </Typography.P>
        <Typography.H2>Why Rust</Typography.H2>
        <Typography.Ol>
          <Typography.Li>
            <Typography.Strong>Performance:</Typography.Strong> Fast and
            memory-efficient, suitable for critical services, embedded devices,
            and easily integrated with{" "}
            <Typography.Em>other languages</Typography.Em>.
          </Typography.Li>
          <Typography.Li>
            <Typography.Em>etc.</Typography.Em>
          </Typography.Li>
        </Typography.Ol>
      </Typography>
    </Paper>
  );
}
