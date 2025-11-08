import { Field } from "@/components/Field";

export default function Demo() {
  return (
    <Field>
      <Field.Label>My Favorite Fruit</Field.Label>
      <Field.Input type="text" placeholder="Enter fruit name" />
      <Field.Error>Sorry that is not my favorite fruit.</Field.Error>
    </Field>
  );
}
