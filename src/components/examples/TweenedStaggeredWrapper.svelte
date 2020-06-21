<script>
  import { scaleLinear } from "d3-scale"
  import { interpolateHcl } from "d3-interpolate"
  import SimplexNoise from "simplex-noise"

  import { tweened } from "./tweened-staggered"
  import move from "./move"

  const simplex = new SimplexNoise(0)

  const height = 8
  const width = 10

  const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#C3B6DF", "#0B2830"])
    .interpolate(interpolateHcl)

  let iteration = 3
  const createData = () => {
    iteration = iteration + 1
    return new Array(150).fill(0).map((_, i) => {
      const x = (i * 10) / 150
      const y = Math.random() * height
      const r = Math.max(0, simplex.noise2D(x, y))
      return {
        x: x - r,
        y: y - r,
        r,
        color: colorScale(Math.random()),
      }
    })
  }

  let dots = tweened(createData(), {
    duration: 2000,
    iDelay: 6,
  })
</script>

<svg viewBox="{[-1, -1, width + 2, height + 2].join(' ')}">
  {#each $dots as { x, y, r, color }}
    <rect
      style="{move(x, y)}"
      width="{r * 2}"
      height="{r * 2}"
      fill="{color}"></rect>
  {/each}
</svg>

<div class="note">Click to update</div>
<svelte:window
  on:click="{() => dots.set(createData())}"
  on:touchend="{() => dots.set(createData())}" />

<style>
  svg {
    width: 100%;
  }
  rect {
    mix-blend-mode: multiply;
  }
  .note {
    position: absolute;
    top: 0;
    font-style: italic;
    color: var(--text-light);
  }
</style>
