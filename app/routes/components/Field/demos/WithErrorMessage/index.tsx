import { Field } from "@/components/Field";
import { Input } from "@/components/Input";

export default function Demo() {
  return (
    <Field>
      <Field.Label>My Favorite Fruit</Field.Label>
      <Input status="error" type="text" placeholder="Enter fruit name" />
      <Field.Error>Sorry that is not my favorite fruit.</Field.Error>
    </Field>
  );
}
