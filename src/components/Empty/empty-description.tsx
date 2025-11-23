import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./empty-description.module.scss";

type EmptyDescriptionProps = ComponentProps<"div">;

const EmptyDescription: FC<EmptyDescriptionProps> = (props) => {
  const { children, className, ...rest } = props;

  const jss = useJss();
  const theme = useTheme();

  const stx = jss.hash({
    "--emptyDescription-color": theme.colors.gray["600"],
  });

  return (
    <div
      className={classNames(styles.emptyDescription, stx, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

EmptyDescription.displayName = "Empty.Description";

export { EmptyDescription };
