import classNames from "classnames";
import { type ComponentProps, type FC, useLayoutEffect, useRef } from "react";
import { useStore } from "zustand";

import { useAvatarStore } from "./avatar-context";
import styles from "./avatar-img.module.scss";

function useImgState(src: string | undefined) {
  const avatarStore = useAvatarStore();
  const imgRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    if (src == null) {
      return;
    }

    imgRef.current = new Image();
    imgRef.current.src = src;

    avatarStore.getState().setImgState("loading");

    const handleLoad = () => {
      avatarStore.getState().setImgState("loaded");
    };

    const handleError = () => {
      avatarStore.getState().setImgState("error");
    };

    imgRef.current.addEventListener("load", handleLoad);
    imgRef.current.addEventListener("error", handleError);

    return () => {
      imgRef.current?.removeEventListener("load", handleLoad);
      imgRef.current?.removeEventListener("error", handleError);
    };
  }, [src, avatarStore]);

  return useStore(avatarStore, (state) => state.imgState);
}

type AvatarImgProps = ComponentProps<"img">;

const AvatarImg: FC<AvatarImgProps> = (props) => {
  const { alt, className, src, ...rest } = props;

  const imgState = useImgState(src);

  return (
    imgState === "loaded" && (
      <img
        className={classNames(styles.avatarImg, className)}
        alt={alt || "Avatar"}
        src={src}
        {...rest}
      />
    )
  );
};

AvatarImg.displayName = "Avatar.Img";

export { AvatarImg };
