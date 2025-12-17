import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { FileInput } from "@/components/FileInput";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";

import styles from "./field-components.module.css";
import { useFieldContext } from "./field-context";

// Field.Label
// =============================================================================

type FieldLabelProps = ComponentProps<"label">;

const FieldLabel: FC<FieldLabelProps> = (props) => {
  const { className, children, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const { id } = useFieldContext();

  const stx = jss.hash({
    "--fieldLabel-color": theme.colors.gray["800"],
  });

  return (
    <label
      htmlFor={id}
      className={classNames(styles.fieldLabel, stx, className)}
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
  const { className, children, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--fieldDescription-color": theme.colors.gray["600"],
  });

  return (
    <p
      className={classNames(styles.fieldDescription, stx, className)}
      {...rest}
    >
      {children}
    </p>
  );
};

FieldDescription.displayName = "Field.Description";

// Field.Error
// =============================================================================

type FieldErrorProps = ComponentProps<"p">;

const FieldError: FC<FieldErrorProps> = (props) => {
  const { className, children, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--fieldError-color": theme.colors.red["650"],
  });

  return (
    <p className={classNames(styles.fieldError, stx, className)} {...rest}>
      {children}
    </p>
  );
};

// Field.Input
// =============================================================================

type FieldInputProps = ComponentProps<typeof Input>;

const FieldInput: FC<FieldInputProps> = (props) => {
  const { ...rest } = props;

  const { id } = useFieldContext();

  return <Input id={id} {...rest} />;
};

FieldInput.displayName = "Field.Input";

// Field.FileInput
// =============================================================================

type FieldFileInputProps = ComponentProps<typeof FileInput>;

const FieldFileInput: FC<FieldFileInputProps> = (props) => {
  const { ...rest } = props;

  const { id } = useFieldContext();

  return <FileInput id={id} {...rest} />;
};

FieldFileInput.displayName = "Field.FileInput";

// Field.Textarea
// =============================================================================

type FieldTextareaProps = ComponentProps<"textarea">;

const FieldTextarea: FC<FieldTextareaProps> = (props) => {
  const { ...rest } = props;

  const { id } = useFieldContext();

  return <Textarea id={id} {...rest} />;
};

FieldTextarea.displayName = "Field.Textarea";

// Field.Select
// =============================================================================

type FieldSelectProps = ComponentProps<typeof Select>;

const FieldSelect: FC<FieldSelectProps> = (props) => {
  const { ...rest } = props;

  const { id } = useFieldContext();

  return <Select id={id} {...rest} />;
};

// Exports
// =============================================================================

export {
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldInput,
  FieldFileInput,
  FieldTextarea,
  FieldSelect,
};
