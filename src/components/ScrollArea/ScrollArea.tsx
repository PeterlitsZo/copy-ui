import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import tinycolor from "tinycolor2";
import { createStore, type StoreApi, useStore } from "zustand";

import { useTheme } from "@/components/ThemeProvider";

import styles from "./ScrollArea.module.scss";

// ScrollAreaStore
// =============================================================================

type ScrollAreaStoreState = {
  contentHeight: number;
  viewportHeight: number;
  scrollTop: number;
};

type ScrollAreaStoreActions = {
  setContentHeight: (height: number) => void;
  setViewportHeight: (height: number) => void;
  setScrollTop: (scrollTop: number) => void;
};

type ScrollAreaStore = ScrollAreaStoreState & ScrollAreaStoreActions;

function buildScrollAreaStore() {
  return createStore<ScrollAreaStore>()((set) => ({
    contentHeight: 0,
    viewportHeight: 0,
    scrollTop: 0,

    setContentHeight: (height) => set(() => ({ contentHeight: height })),
    setViewportHeight: (height) => set(() => ({ viewportHeight: height })),
    setScrollTop: (scrollTop) => set(() => ({ scrollTop })),
  }));
}

// ScrollAreaContext
// =============================================================================

const ScrollAreaContext = createContext<StoreApi<ScrollAreaStore> | null>(null);

// ScrollArea.Viewport
// =============================================================================

type ScrollAreaViewportProps = ComponentProps<"div">;

const ScrollAreaViewport: FC<ScrollAreaViewportProps> = (props) => {
  const { children, className, ...rest } = props;

  const viewportRef = useRef<HTMLDivElement>(null);

  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("ScrollArea.Viewport must be used within a ScrollArea");
  }

  const setViewportHeight = useStore(
    context,
    (state) => state.setViewportHeight,
  );
  const setScrollTop = useStore(context, (state) => state.setScrollTop);
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Observe content height changes.
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize[0].blockSize;
        setViewportHeight(height);
      }
    });
    resizeObserver.observe(viewport);

    // Listen to scroll events.
    const handleScroll = () => {
      if (!viewport) return;
      setScrollTop(viewport.scrollTop);
    };
    viewport.addEventListener("scroll", handleScroll);

    return () => {
      resizeObserver.unobserve(viewport);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [setViewportHeight, setScrollTop]);

  const scrollTop = useStore(context, (state) => state.scrollTop);
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (Math.abs(viewport.scrollTop - scrollTop) > 1) {
      viewport.scrollTo({ top: scrollTop, behavior: "auto" });
    }
  }, [scrollTop]);

  return (
    <div
      ref={viewportRef}
      className={classNames(className, styles.scrollAreaViewport)}
      {...rest}
    >
      {children}
    </div>
  );
};

ScrollAreaViewport.displayName = "ScrollArea.Viewport";

// ScrollArea.Content
// =============================================================================

type ScrollAreaContentProps = ComponentProps<"div"> & {
  children: React.ReactNode;
};

const ScrollAreaContent: FC<ScrollAreaContentProps> = (props) => {
  const { children, ...rest } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("ScrollArea.Content must be used within a ScrollArea");
  }

  const setContentHeight = useStore(context, (state) => state.setContentHeight);
  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Observe content height changes.
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize[0].blockSize;
        setContentHeight(height);
      }
    });
    resizeObserver.observe(content);

    return () => {
      resizeObserver.unobserve(content);
    };
  }, [setContentHeight]);

  return (
    <div ref={contentRef} {...rest}>
      {children}
    </div>
  );
};

// ScrollArea.Scrollbar
// =============================================================================

type ScrollAreaScrollbarProps = ComponentProps<"div">;

const ScrollAreaScrollbar: FC<ScrollAreaScrollbarProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={classNames(styles.scrollAreaScrollbar, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

// ScrollArea.Thumb
// =============================================================================

type ScrollAreaThumbProps = ComponentProps<"div">;

const ScrollAreaThumb: FC<ScrollAreaThumbProps> = (props) => {
  const { className, ...rest } = props;

  const theme = useTheme();

  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("ScrollArea.Thumb must be used within a ScrollArea");
  }

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const startY = event.clientY;
      const startScrollTop = context.getState().scrollTop;
      const viewportHeight = context.getState().viewportHeight;
      const contentHeight = context.getState().contentHeight;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();

        const deltaY = moveEvent.clientY - startY;
        let newScrollTop =
          startScrollTop + (deltaY / viewportHeight) * contentHeight;
        newScrollTop = Math.max(
          0,
          Math.min(newScrollTop, contentHeight - viewportHeight),
        );

        context.getState().setScrollTop(newScrollTop);
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        upEvent.preventDefault();
        upEvent.stopPropagation();

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [context],
  );

  const contentHeight = useStore(context, (state) => state.contentHeight);
  const viewportHeight = useStore(context, (state) => state.viewportHeight);
  const scrollTop = useStore(context, (state) => state.scrollTop);

  if (contentHeight === 0 || viewportHeight === 0) {
    return null;
  }

  const thumbHeight = Math.max(
    (viewportHeight / contentHeight) * viewportHeight,
    20,
  );
  const thumbTop =
    (scrollTop / (contentHeight - viewportHeight)) *
    (viewportHeight - thumbHeight);

  if (contentHeight <= viewportHeight) {
    return null;
  }

  const thumbBgColor = tinycolor(theme.colors.gray[500]);
  thumbBgColor.setAlpha(0.5);
  const thumbHoverBgColor = tinycolor(theme.colors.gray[500]);
  thumbHoverBgColor.setAlpha(0.7);
  const computedStyle = {
    transform: `translateY(${thumbTop}px)`,

    "--scroll-area-thumb-height": `${thumbHeight}px`,
    "--scroll-area-thumb-bg-color": thumbBgColor.toString(),
    "--scroll-area-thumb-hover-bg-color": thumbHoverBgColor.toString(),
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: I think it's fine here.
    <div
      className={classNames(styles.scrollAreaThumb, className)}
      style={computedStyle}
      onMouseDown={handleMouseDown}
      {...rest}
    />
  );
};

// ScrollArea
// =============================================================================

type ScrollAreaProps = ComponentProps<"div"> & {
  children: React.ReactNode;
};

type ScrollAreaComponent = FC<ScrollAreaProps> & {
  Viewport: typeof ScrollAreaViewport;
  Content: typeof ScrollAreaContent;
  Scrollbar: typeof ScrollAreaScrollbar;
  Thumb: typeof ScrollAreaThumb;
};

const ScrollArea: ScrollAreaComponent = (props) => {
  const { children, className, ...rest } = props;

  const scrollAreaStore = useMemo(() => buildScrollAreaStore(), []);

  return (
    <ScrollAreaContext value={scrollAreaStore}>
      <div className={classNames(styles.scrollArea, className)} {...rest}>
        {children}
      </div>
    </ScrollAreaContext>
  );
};

ScrollArea.displayName = "ScrollArea";

ScrollArea.Viewport = ScrollAreaViewport;
ScrollArea.Content = ScrollAreaContent;
ScrollArea.Scrollbar = ScrollAreaScrollbar;
ScrollArea.Thumb = ScrollAreaThumb;

export { ScrollArea };
