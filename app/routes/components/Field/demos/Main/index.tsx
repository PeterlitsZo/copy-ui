import { Field } from "@/components/Field";
import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";

export default function Demo() {
  return (
    <Flex dir="column" gap="1rem">
      <Field>
        <Field.Label>Username</Field.Label>
        <Input width="sm" type="text" placeholder="Enter your username" />
      </Field>

      <Field>
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="Enter your email" />
        <Field.Description>We'll never share your email.</Field.Description>
      </Field>

      <Field>
        <Field.Label>Country</Field.Label>
        <Field.Select
          options={[
            { value: "ca", label: "Canada" },
            { value: "cn", label: "China" },
            { value: "uk", label: "United Kingdom" },
            { value: "us", label: "United States" },
          ]}
        />
      </Field>

      <Field>
        <Field.Label>About You</Field.Label>
        <Field.Textarea placeholder="Tell us about yourself" />
      </Field>
    </Flex>
  );
}
