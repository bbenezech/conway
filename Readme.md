# Conway's Game of Life in React & TypeScript

## Basic implementation of all features

### Focus

- Engaging UX, easy with Tailwind and LLMs.
- Simplicity and reactivity of React state. Buttons/Interactions should be enabled/disabled at the right time, React state should be completely normalized (no state duplication/cross-coupling) and allow code to adhere to React usual patterns.
- Naive best performance. Use React forget. Use immutability to allow for cycle detection later. We'll check memory pressure and impact on performance on next phase.
- Compactness. No premature extraction of UI components. Single file. Single sanity test. Use LLM for what they are best at (Tailwind classNames, GOL algorythm, util code) and rework everything else to be as humanly digestible as possible.

### Result

Looks good, fast and usable, speed toggling is fun.

### Budget

2 hours of grunt work, lunch time.

## Make sure it is correct

### Focus

- Ensure correctness of the results, but extracting the complicated core logic to a new grid.ts file, isolate it in a pure function easy to test for correctness and make the React module easier to process.
- Use immutability to be able to use identity to check for changes
- Stop the simulation when it stales (identity check)

### Budget

1/2 an hour

## Make it fast

### Focus

- Ensure performance is easily checkable when making changes to the core algorithm
- Check flame graph for performance issues in React
- Ensure we attain the target calculation per second
- Ensure all UX interactions are all snappy and pleasant

### Budget

1 hour
