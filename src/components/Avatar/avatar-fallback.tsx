import type { ComponentProps, FC } from "react";
import { useStore } from "zustand";

import { useAvatarStore } from "./avatar-context";

type AvatarFallbackProps = ComponentProps<"span">;

const AvatarFallback: FC<AvatarFallbackProps> = (props) => {
  const avatarStore = useAvatarStore();

  const imgState = useStore(avatarStore, (state) => state.imgState);

  return imgState !== "loaded" && <span {...props} />;
};

AvatarFallback.displayName = "Avatar.Fallback";

export { AvatarFallback };
