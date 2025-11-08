import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";
import tinycolor from "tinycolor2";

import { type ColorName, useTheme } from "@/components/ThemeProvider";

import styles from "./avatar.module.scss";

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
  color?: ColorName;
  children?: React.ReactNode;
}

type AvatarComponent = FC<AvatarProps> & {
  Img: typeof AvatarImg;
};

const Avatar: AvatarComponent = (props: AvatarProps) => {
  const { size, color = "blue", children } = props;

  const theme = useTheme();

  const style = {
    "--avatar-size": size,
    "--avatar-color": theme.colors[color]["700"],
    "--avatar-background-color": tinycolor(theme.colors[color]["100"])
      .brighten(5)
      .desaturate(20)
      .toHexString(),
    "--avatar-border-color": tinycolor(theme.colors[color]["100"])
      .desaturate(20)
      .toHexString(),
  } as CSSProperties;

  return (
    <span className={styles.avatar} style={style}>
      {children}
    </span>
  );
};

Avatar.Img = AvatarImg;

Avatar.displayName = "Avatar";

export { Avatar };
