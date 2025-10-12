import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";
import { createContext, useContext, useId } from "react";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./Field.module.scss";

// FieldContext
// =============================================================================

type FieldContextValue = {
  id: string;
};

const FieldContext = createContext<FieldContextValue | null>(null);

// Field.Label
// =============================================================================

type FieldLabelProps = ComponentProps<"label">;

const FieldLabel: FC<FieldLabelProps> = (props) => {
  const { className, children, style, ...rest } = props;

  const theme = useTheme();

  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("Field.Label must be used within a Field component");
  }

  const { id } = context;

  const computedStyle = {
    "--field-label-color": theme.colors.gray["800"],
    ...style,
  } as CSSProperties;

  return (
    <label
      htmlFor={id}
      className={classNames(styles.fieldLabel, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </label>
  );
};

FieldLabel.displayName = "Field.Label";

// Field.Description
// =============================================================================

type FieldDescriptionProps = ComponentProps<"p">;

const FieldDescription: FC<FieldDescriptionProps> = (props) => {
  const { className, children, style, ...rest } = props;

  const theme = useTheme();

  const computedStyle = {
    "--field-description-color": theme.colors.gray["600"],
    ...style,
  } as CSSProperties;

  return (
    <p
      className={classNames(styles.fieldDescription, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </p>
  );
};

FieldDescription.displayName = "Field.Description";

// Field.Input
// =============================================================================

type FieldInputProps = ComponentProps<typeof Input>;

const FieldInput: FC<FieldInputProps> = (props) => {
  const { ...rest } = props;

  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("Field.Input must be used within a Field component");
  }

  const { id } = context;

  return <Input id={id} {...rest} />;
};

FieldInput.displayName = "Field.Input";

// Field.Select
// =============================================================================

type FieldSelectProps = ComponentProps<typeof Select>;

const FieldSelect: FC<FieldSelectProps> = (props) => {
  const { ...rest } = props;

  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("Field.Select must be used within a Field component");
  }

  const { id } = context;

  return <Select id={id} {...rest} />;
};

// Field
// =============================================================================

type FieldProps = ComponentProps<"div">;

type FieldComponent = FC<FieldProps> & {
  Label: typeof FieldLabel;
  Description: typeof FieldDescription;
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
Field.Input = FieldInput;
Field.Select = FieldSelect;

Field.displayName = "Field";

export { Field };
