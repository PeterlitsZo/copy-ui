import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { useOptionalFieldContext } from "@/components/Field";
import { extractStylesProps, IbsBase } from "@/components/IbsBase";

import styles from "./input.module.css";

export type InputProps = ComponentProps<typeof IbsBase> &
  Omit<ComponentProps<"input">, "size"> & {
    variant?: "default" | "filled";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    status?: "error";
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
  };

export const Input: FC<InputProps> = (props) => {
  const {
    id: originalId,

    variant = "default",
    size = "md",
    status,
    leftSection,
    rightSection,
    className,
    style,
    disabled,

    placeholder,
    onChange,

    ...others
  } = props;

  const fieldContext = useOptionalFieldContext();
  const id = originalId ?? fieldContext?.id;

  const { stx: baseStyleStx, rest } = extractStylesProps(others);

  const theme = useTheme();
  const jss = useJss();

  const baseStx = jss.hash({
    "--input-bdColor": status === "error" ? theme.colors.red["650"] : undefined,
    "--input-pl": leftSection ? "0.125rem" : "0.75rem",
    "--input-pr": rightSection ? "0.125rem" : "0.75rem",
    "--input-placeholderColor": theme.tokens.inputBasePlaceholderColor,
    "--input-caretColor": theme.colors.blue["800"],
    "--input-focus-bdColor":
      status === "error" ? theme.colors.red["650"] : theme.colors.blue["650"],
  });

  const inputStx = jss.hash({
    "--input-fontSize": "var(--ibsBase-fontSize)",
    "--input-lineHeight": "var(--ibsBase-lineHeight)",
  });

  return (
    <IbsBase
      variant={variant}
      size={size}
      disabled={disabled}
      style={style}
      className={classNames(styles.ibsBase, baseStx, baseStyleStx, className)}
    >
      {leftSection && <IbsBase.LeftSection>{leftSection}</IbsBase.LeftSection>}
      {leftSection || rightSection ? (
        <IbsBase.Wrapper>
          <input
            id={id}
            className={classNames(styles.input, inputStx)}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        </IbsBase.Wrapper>
      ) : (
        <input
          id={id}
          className={classNames(styles.input, inputStx)}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
      )}
      {rightSection && (
        <IbsBase.RightSection>{rightSection}</IbsBase.RightSection>
      )}
    </IbsBase>
  );
};

Input.displayName = "Input";
