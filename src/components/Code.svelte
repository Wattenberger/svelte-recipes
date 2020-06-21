<script>
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import Tooltip from "./Tooltip.svelte";

  export let language = "js";
  export let code;
  export let raw;
  export let fileName;
  export let link;
  export let canCopy = true;

  let codeElem;
  let didCopy = false;

  const onCopy = () => {
    try {
      navigator.clipboard.writeText(raw || code).then(
        () => {
          console.log("success");
          didCopy = true;
          setTimeout(() => {
            didCopy = false;
          }, 1500);
        },
        e => {
          throw new Error(e);
        }
      );
    } catch (e) {
      console.log("error when copying code", e);
    }
  };
</script>

<div class="c">
  {#if fileName}
    <div class="file-name">
      <Icon name="file" />
      <div class="name">{fileName}</div>
      {#if canCopy}
        <button on:click="{onCopy}">
          <Tooltip>
            {didCopy ? '✨ Copied to clipboard! 🎉' : 'Copy to clipboard'}
          </Tooltip>
          <Icon name="copy" />
        </button>
      {/if}
      <a href="{link}" class="link" target="_blank" rel="noopener noreferrer">
        <Tooltip>
          See on Github
          <span style="font-size: 0.9em">
            <Icon name="external" />
          </span>
        </Tooltip>
        <Icon name="code" />
      </a>
    </div>
  {/if}
  <pre>
    <code class="language-{language}" bind:this="{codeElem}">
      {@html code}
    </code>
  </pre>
</div>

<style>
  .c {
    overflow: visible;
  }
  .c + .c {
    margin-top: 2em;
  }
  .file-name {
    display: flex;
    align-items: center;
    /* background: #3d6672; */
    margin-left: -0.7em;
    padding: 0.6em 1em;
    font-weight: 600;
    font-size: 0.9em;
    /* color: #64687a; */
    color: var(--text-light);
  }
  .file-name :global(svg) {
    margin-right: 0.3em;
  }
  .name {
    flex: 1;
  }
  a {
    display: flex;
    position: relative;
    padding: 0;
    height: 1em;
  }
  button {
    position: relative;
    height: 1em;
    margin: 0 0.6em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    appearance: none;
    background: none;
    color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
  }
  pre {
    margin: 0;
  }
  code {
    --base: #282c34;
    display: block;
    overflow-x: auto;
    padding: 0.5em 1.6em;
    color: #f2f2f7;
    background: var(--base);
    background: #0b2830;
    color: white;
    font-family: "Fira code", monospace;
    font-size: 0.9em;
  }

  code :global(.hljs-comment),
  code :global(.hljs-quote) {
    color: #9294a3;
    font-style: italic;
  }

  code :global(.hljs-doctag),
  code :global(.hljs-keyword),
  code :global(.hljs-formula) {
    color: #b9a7ff;
  }

  code :global(.hljs-section),
  code :global(.hljs-name),
  code :global(.hljs-selector-tag),
  code :global(.hljs-deletion),
  code :global(.hljs-subst) {
    color: #65ddd9;
  }

  code :global(.hljs-variable) {
    color: #b9a7ff;
  }
  code :global(.hljs-literal) {
    color: #b9a7ff;
  }
  code :global(.hljs-d3) {
    color: #c593ff;
    font-weight: 700;
  }

  code :global(.hljs-string),
  code :global(.hljs-regexp),
  code :global(.hljs-addition),
  code :global(.hljs-attribute),
  code :global(.hljs-meta-string) {
    color: #ff767b;
  }

  code :global(.hljs-built_in),
  code :global(.hljs-class .hljs-title) {
    color: #75f7a6;
  }

  code :global(.hljs-attr),
  code :global(.hljs-variable),
  code :global(.hljs-template-variable),
  code :global(.hljs-type) {
    color: #ff8d58;
  }
  code :global(.hljs-selector-class),
  code :global(.hljs-selector-attr),
  code :global(.hljs-selector-pseudo),
  code :global(.hljs-number) {
    color: #ffc312;
  }

  code :global(.hljs-symbol),
  code :global(.hljs-bullet),
  code :global(.hljs-link),
  code :global(.hljs-meta),
  code :global(.hljs-selector-id),
  code :global(.hljs-title) {
    color: #6196cc;
  }

  code :global(.hljs-emphasis) {
    font-style: italic;
  }

  code :global(.hljs-strong) {
    font-weight: bold;
  }

  code :global(.hljs-link) {
    text-decoration: underline;
  }
</style>
