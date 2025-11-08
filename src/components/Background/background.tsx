import classNames from "classnames";
import { type CSSProperties, type FC, useLayoutEffect, useRef } from "react";

import styles from "./background.module.scss";
import { BackgroundContainer } from "./background-container";
import { drawChessboard, drawDots, drawLines } from "./draw";

type BackgroundProps = {
  className?: string;
  style?: CSSProperties;
  kind: "dots" | "lines" | "chessboard";
};

type BackgroundComponent = FC<BackgroundProps> & {
  Container: typeof BackgroundContainer;
};

const Background: BackgroundComponent = (props: BackgroundProps) => {
  const { className, style, kind } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrapper.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      drawBackground();
    };
    const drawBackground = () => {
      if (!ctx) return;
      const rect = wrapper.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (kind === "lines") {
        drawLines(ctx, width, height, { lineColor: `rgba(0, 0, 0, 0.05)` });
      } else if (kind === "dots") {
        drawDots(ctx, width, height, { dotColor: `rgba(0, 0, 0, 0.15)` });
      } else if (kind === "chessboard") {
        drawChessboard(ctx, width, height, {
          chessboardColor: `rgba(0, 0, 0, 0.02)`,
        });
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
    };
  }, [kind]);

  return (
    <div
      className={classNames(styles.backgroundWrapper, className)}
      style={style}
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

Background.displayName = "Background";

Background.Container = BackgroundContainer;

export { Background };
