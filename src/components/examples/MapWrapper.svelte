<script>
  import countryShapes from "./country-shapes.js"

  import Map from "./Map.svelte"

  const createData = () => {
    return countryShapes.map(d => [
      d.properties.geounit,
      Math.random(),
      Math.random(),
    ])
  }
  let data = createData()
</script>

<div class="wrapper">
  <Map
    {data}
    nameAccessor="{d => d[0]}"
    colorAccessor="{d => d[1]}"
    rAccessor="{d => d[2]}" />
</div>
<div class="note">Click to update bubble sizes</div>
<svelte:window
  on:click="{() => (data = createData())}"
  on:touchend="{() => (data = createData())}" />

<style>
  .wrapper {
    background: #f8f8f8;
    margin: -1em;
    padding: 1em;
  }
  .note {
    position: absolute;
    top: 0;
    font-style: italic;
    color: var(--text-light);
  }
</style>
