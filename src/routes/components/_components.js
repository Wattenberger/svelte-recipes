import Map from "!!raw-loader!./../../components/examples/Map.svelte"
import MapWrapper from "!!raw-loader!./../../components/examples/MapWrapper.svelte"
import Scatterplot from "!!raw-loader!./../../components/examples/Scatterplot.svelte"
import ScatterplotWrapper from "!!raw-loader!./../../components/examples/ScatterplotWrapper.svelte"
import Spiral from "!!raw-loader!./../../components/examples/Spiral.svelte"
import SpiralWrapper from "!!raw-loader!./../../components/examples/SpiralWrapper.svelte"
import Force from "!!raw-loader!./../../components/examples/Force.svelte"
import ForceWrapper from "!!raw-loader!./../../components/examples/ForceWrapper.svelte"
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
    name: "World Map",
    fileName: "Map.svelte",
    type: "component",
    description:
      "Create a world map, with sized & colored bubbles for each country. Check this out on desktop <em>and</em> mobile 😉.",
    componentName: "MapWrapper",
    wrapperName: "MapWrapper.svelte",
    code: Map,
    codeHighlighted: highlightJs.highlight("svelte", Map).value,
    wrapperCode: MapWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("svelte", MapWrapper).value,
  },
  {
    name: "Force",
    fileName: "Force.svelte",
    type: "component",
    description: `Use d3 force to move particles around. You can change the forces at any point, more info in the <a href="https://github.com/d3/d3-force">d3 docs</a>.`,
    componentName: "ForceWrapper",
    wrapperName: "ForceWrapper.svelte",
    code: Force,
    codeHighlighted: highlightJs.highlight("svelte", Force).value,
    wrapperCode: ForceWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("svelte", ForceWrapper).value,
  }, {
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
  }, {
    name: "Spiral",
    fileName: "Spiral.svelte",
    type: "component",
    description: "Create a chart that spirals out from the center — great for showing yearly trends, not great for accurate comparisons. Inspired by <a href='https://www.nytimes.com/2022/01/06/opinion/omicron-covid-us.html'>this NYTimes chart</a> from Gus Wezerek and Sara Chodosh.",
    componentName: "SpiralWrapper",
    wrapperName: "SpiralWrapper.svelte",
    code: Spiral,
    codeHighlighted: highlightJs.highlight("svelte", Spiral).value,
    wrapperCode: SpiralWrapper,
    wrapperCodeHighlighted: highlightJs.highlight("svelte", SpiralWrapper)
      .value,
    containerStyles: "background: #fff; color: #000",
    layout: "large"
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
