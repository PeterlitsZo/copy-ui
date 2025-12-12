import { Paper } from "@/components/Paper";
import { Typography as Ty, Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Paper withBorder withPadding radius="md" style={{ width: "40rem" }}>
      <Typography>
        <Ty.P>
          This is the main source code repository for{" "}
          <Ty.A href="https://www.rust-lang.org/">Rust</Ty.A>. It contains the
          compiler, standard library, and documentation.
        </Ty.P>
        <Ty.H2>Why Rust</Ty.H2>
        <Ty.Ol>
          <Ty.Li>
            <Ty.Strong>Performance:</Ty.Strong> Fast and memory-efficient,
            suitable for critical services, embedded devices, and easily
            integrated with <Ty.Em>other languages</Ty.Em>.
          </Ty.Li>
          <Ty.Li>
            <Ty.Em>etc.</Ty.Em>
          </Ty.Li>
        </Ty.Ol>
      </Typography>
    </Paper>
  );
}
