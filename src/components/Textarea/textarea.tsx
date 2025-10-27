import classNames from "classnames";
import type { ComponentProps } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./textarea.module.scss";

type TextareaProps = ComponentProps<"textarea">;

const Textarea: React.FC<TextareaProps> = (props) => {
  const { className, children, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--textarea-border-color": theme.colors.gray["300"],
    "--textarea-focus-border-color": theme.colors.blue["800"],
    "--textarea-bg-color": "white",
    "--textarea-font-size": "0.875rem",
    "--textarea-placeholder-color": theme.tokens.inputBasePlaceholderColor,
  });

  return (
    <textarea className={classNames(styles.textarea, stx, className)} {...rest}>
      {children}
    </textarea>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
