import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./alert-description.module.scss";

type AlertDescriptionProps = ComponentProps<"p">;

const AlertDescription: FC<AlertDescriptionProps> = (props) => {
  const { className, children, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--alert-description-fontSize": "0.875rem",
    "--alert-description-lineHeight": "1.125rem",
    "--alert-description-color": theme.colors.gray["800"],
  });

  return (
    <p
      className={classNames(styles.alertDescription, stx, className)}
      {...rest}
    >
      {children}
    </p>
  );
};

AlertDescription.displayName = "Alert.Description";

export { AlertDescription };
