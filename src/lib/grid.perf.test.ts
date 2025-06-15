import { createGrid, simulate } from "./grid";

describe("Performance and Memory Monitoring", () => {
  it("benchmarks the simulate function on a large grid", () => {
    const GRID_SIZE = 100;
    const ITERATIONS = 100;
    let grid = createGrid(GRID_SIZE);

    const startMemory = process.memoryUsage().heapUsed;
    const startTime = performance.now();

    for (let i = 0; i < ITERATIONS; i++) {
      grid = simulate(grid);
    }

    const endTime = performance.now();
    const endMemory = process.memoryUsage().heapUsed;

    const totalTime = endTime - startTime;
    const avgTime = totalTime / ITERATIONS;
    const memoryDiff = (endMemory - startMemory) / 1024 / 1024;

    console.log(`\n--- Simulation Performance ---`);
    console.log(`Grid Size:       ${GRID_SIZE}x${GRID_SIZE}`);
    console.log(`Iterations:      ${ITERATIONS}`);
    console.log(`Total Time:      ${totalTime.toFixed(2)} ms`);
    console.log(`Avg Time/Step:   ${avgTime.toFixed(2)} ms`);
    console.log(`Heap Usage Δ:    ${memoryDiff.toFixed(4)} MB`);
    console.log(`------------------------------`);

    expect(avgTime).toBeLessThan(1);
  });
});
