import Scatterplot from "!!raw-loader!./../../components/examples/Scatterplot.svelte"
import ScatterplotWrapper from "!!raw-loader!./../../components/examples/ScatterplotWrapper.svelte"
import tweenedStagger from "!!raw-loader!./../../components/examples/tweened-staggered.js"
import TweenedStaggeredWrapper from "!!raw-loader!./../../components/examples/TweenedStaggeredWrapper.svelte"
import move from "!!raw-loader!./../../components/examples/move.js"
import MoveWrapper from "!!raw-loader!./../../components/examples/MoveWrapper.svelte"

import highlightJs from "highlight.js"
import hljsDefineSvelte from "./../../utils/highlight-svelte"

highlightJs.registerLanguage("svelte", hljsDefineSvelte)

const components = [
  {
    name: "Scatterplot",
    type: "component",
    description: "Create a chart with dots that animate when they move.",
    componentName: "Scatterplot",
    raw: highlightJs.highlight("svelte", Scatterplot).value,
    wrapper: highlightJs.highlight("svelte", ScatterplotWrapper).value,
  },
  {
    name: "tweened-staggered",
    type: "function",
    description:
      "A tweaked version of the official svelte <pre>tweened</pre> method, with two updates: <strong>a</strong>: it takes an <pre>iDelay</pre> configuration option, which staggers the transition of individual items in a tweened array, and <strong>b</strong>: it uses d3.js's interpolation function, which handles interpolation of colors.",
    componentName: "TweenedStaggeredWrapper",
    wrapperName: "TweenedStaggeredWrapper.svelte",
    raw: highlightJs.highlight("javascript", tweenedStagger).value,
    wrapper: highlightJs.highlight("javascript", TweenedStaggeredWrapper).value,
  },
  {
    name: "move",
    type: "function",
    description: `Wrap <pre>transform: translate</pre> css style to keep code concise. I like to use <pre>transform</pre>s liberally, since they are easy to animate (via CSS transitions), and one of <a href="https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/" target="_blank" rel="noopener noreferrer">the most performant ways to animate on the web</a>.`,
    componentName: "MoveWrapper",
    wrapperName: "MoveWrapper.svelte",
    raw: highlightJs.highlight("javascript", move).value,
    wrapper: highlightJs.highlight("javascript", MoveWrapper).value,
  },
].map(d => ({
  ...d,
  id: d.name.toLowerCase().replace(/ /g, "-"),
}))

export default components
