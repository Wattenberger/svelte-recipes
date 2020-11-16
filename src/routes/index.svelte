<script>
  import Templates from "./../components/Templates.svelte"
</script>

<h1>Hey friend!</h1>
<p>These templates are yours to grab and modify as you need!</p>
<p>Just copy the source code & paste into a new .svelte file.</p>
<p>
  These can do basic color theming, if you set the css variables in a parent
  component:
</p>
<ul>
  <li>
    <b style="color: var(--accent-color)">--accent-color</b>
  </li>
  <li>
    <b style="color: var(--gray)">--gray</b>
  </li>
</ul>

<Templates />

<style>
  h1 {
    font-size: 3em;
    font-weight: 100;
  }
</style>
