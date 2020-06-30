<script>
  import data from "./references"
</script>

<h2>More References</h2>

<ul class="list">
  {#each data as { url, name, notes }}
    <li class="item">
      <a href="{url}" target="_blank">
        <div class="name">{name}</div>
        {#if notes}
          <div class="notes">{notes}</div>
        {/if}
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 -1.2em;
    padding: 0;
    list-style-type: none;
  }
  li {
    margin: 0.5em 0;
  }
  a {
    display: block;
    max-width: 20em;
    padding: 0.6em 1.2em;
    font-size: 1em;
    text-decoration: none;
    border-radius: 3px;
    transition: all 0.2s ease-out;
  }
  a:hover {
    background: var(--background-dark);
  }
  .name {
    font-weight: 800;
  }
  .notes {
    font-size: 0.8em;
    line-height: 1.7em;
    font-style: italic;
    font-weight: 400;
    color: var(--text-light);
  }
</style>
