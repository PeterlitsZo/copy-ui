import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { extractStylesProps, IbsBase } from "@/components/IbsBase";

import styles from "./input.module.scss";

export type InputProps = ComponentProps<typeof IbsBase> &
  ComponentProps<"input"> & {
    variant?: "default" | "filled";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
  };

export const Input: FC<InputProps> = (props) => {
  const {
    variant = "default",
    size = "md",
    leftSection,
    rightSection,
    className,
    style,
    disabled,

    placeholder,
    onChange,

    ...others
  } = props;

  const { stx: baseStyleStx, rest } = extractStylesProps(others);

  const theme = useTheme();
  const jss = useJss();

  const baseStx = jss.hash({
    "--input-focus-bdColor": theme.colors.blue["800"],
    "--input-paddingInlineStart": leftSection ? "0.125rem" : "0.75rem",
    "--input-paddingInlineEnd": rightSection ? "0.125rem" : "0.75rem",
    "--input-placeholderColor": theme.tokens.inputBasePlaceholderColor,
    "--input-caretColor": theme.colors.blue["800"],
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
            className={classNames(styles.input, inputStx)}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        </IbsBase.Wrapper>
      ) : (
        <input
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
