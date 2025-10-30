import { createStore } from "zustand";

type ScrollAreaStoreState = {
  variant: "default" | "absolute";
  hover: boolean;
  thumbDragging: boolean;
  contentHeight: number;
  viewportHeight: number;
  scrollTop: number;
};

type ScrollAreaStoreActions = {
  setVariant: (variant: "default" | "absolute") => void;
  setHover: (hover: boolean) => void;
  setThumbDragging: (dragging: boolean) => void;
  setContentHeight: (height: number) => void;
  setViewportHeight: (height: number) => void;
  setScrollTop: (scrollTop: number) => void;
};

type ScrollAreaStore = ScrollAreaStoreState & ScrollAreaStoreActions;

function buildScrollAreaStore() {
  return createStore<ScrollAreaStore>()((set) => ({
    variant: "default",
    hover: false,
    thumbDragging: false,
    contentHeight: 0,
    viewportHeight: 0,
    scrollTop: 0,

    setVariant: (variant) => set(() => ({ variant })),
    setHover: (hover) => set(() => ({ hover })),
    setThumbDragging: (dragging) => set(() => ({ thumbDragging: dragging })),
    setContentHeight: (height) => set(() => ({ contentHeight: height })),
    setViewportHeight: (height) => set(() => ({ viewportHeight: height })),
    setScrollTop: (scrollTop) => set(() => ({ scrollTop })),
  }));
}

export type { ScrollAreaStore };
export { buildScrollAreaStore };
