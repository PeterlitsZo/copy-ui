import { Paper } from "@/components/Paper";
import { Typography as Ty, Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Paper withBorder withPadding radius="md" style={{ width: "40rem" }}>
      <Typography>
        <Ty.H1>React (software)</Ty.H1>
        <Ty.P>
          React (also known as React.js or ReactJS) is a free and open-source
          front-end JavaScript library that aims to make building user
          interfaces based on components more "seamless".
        </Ty.P>
        <Ty.P>
          React can be used to develop single-page, mobile, or server-rendered
          applications with frameworks like Next.js and React Router. Because
          React is only concerned with the user interface and rendering
          components to the DOM, React applications often rely on libraries for
          routing and other client-side functionality.
        </Ty.P>
        <Ty.H2>Notable features</Ty.H2>
        <Ty.H3>Declarative</Ty.H3>
        <Ty.P>
          React adheres to the declarative programming paradigm. Developers
          design views for each state of an application, and React updates and
          renders components when data changes. This is in contrast with
          imperative programming.
        </Ty.P>
        <Ty.H3>Components</Ty.H3>
        <Ty.P>
          React code is made of entities called components. These components are
          modular and can be reused. React applications typically consist of
          many layers of components. The components are rendered to a root
          element in the DOM using the React DOM library.
        </Ty.P>
      </Typography>
    </Paper>
  );
}
