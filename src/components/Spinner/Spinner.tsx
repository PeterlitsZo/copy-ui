import classNames from "classnames";
import { Loader2Icon } from "lucide-react";
import type { FC } from "react";

import styles from "./Spinner.module.scss";

type SpinnerProps = React.ComponentProps<"svg">;

export const Spinner: FC<SpinnerProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={classNames(styles.spinner, className)}
      {...rest}
    />
  );
};

Spinner.displayName = "Spinner";
