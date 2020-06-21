<script>

</script>

<div class="c">
  <div class="tooltip">
    <slot />
  </div>
</div>

<style>
  .c {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .c:hover .tooltip {
    opacity: 1;
  }
  .tooltip {
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translate(-50%, -100%);
    background: white;
    padding: 0.3em 1em;
    color: var(--background);
    line-height: 1.2em;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    white-space: nowrap;
    font-weight: 500;
    z-index: 100;
    pointer-events: none;
    opacity: 0;
  }
</style>
