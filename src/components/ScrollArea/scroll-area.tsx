import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import tinycolor from "tinycolor2";
import { type StoreApi, useStore } from "zustand";

import { useTheme } from "@/components/ThemeProvider";

import styles from "./scroll-area.module.scss";
import {
  buildScrollAreaStore,
  type ScrollAreaStore,
} from "./scroll-area-store";

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
  const scrollTop = useStore(context, (state) => state.scrollTop);
  const variant = useStore(context, (state) => state.variant);

  // Handle scroll and resize events.
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

  // Sync scrollTop state with actual scroll position.
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
      data-variant={variant}
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
  const { children, className, style, ...rest } = props;

  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("ScrollArea.Scrollbar must be used within a ScrollArea");
  }

  const hover = useStore(context, (state) => state.hover);
  const thumbDragging = useStore(context, (state) => state.thumbDragging);
  const show = hover || thumbDragging;

  const computedStyle = {
    ...(style || {}),
    visibility: show ? "visible" : "hidden",
  } as CSSProperties;

  return (
    <div
      className={classNames(styles.scrollAreaScrollbar, className)}
      style={computedStyle}
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

  const setThumbDragging = useStore(context, (state) => state.setThumbDragging);
  const setScrollTop = useStore(context, (state) => state.setScrollTop);
  const contentHeight = useStore(context, (state) => state.contentHeight);
  const viewportHeight = useStore(context, (state) => state.viewportHeight);
  const scrollTop = useStore(context, (state) => state.scrollTop);
  const thumbDragging = useStore(context, (state) => state.thumbDragging);

  const [hover, setHover] = useState(false);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const startY = event.clientY;
      const startScrollTop = scrollTop;

      setThumbDragging(true);

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

        setScrollTop(newScrollTop);
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        upEvent.preventDefault();
        upEvent.stopPropagation();

        setThumbDragging(false);

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [scrollTop, viewportHeight, contentHeight, setScrollTop, setThumbDragging],
  );

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

  const alpha = hover || thumbDragging ? 0.5 : 0.3;
  const thumbBgColor = tinycolor(theme.colors.gray[500]).setAlpha(alpha);
  const computedStyle = {
    transform: `translateY(${thumbTop}px)`,

    "--scroll-area-thumb-height": `${thumbHeight}px`,
    "--scroll-area-thumb-bg-color": thumbBgColor.toString(),
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: I think it's fine here.
    <div
      className={classNames(styles.scrollAreaThumb, className)}
      style={computedStyle}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    />
  );
};

// ScrollArea
// =============================================================================

type ScrollAreaProps = ComponentProps<"div"> & {
  variant?: "default" | "absolute";
  children: React.ReactNode;
};

type ScrollAreaComponent = FC<ScrollAreaProps> & {
  Viewport: typeof ScrollAreaViewport;
  Content: typeof ScrollAreaContent;
  Scrollbar: typeof ScrollAreaScrollbar;
  Thumb: typeof ScrollAreaThumb;
};

const ScrollArea: ScrollAreaComponent = (props: ScrollAreaProps) => {
  const { variant = "default", children, className, ...rest } = props;

  const scrollAreaStoreRef = useRef<StoreApi<ScrollAreaStore> | null>(null);
  if (scrollAreaStoreRef.current === null) {
    scrollAreaStoreRef.current = buildScrollAreaStore();
  }

  useEffect(() => {
    const store = scrollAreaStoreRef.current;
    if (store) {
      store.getState().setVariant(variant);
    }
  }, [variant]);

  const setHover = useStore(
    scrollAreaStoreRef.current,
    (state) => state.setHover,
  );

  return (
    <ScrollAreaContext value={scrollAreaStoreRef.current}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: I think it's fine here. */}
      <div
        className={classNames(styles.scrollArea, className)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...rest}
      >
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
