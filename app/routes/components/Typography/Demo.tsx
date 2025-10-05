import { Typography } from "@/components/Typography";

export function Demo() {
  return (
    <div
      style={{
        width: "40rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography.H1>React (software)</Typography.H1>
      <Typography.P mt="1rem">
        React (also known as React.js or ReactJS) is a free and open-source
        front-end JavaScript library that aims to make building user interfaces
        based on components more "seamless".
      </Typography.P>
      <Typography.H2 mt="2rem">Notable features</Typography.H2>
      <Typography.H3 mt="1.5rem">Declarative</Typography.H3>
      <Typography.P mt="1rem">
        React adheres to the declarative programming paradigm. Developers design
        views for each state of an application, and React updates and renders
        components when data changes. This is in contrast with imperative
        programming.
      </Typography.P>
      <Typography.H3 mt="1.5rem">Components</Typography.H3>
      <Typography.P mt="1rem">
        React code is made of entities called components. These components are
        modular and can be reused. React applications typically consist of many
        layers of components. The components are rendered to a root element in
        the DOM using the React DOM library.
      </Typography.P>
    </div>
  );
}
