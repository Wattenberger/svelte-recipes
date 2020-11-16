<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`components.json`)
      .then(r => r.json())
      .then(components => {
        return { components };
      });
  }
</script>

<script>
  export let components;
</script>

<svelte:head>
  <title>Components</title>
</svelte:head>

<h1>Recent components</h1>

<ul>
  {#each components as component}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a rel="prefetch" href="components/{component.id}">{component.name}</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>
