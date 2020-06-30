<script>
  import Icon, { directions, iconOptions } from "./Icon.svelte"

  let directionIndex = 0
  const onRotate = () => {
    directionIndex = (directionIndex + 1) % directions.length
  }
</script>

<div class="c">
  <div class="options">
    {#each iconOptions as option}
      <div class="option">
        <div class="name">{option}</div>
        <div class="icon">
          <Icon name="{option}" direction="{directions[directionIndex]}" />
        </div>
      </div>
    {/each}
  </div>
  <button on:click="{onRotate}">rotate</button>

  <div class="note">
    These svgs are grabbed from
    <a href="https://feathericons.com/" target="_blank" rel="noopener">
      Feather Icons
    </a>
    . 🤍
    <br />
    <br />
    I use the Figma plugin to import one into Figma, then
    <pre>ctrl</pre>
    +
    <pre>shift</pre>
    +
    <pre>o</pre>
    to expand into paths,
    <pre>alt</pre>
    +
    <pre>g</pre>
    to group, then update the dimensions to fit snugly into a 25px x 25px
    square. I'll usually include a 25px x 25px square in my group, to help
    center the icon paths. Then I just right click,
    <pre>Copy as SVG</pre>
    , paste into my code editor and grab the
    <pre>path</pre>
    <pre>d</pre>
    strings.
  </div>
</div>

<style>
  .c {
    margin: 0 2em 1em;
  }
  .note {
    margin: 2em 0;
  }
  pre {
    display: inline;
    background: var(--background-dark);
    padding: 0.3em 0.5em;
    font-size: 1em;
  }
  .options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -2em;
  }
  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5em;
    padding: 0.5em 1em;
  }
  .option:hover .icon {
    color: var(--text-accent);
  }
  .name {
    margin-bottom: 0.6em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.8em;
  }
  .icon {
    font-size: 2em;
  }
</style>
