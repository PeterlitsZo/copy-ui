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
    </Flex>
  );
}
