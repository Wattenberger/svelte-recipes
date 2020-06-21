<script>
  import SimplexNoise from "simplex-noise";

  import Scatterplot from "./Scatterplot.svelte";

  const simplex = new SimplexNoise(0);

  let iteration = 3;
  const createData = () => {
    iteration = iteration + 1;
    return new Array(300)
      .fill(0)
      .map((_, i) => [i, i % iteration, simplex.noise2D(i, i % iteration)]);
  };
  let data = createData();
</script>

<Scatterplot {data} />

<div class="note">Click to update</div>
<svelte:window on:click="{() => (data = createData())}" />

<style>
  .note {
    position: absolute;
    top: 0;
    font-style: italic;
    color: var(--text-light);
  }
</style>
