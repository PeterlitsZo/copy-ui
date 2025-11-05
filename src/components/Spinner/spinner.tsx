import classNames from "classnames";
import { Loader2Icon } from "lucide-react";
import type { FC } from "react";
import { useJss } from "../CopyUiProvider";
import styles from "./spinner.module.scss";

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: string;
};

const Spinner: FC<SpinnerProps> = (props) => {
  const { className, size, ...rest } = props;

  const jss = useJss();

  const sizeStx =
    size &&
    jss.hash({
      width: size,
      height: size,
    });

  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={classNames(styles.spinner, sizeStx, className)}
      {...rest}
    />
  );
};

Spinner.displayName = "Spinner";

export { Spinner };
