import classNames from "classnames";
import type { CSSProperties, FC } from "react";
import styles from "./background-container.module.scss";

type BackgroundContainerProps = {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

const BackgroundContainer: FC<BackgroundContainerProps> = (props) => {
  const { className, style, children } = props;

  return (
    <div
      className={classNames(styles.backgroundContainer, className)}
      style={style}
    >
      {children}
    </div>
  );
};

BackgroundContainer.displayName = "Background.Container";

export { BackgroundContainer };
