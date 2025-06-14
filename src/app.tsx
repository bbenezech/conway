import React from "react";
import clsx from "clsx";
import { loadJSONFile, saveJSONFile } from "./lib/file";
import { createGrid, simulate } from "./lib/grid";

const DEFAULT_DENSITY = 0.3;
const DEFAULT_SIZE = 10;
const DEFAULT_FPS = 10;

const controlTextStyle = "text-sm font-semibold text-white";

const Button = ({
  children,
  className,
  active,
  disabled,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      "rounded-md px-4 py-2",
      {
        "bg-orange-700 hover:bg-orange-600 active:bg-orange-800 cursor-pointer": active === true,
        "bg-green-700 hover:bg-green-600 active:bg-green-800 cursor-pointer": active === false,
        "bg-slate-700 hover:bg-slate-600 active:bg-slate-800 cursor-pointer": active === undefined && !disabled,
        "bg-slate-500 cursor-not-allowed": disabled,
      },
      controlTextStyle,
      className,
    )}
  >
    {children}
  </button>
);

const Slider = ({
  children,
  className,
  ...props
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <label className={clsx("flex flex-col gap-1", controlTextStyle, className)}>
    {children}
    <input type="range" {...props} className="w-24" />
  </label>
);

export const App = () => {
  const [density, setDensity] = React.useState(DEFAULT_DENSITY);
  const [fps, setFPS] = React.useState(DEFAULT_FPS);
  const [size, setSize] = React.useState(DEFAULT_SIZE);
  const [grid, setGrid] = React.useState(() => createGrid(size, 0));
  const [running, setRunning] = React.useState(false);
  const loopRef = React.useRef<number>(null);

  React.useEffect(() => {
    setGrid(createGrid(size, density));
  }, [size, density]);

  const loopSimulation = React.useCallback(() => {
    setGrid((grid) => {
      const newGrid = simulate(grid);
      if (newGrid === grid) setRunning(false);
      return newGrid;
    });
    loopRef.current = window.setTimeout(loopSimulation, 1000 / fps);
  }, [fps]);

  React.useEffect(() => {
    if (running) loopRef.current = window.setTimeout(loopSimulation);
    return () => {
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [running, loopSimulation]);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-900 p-4 font-sans text-white">
      <h1 className="text-4xl font-bold">Conway's Game of Life</h1>
      <div className="flex gap-3">
        <Button active={running} onClick={() => setRunning((running) => !running)}>
          {running ? "Pause" : "Start"}
        </Button>
        <Button disabled={running} onClick={() => setDensity(Math.random())}>
          Random
        </Button>
        <Button disabled={running} onClick={() => setDensity(0)}>
          Clear
        </Button>
        <Button disabled={running} onClick={() => saveJSONFile(grid, `grid-${size}x${size}x${density}.json`)}>
          Save Grid
        </Button>
        <Button
          disabled={running}
          onClick={() =>
            loadJSONFile((data) => {
              if (Array.isArray(data) && data.every((row) => Array.isArray(row))) {
                setSize(data.length);
                setGrid(data);
              } else {
                alert("Invalid grid format. Please ensure the file is a valid grid.");
              }
            })
          }
        >
          Load Grid
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-lg bg-slate-800 p-4">
        <Slider min={3} max={100} value={size} onChange={(e) => setSize(Number(e.target.value))} disabled={running}>
          Size: {size}
        </Slider>
        <Slider min={1} max={100} value={fps} onChange={(e) => setFPS(Number(e.target.value))}>
          Iterations per second: {fps}
        </Slider>
      </div>

      <div className="grid border border-slate-600" style={{ gridTemplateColumns: `repeat(${size}, 15px)` }}>
        {grid.map((row, i) =>
          row.map((_, j) => (
            <div
              key={`${i}-${j}`}
              onClick={
                running
                  ? undefined
                  : () =>
                      setGrid((grid) =>
                        grid.map((row, rowIndex) =>
                          rowIndex === i ? row.map((cell, colIndex) => (colIndex === j ? !cell : cell)) : row,
                        ),
                      )
              }
              className={clsx("h-[15px] w-[15px] border border-slate-800", {
                "bg-cyan-400": grid[i][j],
                "cursor-not-allowed": running,
                "cursor-pointer": !running,
              })}
            />
          )),
        )}
      </div>
    </div>
  );
};
