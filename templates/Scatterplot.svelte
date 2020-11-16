<script>
  import { spring } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { extent, interpolateHcl, scaleSqrt, scaleLinear } from "d3";

  // utility function for translating elements
  const move = (x, y) => `transform: translate(${x}px, ${y}px`;

  export let data = [];
  // accessor functions to quickly pivot between data structures
  export let xAccessor = d => d[0];
  export let yAccessor = d => d[1];
  export let rAccessor = d => d[2];
  export let margins = {
    // typical d3 margin convention
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };

  let width = 1200;
  $: height = width;
  $: mainWidth = width - margins.right - margins.left;
  $: mainHeight = height - margins.top - margins.bottom;

  // the biggest constraint here:
  // the number of dots has to remain static
  // one workaround is to have a very long array,
  // and give extra nodes no radius (r=0)
  let dots = spring(
    data.map((d, i) => ({
      x: 0,
      y: 0,
      r: 0
    })),
    {
      stiffness: 0.1,
      damping: 0.9
    }
  );

  // make me some scales!
  $: xScale = scaleLinear()
    .domain(extent(data, xAccessor))
    .range([0, mainWidth]);
  $: yScale = scaleLinear()
    .domain(extent(data, yAccessor))
    .range([mainHeight, 0]);
  $: rScale = scaleSqrt()
    .domain(extent(data, rAccessor))
    .range([0, 20]);
  const colorScale = scaleLinear()
    .domain([0, 20])
    .range(["tomato", "cornflowerblue"])
    .interpolate(interpolateHcl);

  // update $dots' x, y, and r attributes
  // `spring` will handle the animation/interpolation
  const updateData = () => {
    const newDots = data.map((d, i) => ({
      x: xScale(xAccessor(d)),
      y: yScale(yAccessor(d)),
      r: rScale(rAccessor(d))
    }));
    dots.set(newDots);
  };

  $: data, mainWidth, updateData();
</script>

<figure class="c" bind:clientWidth={width}>
  <svg {width} {height}>
    <g style={move(margins.top, margins.left)}>
      {#each $dots as { x, y, r }}
        <circle style={move(x, y)} r={Math.max(0, r)} fill={colorScale(r)} />
      {/each}
    </g>
  </svg>
</figure>
