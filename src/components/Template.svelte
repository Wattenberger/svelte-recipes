<script>
  import BriefMessage from "./../../templates/BriefMessage.svelte"
  import templatesCode from "./templates-code"

  export let name = ""

  $: code = templatesCode[name] || "couldn't find code"

  const grabRawCode = str => {
    const [base, gravy] = str.split("/* gravy */")
    return gravy ? base + "</style>" : base
  }
  $: baseCode = grabRawCode(code)
  $: isRawCodeDifferent = code.length != baseCode.length

  let successMessageIteration1 = 0
  let successMessageIteration2 = 0

  const onCopy = (code, index) => {
    try {
      navigator.clipboard.writeText(code).then(
        () => {
          if (index == 1) {
            successMessageIteration1 += 1
          } else {
            successMessageIteration2 += 1
          }
        },
        e => {
          throw new Error(e)
        },
      )
    } catch (e) {
      console.log("error when copying code", e)
    }
  }
</script>

<section>
  <div class="heading">
    <h2>{name}</h2>
    <a
      href="https://github.com/the-pudding/svelte-templates/blob/master/templates/{name}.svelte">
      Code
    </a>
  </div>
  <button
    on:click="{() => {
      onCopy(code, 1)
    }}">
    <div class="message">
      {#if successMessageIteration1}
        <BriefMessage
          text="copied to clipboard! 😺🐱‍🏍"
          iteration="{successMessageIteration1}" />
      {/if}
    </div>
    Copy code
  </button>
  {#if isRawCodeDifferent}
    <button
      on:click="{() => {
        onCopy(baseCode, 2)
      }}">
      <div class="message">
        {#if successMessageIteration2}
          <BriefMessage
            text="copied to clipboard! 😺🐱‍🏍"
            iteration="{successMessageIteration2}" />
        {/if}
      </div>
      Copy code without styles
    </button>
  {/if}

  <div class="description">
    <slot name="description" />
  </div>

  <slot />
</section>

<style>
  section {
    margin: 5em 0;
  }
  .heading {
    position: relative;
  }
  .heading a {
    position: absolute;
    top: 50%;
    left: -0.7em;
    font-size: 0.8em;
    transform: translate(-100%, -50%);
  }
  .description {
    margin-bottom: 2em;
  }
  button {
    position: relative;
  }
  .message {
    position: absolute;
    top: -0.3em;
    right: -1em;
    width: 20em;
    transform: translate(100%, -50%);
    z-index: 10;
  }
</style>
