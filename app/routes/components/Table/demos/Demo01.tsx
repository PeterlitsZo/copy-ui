import { Table } from "@/components/Table";

export default function Demo() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Age</Table.Head>
          <Table.Head>City</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>25</Table.Cell>
          <Table.Cell>New York</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bob</Table.Cell>
          <Table.Cell>30</Table.Cell>
          <Table.Cell>London</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Charlie</Table.Cell>
          <Table.Cell>28</Table.Cell>
          <Table.Cell>Tokyo</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
