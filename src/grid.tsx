import clsx from "clsx";
import React from "react";

const MemoColumn = React.memo(Column);

export function Grid({
  grid,
  onCellClick,
  running,
}: {
  grid: boolean[][];
  onCellClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  running: boolean;
}) {
  const minSize = Math.min(window.innerWidth, window.innerHeight);
  const cellSize = Math.floor((minSize * 0.7) / grid.length);
  const style = React.useMemo(
    () => ({ gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)`, "--cell-size": `${cellSize}px` }),
    [grid.length, cellSize],
  );

  return (
    <div className={clsx("grid border border-slate-600", { running })} style={style}>
      {grid.map((column, i) => (
        <MemoColumn key={i} onCellClick={onCellClick} column={column} i={i} />
      ))}
    </div>
  );
}

function Column({
  column,
  i,
  onCellClick,
}: {
  column: boolean[];
  i: number;
  onCellClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <React.Fragment key={i}>
      {column.map((alive, j) => (
        <div key={j} data-col={i} data-row={j} data-alive={alive} onClick={onCellClick} />
      ))}
    </React.Fragment>
  );
}
