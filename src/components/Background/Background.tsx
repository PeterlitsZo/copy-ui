import classNames from "classnames";
import { type FC, useLayoutEffect, useRef } from "react";

import styles from "./Background.module.scss";

interface BackgroundProps {
  className?: string;
  kind: "dots" | "lines";
}

export const Background: FC<BackgroundProps> = ({ className, kind }) => {
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
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x + 20, 0);
          ctx.lineTo(x + 20, height);
          ctx.strokeStyle = `rgba(0, 0, 0, 0.05)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y + 20);
          ctx.lineTo(width, y + 20);
          ctx.strokeStyle = `rgba(0, 0, 0, 0.05)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else if (kind === "dots") {
        for (let x = 0; x < width; x += 14) {
          for (let y = 0; y < height; y += 14) {
            ctx.beginPath();
            ctx.arc(x + 7, y + 7, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;
            ctx.fill();
          }
        }
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
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

Background.displayName = "Background";
