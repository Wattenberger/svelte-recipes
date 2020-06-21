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
    fileName: "Scatterplot.svelte",
    type: "component",
    description: "Create a chart with dots that animate when they move.",
    componentName: "Scatterplot",
    wrapperName: "ScatterplotWrapper.svelte",
    code: Scatterplot,
    codeHighlighted: highlightJs.highlight("svelte", Scatterplot).value,
    wrapperCode: ScatterplotWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("svelte", ScatterplotWrapper)
      .value,
  },
  {
    name: "tweened-staggered",
    fileName: "tweened-staggered.js",
    type: "function",
    description:
      "A tweaked version of the official svelte <pre>tweened</pre> method, with two updates: <strong>a</strong>: it takes an <pre>iDelay</pre> configuration option, which staggers the transition of individual items in a tweened array, and <strong>b</strong>: it uses d3.js's interpolation function, which handles interpolation of colors.",
    componentName: "TweenedStaggeredWrapper",
    wrapperName: "TweenedStaggeredWrapper.svelte",
    code: tweenedStagger,
    codeHighlighted: highlightJs.highlight("javascript", tweenedStagger).value,
    wrapperCode: TweenedStaggeredWrapper,
    wrapperCodeHighlighted: highlightJs.highlight(
      "javascript",
      TweenedStaggeredWrapper,
    ).value,
  },
  {
    name: "move",
    fileName: "move.js",
    type: "function",
    description: `Wrap <pre>transform: translate</pre> css style to keep code concise. I like to use <pre>transform</pre>s liberally, since they are easy to animate (via CSS transitions), and one of <a href="https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/" target="_blank" rel="noopener noreferrer">the most performant ways to animate on the web</a>.`,
    componentName: "MoveWrapper",
    wrapperName: "MoveWrapper.svelte",
    code: move,
    codeHighlighted: highlightJs.highlight("javascript", move).value,
    wrapperCode: MoveWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("javascript", MoveWrapper)
      .value,
  },
].map(d => ({
  ...d,
  id: d.name.toLowerCase().replace(/ /g, "-"),
}))

export default components
