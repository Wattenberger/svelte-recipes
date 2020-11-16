<script>
  import { onMount } from "svelte"

  import Template from "./Template.svelte"

  import Icon from "./../../templates/Icon.svelte"
  import iconPaths from "./../../templates/icon-paths"
  const icons = Object.keys(iconPaths)
  import Toggle from "./../../templates/Toggle.svelte"
  import ProgressDots from "./../../templates/ProgressDots.svelte"
  import InView from "./../../templates/InView.svelte"
  import Number from "./../../templates/Number.svelte"
  import Scatterplot from "./../../templates/Scatterplot.svelte"
  import BriefMessage from "./../../templates/BriefMessage.svelte"

  let number = 60
  let numberDuration = 500
  let numberFormat = ".1f"

  const generateScatterplotData = () =>
    new Array(100).fill(0).map(_ => [Math.random(), Math.random(), 3])
  let scatterplotData = generateScatterplotData()

  const onRegenerateScatterplotData = () => {
    scatterplotData = generateScatterplotData()
  }
  onMount(onRegenerateScatterplotData)

  let messageIteration = 0
  let messageDuration = 500
  let message = "This is the message"
</script>

<h1>UI Elements</h1>

<Template name="Icon">
  <div slot="description">
    <p>
      These will inherit the current color, and are sized based on the
      font-size. Choose the specific icon with the attribute `name`.
    </p>
    <p>
      Make sure to also grab the `icon-paths.js` file, which stores svg path `d`
      attribute strings.
    </p>
  </div>

  {#each icons as icon}
    <span style="padding: 0.6em">
      <Icon name="{icon}" />
    </span>
  {/each}
</Template>

<Template name="Toggle">
  <div slot="description">
    <p>
      The currently selected option is represented in the `value` attribute. Add
      an `options` array with objects that have:
    </p>
    <ul>
      <li>
        <b>id</b>
        : what gets set as the `value`
      </li>
      <li>
        <b>label</b>
        : what gets displayed in the toggle
      </li>
    </ul>
  </div>

  <Toggle
    value="{1}"
    options="{[{ id: 1, label: 'One' }, { id: 2, label: 'Two' }, { id: 3, label: 'Three' }]}" />
</Template>

<Template name="ProgressDots">
  <div slot="description">
    <p></p>
  </div>

  <ProgressDots numberOfItems="6" activeIndex="1" />
</Template>

<Template name="Number">
  <div slot="description">
    <p>Displays a number with an interpolated animation when changed.</p>
    <label>
      <div class="label">value</div>
      <input bind:value="{number}" type="number" style="width: 6em" />
    </label>
    <label>
      <div class="label">duration (milliseconds)</div>
      <input bind:value="{numberDuration}" type="number" style="width: 6em" />
    </label>
    <label>
      <div class="label">format</div>
      <input bind:value="{numberFormat}" style="width: 6em" />
    </label>
  </div>

  <Number {number} duration="{numberDuration}" format="{numberFormat}" />
</Template>

<Template name="BriefMessage">
  <div slot="description">
    <p>
      This is a message that will pop up to give quick user feedback, and
      disappears after a short amount of time.
    </p>
    <p>
      The message shows up whenever the `text` or `iteration` changes. Changing
      the `iteration` is a good way to make sure the message shows up when
      needed, even if the `text` doesn't change.
    </p>

    <label>
      <div class="label">text</div>
      <input bind:value="{message}" style="width: 20em" />
    </label>
    <label>
      <div class="label">duration (milliseconds)</div>
      <input bind:value="{messageDuration}" type="number" style="width: 6em" />
    </label>
    <button on:click="{() => (messageIteration += 1)}">Show message</button>
  </div>

  <div style="position: relative">
    The message will show up next to this content.
    <BriefMessage
      text="{message}"
      iteration="{messageIteration}"
      duration="{messageDuration}" />
  </div>
</Template>

<h1>Utilities</h1>

<Template name="InView">
  <div slot="description">
    <p>
      Wrap something in this component, and use the `isInView` variable to know
      whether or not it's in view.
    </p>
    <p>
      You could also `bind` to the `isInViewProp` attribute, if you wanted a
      component-level variable (eg. if you want to change something outside of
      the content).
    </p>
  </div>

  <InView let:isInView>
    <div
      style="transform: translate({isInView ? 0 : '-3em'}); transition: all 1s
      ease-out;">
      Is {isInView ? '' : 'not '}in view
    </div>
  </InView>
</Template>

<h1>Charts</h1>

<Template name="Scatterplot">
  <div slot="description">
    <p>
      The basics for a scatterplot. This uses svelte a `spring`, which animates
      the dots on change, but requires a consistent number of items in the
      `data` array.
    </p>
    <button on:click="{onRegenerateScatterplotData}">Get new data</button>
  </div>

  <div style="max-width: 30em">
    <Scatterplot data="{scatterplotData}" />
  </div>
</Template>

<style>
  h1 {
    margin: 2em 0 0;
    padding-top: 1em;
    border-top: 1px solid #d5d6dd;
  }
  label {
    display: flex;
    justify-content: flex-start;
  }
  .label {
    width: 13em;
  }
</style>
