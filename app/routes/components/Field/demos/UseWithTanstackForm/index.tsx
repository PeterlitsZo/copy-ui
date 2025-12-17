import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Field } from "@/components/Field";
import { useToast } from "@/components/Toast";

interface DemoForm {
  number: string;
}

const demoFormSchema = z.object({
  number: z
    .string()
    .min(1, "Number is required")
    .regex(/^\d+$/, "Must be a number"),
});

export default function Demo() {
  const { addToast } = useToast();

  const form = useForm({
    defaultValues: {
      number: "",
    },
    validators: {
      onChange: demoFormSchema,
    },
    onSubmit: ({ value }) => {
      addToast(`Submitted number: ${value.number}`);
    },
  });

  return (
    <form>
      <form.Field name="number">
        {(field) => (
          <Field>
            <Field.Label>Number</Field.Label>
            <Field.Input
              type="text"
              placeholder="Enter number"
              value={field.state.value}
              onChange={(e) => field.setValue(e.target.value)}
              onBlur={field.handleBlur}
            />
            {!field.state.meta.isValid && (
              <Field.Error>
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join(", ")}
              </Field.Error>
            )}
          </Field>
        )}
      </form.Field>
    </form>
  );
}
