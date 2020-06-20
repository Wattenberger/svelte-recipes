<script>
  import { tweened } from "svelte/motion";
  import move from "./move";

  let left = tweened(0);
</script>

<svg viewBox="-1 0 12 2">
  <circle style="{move($left, 1)}" r="0.5"></circle>
</svg>

<div class="note">Click to update</div>
<svelte:window on:click="{() => left.set(Math.random() * 10)}" />

<style>
  svg {
    width: 100%;
  }
  circle {
    fill: white;
  }
  .note {
    position: absolute;
    top: 0;
    font-style: italic;
  }
</style>
