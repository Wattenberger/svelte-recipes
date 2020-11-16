<script>
  export let text = "";
  export let iteration = 0; // for re-triggering before the message has disappeared
  export let duration = 1000;

  let isShowing = false;
  let localIteration = 0;

  $: onStartTimeout = debounce(() => {
    isShowing = false;
  }, duration);

  $: onTextChange = () => {
    if (!text) {
      isShowing = false;
      return;
    }
    localIteration++;
    isShowing = true;
    onStartTimeout();
  };
  $: text, iteration, onTextChange();

  // from https://davidwalsh.name/javascript-debounce-function
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
</script>

{#if text && isShowing}
  <div
    class="c c--{localIteration % 2}"
    style="animation-duration: {duration}ms">
    {text}
  </div>
{/if}

<style>
  @keyframes fadeOut {
    0% {
      transform: translate(0, 1em);
      opacity: 0;
    }
    10% {
      transform: translate(0, 0);
      opacity: 1;
    }
    80% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(0, 1em);
      opacity: 0;
    }
  }
  @keyframes fadeOut2 {
    0% {
      transform: translate(0, 1em);
      opacity: 0;
    }
    10% {
      transform: translate(0, 0);
      opacity: 1;
    }
    80% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(0, 1em);
      opacity: 0;
    }
  }
  .c {
    position: absolute;
    padding: 0.6em 1em;
    background: white;
    transform: translate(0, 1em);
    opacity: 0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--gray-lightest);
    border-radius: 0.6em;
    font-weight: 600;
    animation: fadeOut 0.6s ease-out;
    animation-fill-mode: forwards;
  }
  .c--1 {
    animation-name: fadeOut2;
  }
</style>
