import classNames from "classnames";
import { type ComponentProps, type FC, useRef } from "react";
import tinycolor from "tinycolor2";
import { type StoreApi, useStore } from "zustand";

import { type ColorName, useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./avatar.module.scss";
import { AvatarContext, useAvatarStore } from "./avatar-context";
import { AvatarFallback } from "./avatar-fallback";
import { AvatarImg } from "./avatar-img";
import { type AvatarStore, buildAvatarStore } from "./avatar-store";

type AvatarProps = ComponentProps<"span"> & {
  size: string;
  color?: ColorName;
};

type AvatarComponent = FC<AvatarProps> & {
  Img: typeof AvatarImg;
  Fallback: typeof AvatarFallback;
};

const Avatar: AvatarComponent = (props: AvatarProps) => {
  const avatarStore = useRef<StoreApi<AvatarStore> | null>(null);
  if (!avatarStore.current) {
    avatarStore.current = buildAvatarStore();
  }

  return (
    <AvatarContext value={avatarStore.current}>
      <AvatarInternal {...props} />
    </AvatarContext>
  );
};

Avatar.displayName = "Avatar";

Avatar.Img = AvatarImg;
Avatar.Fallback = AvatarFallback;

const AvatarInternal: FC<AvatarProps> = (props) => {
  const { size, color = "gray", children, ...rest } = props;

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
      {...rest}
    >
      {children}
    </span>
  );
};

export { Avatar };
