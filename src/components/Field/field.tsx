import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import { useId } from "react";

import styles from "./field.module.scss";
import {
  FieldDescription,
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
  FieldTextarea,
} from "./field-components";
import { FieldContext } from "./field-context";

type FieldProps = ComponentProps<"div">;

type FieldComponent = FC<FieldProps> & {
  Label: typeof FieldLabel;
  Description: typeof FieldDescription;
  Error: typeof FieldError;
  Textarea: typeof FieldTextarea;
  Input: typeof FieldInput;
  Select: typeof FieldSelect;
};

const Field: FieldComponent = (props) => {
  const { className, children, ...rest } = props;

  const id = useId();

  return (
    <FieldContext value={{ id }}>
      {/* biome-ignore lint/a11y/useSemanticElements: It is fine here. */}
      <div
        role="group"
        className={classNames(styles.field, className)}
        {...rest}
      >
        {children}
      </div>
    </FieldContext>
  );
};

Field.Label = FieldLabel;
Field.Description = FieldDescription;
Field.Error = FieldError;
Field.Textarea = FieldTextarea;
Field.Input = FieldInput;
Field.Select = FieldSelect;

Field.displayName = "Field";

export { Field };
