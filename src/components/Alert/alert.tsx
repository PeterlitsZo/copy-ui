import classNames from "classnames";
import type { ComponentProps, FC, ReactNode } from "react";

import { type ColorName, useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./alert.module.css";
import { AlertDescription } from "./alert-description";
import { AlertTitle } from "./alert-title";

export type AlertProps = ComponentProps<"div"> & {
  children: ReactNode;
  color?: ColorName;
};

type AlertComponent = FC<AlertProps> & {
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
};

const Alert: AlertComponent = (props) => {
  const { className, children, color = "gray", ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--alert-bgColor": `color-mix(in srgb, ${theme.colors[color]["000"]}, white)`,
    "--alert-bdColor": `color-mix(in srgb, ${theme.colors[color]["500"]}, ${theme.colors.gray["500"]} 25%)`,
    "--alert-bdRadius": "0.5rem",
    "--alert-iconColor": theme.colors[color]["800"],
    "--alert-titleColor": theme.colors[color]["900"],
  });

  return (
    <div
      className={classNames(styles.alert, stx, className)}
      role="alert"
      {...rest}
    >
      {children}
    </div>
  );
};

Alert.displayName = "Alert";

Alert.Title = AlertTitle;
Alert.Description = AlertDescription;

export { Alert };
