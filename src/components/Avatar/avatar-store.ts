import { createStore } from "zustand";

type ImgState = "idle" | "loaded" | "loading" | "error";

type AvatarStoreState = {
  imgState: ImgState;
};

type AvatarStoreActions = {
  setImgState: (imgState: ImgState) => void;
};

type AvatarStore = AvatarStoreState & AvatarStoreActions;

function buildAvatarStore() {
  return createStore<AvatarStore>()((set) => ({
    imgState: "idle",
    setImgState: (imgState) => set(() => ({ imgState })),
  }));
}

export { type ImgState, type AvatarStore, buildAvatarStore };
