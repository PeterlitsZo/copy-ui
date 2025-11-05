function drawLines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opts: {
    lineColor: string;
  },
) {
  ctx.strokeStyle = opts.lineColor;
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x + 20, 0);
    ctx.lineTo(x + 20, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y + 20);
    ctx.lineTo(width, y + 20);
    ctx.stroke();
  }
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opts: {
    dotColor: string;
  },
) {
  ctx.fillStyle = opts.dotColor;
  for (let x = 0; x < width; x += 14) {
    for (let y = 0; y < height; y += 14) {
      ctx.beginPath();
      ctx.arc(x + 7, y + 7, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawChessboard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opts: {
    chessboardColor: string;
  },
) {
  const { chessboardColor } = opts;
  const squareSize = 20;

  ctx.fillStyle = chessboardColor;
  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      const isEvenSquare = (x / squareSize + y / squareSize) % 2 === 0;
      if (!isEvenSquare) continue;
      ctx.fillRect(x, y, squareSize, squareSize);
    }
  }
}

export { drawLines, drawDots, drawChessboard };
