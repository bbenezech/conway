export const createGrid = (size: number, density: number = 0.5): boolean[][] =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random() < density));

export function simulate(grid: boolean[][]) {
  let gridChanged = false;

  const newGrid = grid.map((row, i) => {
    let rowChanged = false;
    const newRow = row.map((_col, j) => {
      let neighbors = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;
          const newI = (i + x + grid.length) % grid.length;
          const newJ = (j + y + row.length) % row.length;
          if (grid[newI]?.[newJ]) neighbors++;
        }
      }
      if (neighbors < 2 || neighbors > 3) {
        rowChanged ||= grid[i][j];
        return false;
      }
      if (neighbors === 3) {
        rowChanged ||= !grid[i][j];
        return true;
      }
      return grid[i][j];
    });
    gridChanged ||= rowChanged;
    return rowChanged ? newRow : row;
  });

  return gridChanged ? newGrid : grid;
}
