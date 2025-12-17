import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import {
  SortIndicator,
  type SortIndicatorDirection,
  useDirections,
} from "@/components/SortIndicator";
import { Table } from "@/components/Table";

export default function Demo() {
  const [directions, setDirection] = useDirections({
    name: "asc",
    age: "none",
    gender: "none",
    city: "none",
  });

  const jss = useJss();

  const headStx = jss.hash({
    cursor: "pointer",
    userSelect: "none",
  });

  const indicatorStx = jss.hash({
    height: "0.875rem",
  });

  const people = usePeople(directions);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className={headStx} onClick={() => setDirection("name")}>
            <Flex gap="0.5rem" items="center" justify="space-between">
              <span>Name</span>
              <SortIndicator
                variant="compact"
                direction={directions.name}
                className={indicatorStx}
              />
            </Flex>
          </Table.Head>
          <Table.Head className={headStx} onClick={() => setDirection("age")}>
            <Flex gap="0.5rem" items="center" justify="space-between">
              <span>Age</span>
              <SortIndicator
                variant="compact"
                direction={directions.age}
                className={indicatorStx}
              />
            </Flex>
          </Table.Head>
          <Table.Head
            className={headStx}
            onClick={() => setDirection("gender")}
          >
            <Flex gap="0.5rem" items="center" justify="space-between">
              <span>Gender</span>
              <SortIndicator
                variant="compact"
                direction={directions.gender}
                className={indicatorStx}
              />
            </Flex>
          </Table.Head>
          <Table.Head className={headStx} onClick={() => setDirection("city")}>
            <Flex gap="0.5rem" items="center" justify="space-between">
              <span>City</span>
              <SortIndicator
                variant="compact"
                direction={directions.city}
                className={indicatorStx}
              />
            </Flex>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {people.map((person) => (
          <Table.Row key={person.name}>
            <Table.Cell>{person.name}</Table.Cell>
            <Table.Cell>{person.age}</Table.Cell>
            <Table.Cell>{person.gender}</Table.Cell>
            <Table.Cell>{person.city}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function usePeople(directions: Record<string, SortIndicatorDirection>) {
  const people = [
    { name: "Hannah", age: 33, gender: "female", city: "New York" },
    { name: "Alice", age: 25, gender: "female", city: "Los Angeles" },
    { name: "David", age: 32, gender: "male", city: "Chicago" },
    { name: "Eve", age: 27, gender: "female", city: "Houston" },
    { name: "Bob", age: 30, gender: "male", city: "Miami" },
    { name: "Grace", age: 29, gender: "female", city: "Seattle" },
    { name: "Charlie", age: 28, gender: "male", city: "Boston" },
    { name: "Frank", age: 31, gender: "male", city: "San Francisco" },
    { name: "Jack", age: 34, gender: "male", city: "Washington" },
    { name: "Isaac", age: 26, gender: "male", city: "New Orleans" },
  ];

  if (directions.name !== "none") {
    people.sort((a, b) => {
      if (directions.name === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }
  if (directions.age !== "none") {
    people.sort((a, b) => {
      if (directions.age === "asc") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
  }
  if (directions.gender !== "none") {
    people.sort((a, b) => {
      if (directions.gender === "asc") {
        return a.gender.localeCompare(b.gender);
      } else {
        return b.gender.localeCompare(a.gender);
      }
    });
  }
  if (directions.city !== "none") {
    people.sort((a, b) => {
      if (directions.city === "asc") {
        return a.city.localeCompare(b.city);
      } else {
        return b.city.localeCompare(a.city);
      }
    });
  }

  return people;
}
