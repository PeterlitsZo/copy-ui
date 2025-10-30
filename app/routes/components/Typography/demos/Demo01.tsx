import { Paper } from "@/components/Paper";
import { Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Paper withBorder withPadding radius="md" style={{ width: "40rem" }}>
      <Typography>
        <Typography.H1>React (software)</Typography.H1>
        <Typography.P>
          React (also known as React.js or ReactJS) is a free and open-source
          front-end JavaScript library that aims to make building user
          interfaces based on components more "seamless".
        </Typography.P>
        <Typography.H2>Notable features</Typography.H2>
        <Typography.H3>Declarative</Typography.H3>
        <Typography.P>
          React adheres to the declarative programming paradigm. Developers
          design views for each state of an application, and React updates and
          renders components when data changes. This is in contrast with
          imperative programming.
        </Typography.P>
        <Typography.H3>Components</Typography.H3>
        <Typography.P>
          React code is made of entities called components. These components are
          modular and can be reused. React applications typically consist of
          many layers of components. The components are rendered to a root
          element in the DOM using the React DOM library.
        </Typography.P>
      </Typography>
    </Paper>
  );
}
