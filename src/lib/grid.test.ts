import { simulate } from "./grid";

const T = true;
const F = false;

describe("simulate", () => {
  describe("Game Rules", () => {
    it("underpopulation: a live cell with < 2 neighbors dies", () => {
      const grid = [
        [F, F, F],
        [F, T, F],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid[1][1]).toBe(F);
    });

    it("survival: a live cell with 2 or 3 neighbors lives", () => {
      const grid = [
        [T, T, F],
        [T, T, F],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid[0][0]).toBe(T);
      expect(nextGrid[0][1]).toBe(T);
      expect(nextGrid[1][0]).toBe(T);
      expect(nextGrid[1][1]).toBe(T);
    });

    it("overpopulation: a live cell with > 3 neighbors dies", () => {
      const grid = [
        [T, T, T],
        [T, T, T],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid[0][1]).toBe(F);
      expect(nextGrid[1][1]).toBe(F);
    });

    it("reproduction: a dead cell with 3 neighbors becomes alive", () => {
      const grid = [
        [T, T, F],
        [T, F, F],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid[1][1]).toBe(T);
    });
  });

  describe("Classic Patterns", () => {
    it("a 2x2 block should be a still life", () => {
      const grid = [
        [T, T, F],
        [T, T, F],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid).toEqual(grid);
    });

    it("a line of 3 in a toroidal 3 by 3 square should fill in full", () => {
      const line = [
        [F, F, F],
        [T, T, T],
        [F, F, F],
      ];

      const full = [
        [T, T, T],
        [T, T, T],
        [T, T, T],
      ];
      const step1 = simulate(line);
      expect(step1).toEqual(full);
    });

    it("a line of 3 in a bigger grid should oscillate like a blinker", () => {
      const F = false,
        T = true;

      const horizontal = [
        [F, F, F, F, F],
        [F, F, F, F, F],
        [F, T, T, T, F],
        [F, F, F, F, F],
        [F, F, F, F, F],
      ];

      const vertical = [
        [F, F, F, F, F],
        [F, F, T, F, F],
        [F, F, T, F, F],
        [F, F, T, F, F],
        [F, F, F, F, F],
      ];

      const step1 = simulate(horizontal);
      expect(step1).toEqual(vertical);

      const step2 = simulate(step1);
      expect(step2).toEqual(horizontal);
    });
  });

  describe("Edge Cases", () => {
    it("should handle an empty grid", () => {
      const grid: boolean[][] = [];
      expect(simulate(grid)).toEqual([]);
    });

    it("should handle a grid with an empty row", () => {
      const grid: boolean[][] = [[]];
      expect(simulate(grid)).toEqual([[]]);
    });

    it("should handle toroidal wrap-around correctly", () => {
      const grid = [
        [T, F, T],
        [F, F, F],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid[0][1]).toBe(F);
      expect(nextGrid[1][1]).toBe(F);
    });
  });

  describe("Performance Optimizations", () => {
    it("should return the original grid object for a stable pattern", () => {
      const grid = [
        [F, F, F, F],
        [F, T, T, F],
        [F, T, T, F],
        [F, F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid).toBe(grid);
    });

    it("should return a new grid object for a changing pattern", () => {
      const grid = [
        [T, T, T],
        [F, F, F],
        [F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid).not.toBe(grid);
    });

    it("should return original row arrays for unchanged rows", () => {
      const grid = [
        [F, F, F, F],
        [F, T, T, T],
        [F, F, F, F],
        [F, F, F, F],
      ];
      const nextGrid = simulate(grid);
      expect(nextGrid).not.toBe(grid);
      expect(nextGrid[3]).toBe(grid[3]);
    });
  });
});
