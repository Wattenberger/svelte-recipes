import Scatterplot from "!!raw-loader!./../../components/examples/Scatterplot.svelte"
import ScatterplotWrapper from "!!raw-loader!./../../components/examples/ScatterplotWrapper.svelte"
import tweenedStagger from "!!raw-loader!./../../components/examples/tweened-staggered.js"
import TweenedStaggeredWrapper from "!!raw-loader!./../../components/examples/TweenedStaggeredWrapper.svelte"
import MoveWrapper from "!!raw-loader!./../../components/examples/MoveWrapper.svelte"
import Icon from "!!raw-loader!./../../components/examples/Icon.svelte"
import IconWrapper from "!!raw-loader!./../../components/examples/IconWrapper.svelte"
import move from "!!raw-loader!./../../components/examples/move.js"

import highlightJs from "highlight.js"
import hljsDefineSvelte from "./../../utils/highlight-svelte"

highlightJs.registerLanguage("svelte", hljsDefineSvelte)

const components = [
  {
    name: "Scatterplot",
    fileName: "Scatterplot.svelte",
    type: "component",
    description: "Create a chart with dots that animate when they move.",
    componentName: "ScatterplotWrapper",
    wrapperName: "ScatterplotWrapper.svelte",
    code: Scatterplot,
    codeHighlighted: highlightJs.highlight("svelte", Scatterplot).value,
    wrapperCode: ScatterplotWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("svelte", ScatterplotWrapper)
      .value,
  },
  {
    name: "Icon",
    fileName: "Icon.svelte",
    type: "component",
    description:
      "I love using raw svgs for icons - they're super lightweight, always look crisp, and are super flexible. The component has a <b>direction</b> for easy rotations (super useful for arrows), and is easily sized based on font size.",
    componentName: "IconWrapper",
    wrapperName: "IconWrapper.svelte",
    code: Icon,
    codeHighlighted: highlightJs.highlight("svelte", Icon).value,
    wrapperCode: IconWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("svelte", IconWrapper).value,
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
