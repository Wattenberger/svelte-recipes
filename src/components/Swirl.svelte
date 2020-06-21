<script>
  import { line, curveBasis } from "d3-shape"
  import { tweened } from "./examples/tweened-staggered"

  let width = 10
  const aspectRatio = 0.2
  let height = width * aspectRatio
  const curveHeight = 0.6

  const createData = () => {
    const firstRow = new Array(width + 2)
      .fill(0)
      .map((_, i) => [i, i % 2 ? curveHeight : -curveHeight])
    return new Array(height / aspectRatio).fill(0).map((_, i) =>
      line()
        .x(d => d[0])
        .y(d => d[1] + i * aspectRatio)
        .curve(curveBasis)(firstRow),
    )
  }

  const lines = tweened(createData(), {
    duration: 2000,
  })
</script>

<svg viewBox="{[0, 0, width, height].join(' ')}">
  {#each $lines as d, i}
    <path {d}></path>
  {/each}
</svg>

<style>
  svg {
    width: 100%;
    overflow: visible;
  }
  @keyframes slide {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 2;
    }
  }
  path {
    fill: none;
    stroke: var(--text-accent);
    stroke: var(--background-dark);
    stroke-width: 0.1;
    stroke-dasharray: 0.9 0.1;
    /* pointer-events: visible; */
    /* stroke-linecap: round; */
    /* animation: slide 33s ease-out;
    animation-iteration-count: infinite; */
  }
  path:hover {
    stroke: var(--text-accent);
    /* stroke: #000; */
    animation: slide 33s ease-out;
  }
</style>
