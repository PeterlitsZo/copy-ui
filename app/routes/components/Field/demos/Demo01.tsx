import { useId } from "react";

import { Field } from "@/components/Field";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const usernameId = useId();
  const emailId = useId();

  return (
    <Flex dir="column" gap="1rem">
      <Field>
        <Field.Label htmlFor={usernameId}>Username</Field.Label>
        <Field.Input
          width="sm"
          id={usernameId}
          type="text"
          placeholder="Enter your username"
        />
      </Field>

      <Field>
        <Field.Label htmlFor={emailId}>Email</Field.Label>
        <Field.Input id={emailId} type="email" placeholder="Enter your email" />
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
