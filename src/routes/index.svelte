<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`components.json`)
      .then(r => r.json())
      .then(components => {
        return { components }
      })
  }
</script>

<script>
  export let components
  import Swirl from "./../components/Swirl.svelte"
  import References from "./../components/References.svelte"
</script>

<svelte:head>
  <title>Svelte Recipes 👩‍🍳</title>
</svelte:head>

<main>
  <h1>Code snippets</h1>
  <p>
    I find myself following a few
    <strong>recipes</strong>
    when creating new Svelte components.
  </p>
  <p>
    You'll find that most of this code is focused on visualizing data, just due
    to what I'm typically building.
  </p>

  <section>
    <div class="left">
      <h3>Recipes</h3>
      <p>
        Instead of creating a chart library, I prefer to curate
        <strong>recipes</strong>
        , which keeps things super flexible.
      </p>
    </div>
    <div class="right">
      <ul>
        {#each components.filter(d => d['type'] == 'component') as component}
          <li>
            <a class="item" rel="prefetch" href="components/{component.id}">
              <div class="name">{component.name}</div>
              <div class="description">
                {@html component.description}
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section>
    <div class="left">
      <h3>Useful functions</h3>
      <p>
        I'll usually have a
        <strong>utils.js</strong>
        file that I throw custom methods into for easy use. Here are some of
        those methods.
      </p>
    </div>
    <div class="right">
      <ul>
        {#each components.filter(d => d['type'] == 'function') as component}
          <li>
            <a class="item" rel="prefetch" href="components/{component.id}">
              <div class="name">{component.name}</div>
              <div class="description">
                {@html component.description}
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</main>
<div class="more">
  <References />
</div>
<div class="swirl-container">
  <div class="swirl">
    <Swirl />
  </div>
</div>

<style>
  /* h2 {
    font-weight: 800;
    font-size: 2.2em;
  } */
  main {
    /* position: relative; */
  }
  p,
  li,
  h1,
  h3 {
    position: relative;
    z-index: 10;
  }
  ul {
    margin: 0 -0.6em;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
  }
  li {
    margin: 0;
  }
  section {
    display: flex;
    margin: 5em 0 9em;
  }
  .left {
    flex: 1;
    padding-right: 3em;
  }
  .right {
    flex: 2;
  }
  .item {
    display: block;
    margin: 0.6em;
    padding: 0.6em 1.6em;
    /* background: var(--text-accent);
    background: var(--background-dark); */
    font-weight: 800;
    /* color: var(--background-dark); */
    color: white;
    background: var(--background);
    text-decoration: none;
    max-width: 20em;
    border: 1px solid var(--background-dark);
    border-radius: 3px;
  }
  .item:focus,
  .item:hover,
  .item:active {
    border-color: var(--background-light);
    outline: none;
    background: var(--background-dark);
  }
  .description {
    font-size: 0.7em;
    line-height: 1.7em;
    font-style: italic;
    font-weight: 400;
    margin: 1em 0 0.3em 0;
    color: var(--text-light);
  }
  .name {
    font-size: 1.3em;
    /* color: var(--background-dark);
    background: white;
    margin: -0.8em -1.3em 0;
    padding: 0.8em 1.3em;
    border-radius: 1em 1em 0 0; */
    /* color: var(--text-accent); */
    margin: 0.3em 0;
  }
  .swirl-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .swirl {
    position: absolute;
    top: 40%;
    left: -10vw;
    right: -10vw;
    min-width: 1200px;
    z-index: 1;
    transform: translateX(-10vw) rotate(-15deg);
  }
  .more {
    padding: 9em 0 3em;
  }

  @media (max-width: 700px) {
    section {
      flex-direction: column;
    }
    .left {
      padding-right: 0;
    }
    .right {
      padding-left: 0;
      padding-right: 0;
      margin: 1em -1em;
    }
    .item {
      width: 100%;
      width: calc(100vw - 6em);
      max-width: calc(100vw - 6em);
    }
  }
</style>
