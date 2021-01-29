<script context="module">
  import ForceWrapper from "./../../components/examples/ForceWrapper.svelte"
  import MapWrapper from "./../../components/examples/MapWrapper.svelte"
  import ScatterplotWrapper from "./../../components/examples/ScatterplotWrapper.svelte"
  import TweenedStaggeredWrapper from "./../../components/examples/TweenedStaggeredWrapper.svelte"
  import MoveWrapper from "./../../components/examples/MoveWrapper.svelte"
  import IconWrapper from "./../../components/examples/IconWrapper.svelte"
  import Code from "./../../components/Code.svelte"
  import Icon from "./../../components/Icon.svelte"

  const componentsByName = {
    ForceWrapper: ForceWrapper,
    MapWrapper: MapWrapper,
    ScatterplotWrapper: ScatterplotWrapper,
    TweenedStaggeredWrapper: TweenedStaggeredWrapper,
    MoveWrapper: MoveWrapper,
    IconWrapper: IconWrapper,
  }

  export async function preload({ params, query }) {
    const res = await this.fetch(`components/${params.id}.json`)
    const data = await res.json()

    if (res.status === 200) {
      return { component: data }
    } else {
      this.error(res.status, data.message)
    }
  }
</script>

<script>
  export let component = {}
  const codeUrlBase = `https://github.com/Wattenberger/svelte-recipes/tree/master/src/components/examples/`
</script>

<svelte:head>
  <title>Svelte Recipes: {component.name}</title>
</svelte:head>

<div class="c">
  <a href="/" class="back">
    <Icon name="arrow" />
    Back to list
  </a>
  <h1>{component.name}</h1>
  <p>
    {@html component.description}
  </p>

  <div class="content">
    <div class="code">
      <Code
        fileName="{component.fileName}"
        code="{component.codeHighlighted}"
        raw="{component.code}"
        link="{[codeUrlBase, component.fileName].join('')}" />
      {#if component.wrapperCode}
        <p style="{`margin: 3em 0 0`}">Usage example:</p>
        <Code
          link="{[codeUrlBase, component.wrapperName || `${component.name}Wrapper.svelte`].join('')}"
          fileName="{component.wrapperName || `${component.name}Wrapper.svelte`}"
          raw="{component.wrapperCode}"
          code="{component.wrapperCodeHighlighted}" />
      {/if}
    </div>
    <div class="right">
      <div class="example">
        {#if component.componentName}
          <svelte:component
            this="{componentsByName[component.componentName]}" />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .c {
    width: 100%;
    /* overflow: hidden; */
  }
  .back {
    display: inline-block;
    margin-left: -1.1em;
    text-decoration: none;
    color: var(--text-light);
    margin-bottom: 0.5em;
    transition: all 0.2s ease-out;
  }
  .back:hover {
    color: white;
  }
  .back:hover :global(svg) {
    transform: translateX(-0.2em);
  }
  .back :global(svg) {
    font-size: 0.8em;
    margin-right: 0.4em;
    transition: all 0.3s ease-out;
  }
  .content {
    display: flex;
    max-width: 100%;
  }
  .right {
    position: sticky;
    top: 2em;
    flex: 1;
    padding: 2em 0 2em 2em;
    overflow: hidden;
    align-self: start;
  }
  .example {
    padding: 1em;
    margin-top: 0.6em;
    background: var(--background-light);
  }
  .code {
    flex: 0 0 46em;
    /* overflow: auto; */
    /* overflow: visible; */
    /* overflow: hidden; */
    max-width: 46em;
    font-size: 0.9em;
  }

  @media (max-width: 1100px) {
    .content {
      flex-direction: column;
    }
    .right {
      position: relative;
      order: 1;
      width: 100%;
      margin-bottom: 2em;
      padding-left: 0;
    }
    .code {
      flex: none;
      order: 2;
      margin-left: -1em;
      width: calc(100% + 2em);
    }
  }
  @media (max-width: 500px) {
    .code {
      flex: none;
      order: 2;
      margin-left: 0;
      width: 100%;
      font-size: 0.8em;
    }
  }
</style>
