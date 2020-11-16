<script>

</script>

<main>
  <slot />
</main>

<style>
  main {
    padding: 1em 3em;
    --accent-color: #5758bb;
    --gray: #95afc0;
  }
  main :global(a) {
    color: var(--accent-color);
  }
</style>
