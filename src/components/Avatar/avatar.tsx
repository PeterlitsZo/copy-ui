import classNames from "classnames";
import type { FC } from "react";
import tinycolor from "tinycolor2";
import { useStore } from "zustand";

import { type ColorName, useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./avatar.module.scss";
import { AvatarContext, useAvatarStore } from "./avatar-context";
import { AvatarFallback } from "./avatar-fallback";
import { AvatarImg } from "./avatar-img";
import { buildAvatarStore } from "./avatar-store";

interface AvatarProps {
  size: string;
  color?: ColorName;
  children?: React.ReactNode;
}

type AvatarComponent = FC<AvatarProps> & {
  Img: typeof AvatarImg;
  Fallback: typeof AvatarFallback;
};

const Avatar: AvatarComponent = (props: AvatarProps) => {
  const avatarStore = buildAvatarStore();

  return (
    <AvatarContext value={avatarStore}>
      <AvatarInternal {...props} />
    </AvatarContext>
  );
};

Avatar.displayName = "Avatar";

Avatar.Img = AvatarImg;
Avatar.Fallback = AvatarFallback;

const AvatarInternal: FC<AvatarProps> = (props) => {
  const { size, color = "gray", children } = props;

  const theme = useTheme();
  const jss = useJss();

  const avatarStore = useAvatarStore();
  const imgState = useStore(avatarStore, (state) => state.imgState);

  const stx = jss.hash({
    "--avatar-size": size,
    "--avatar-color": theme.colors[color]["700"],
    "--avatar-background-color": tinycolor(theme.colors[color]["100"])
      .brighten(5)
      .desaturate(20)
      .toHexString(),
    "--avatar-border-color": tinycolor(theme.colors[color]["100"])
      .desaturate(20)
      .toHexString(),
  });

  return (
    <span
      className={classNames(styles.avatar, stx)}
      data-avatar-img-loaded={imgState === "loaded" ? true : undefined}
    >
      {children}
    </span>
  );
};

export { Avatar };
