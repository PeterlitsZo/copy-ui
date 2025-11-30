import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";

import styles from "./alert-title.module.scss";

type AlertTitleProps = ComponentProps<"h3">;

const AlertTitle: FC<AlertTitleProps> = (props) => {
  const { className, children, ...rest } = props;

  const jss = useJss();

  const stx = jss.hash({
    "--alertTitle-fontSize": "1rem",
    "--alertTitle-lineHeight": "1.25rem",
    "--alertTitle-color": "var(--alert-titleColor)",
  });

  return (
    <h3 className={classNames(styles.alertTitle, stx, className)} {...rest}>
      {children}
    </h3>
  );
};

AlertTitle.displayName = "Alert.Title";

export { AlertTitle };
