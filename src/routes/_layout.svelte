<script>

</script>

<main>
  <slot />
</main>

<footer>
  Made with 💗 by
  <a href="http://wattenberger.com" target="_blank" rel="noopener noreferrer">
    Amelia Wattenberger
  </a>
</footer>

<style>
  main {
    position: relative;
    padding: 5em 3em 5em;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: calc(100vh - 5em);
  }
  footer {
    padding: 2em 3em;

    background: var(--background-dark);
    /* color: var(--background); */
  }

  @media (max-width: 700px) {
    main {
      padding-left: 2em;
      padding-right: 2em;
    }
    footer {
      padding-left: 2em;
      padding-right: 2em;
    }
  }
  @media (max-width: 500px) {
    main {
      padding-left: 1em;
      padding-right: 1em;
    }
    footer {
      padding-left: 1em;
      padding-right: 1em;
    }
  }
</style>
