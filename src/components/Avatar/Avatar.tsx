import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";
import { useTheme } from "../ThemeProvider";
import styles from "./Avatar.module.scss";

// Avatar.Img
// =============================================================================

type AvatarImgProps = ComponentProps<"img">;

const AvatarImg: FC<AvatarImgProps> = (props) => {
  const { alt, className, ...rest } = props;

  return (
    <img
      className={classNames(styles.avatarImg, className)}
      alt={alt || "Avatar"}
      {...rest}
    />
  );
};

// Avatar
// =============================================================================

interface AvatarProps {
  size: string;
  color?: string;
  children?: React.ReactNode;
}

type AvatarComponent = FC<AvatarProps> & {
  Img: typeof AvatarImg;
};

const Avatar: AvatarComponent = (props) => {
  const { size, color = "blue", children } = props;

  const theme = useTheme();

  const style = {
    "--avatar-size": size,
    "--avatar-color": theme.colors[color]["700"],
    "--avatar-background-color": theme.colors[color]["100"],
  } as CSSProperties;

  return (
    <span className={styles.avatar} style={style}>
      {children}
    </span>
  );
};

Avatar.displayName = "Avatar";
Avatar.Img = AvatarImg;

export { Avatar };
