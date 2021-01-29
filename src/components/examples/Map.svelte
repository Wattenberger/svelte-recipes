<script>
  import { extent, max } from "d3-array"
  import { interpolate, interpolateHcl } from "d3-interpolate"
  import { scaleSqrt, scaleLinear } from "d3-scale"
  import {
    geoOrthographic,
    geoPath,
    geoGraticule10,
    geoEqualEarth,
  } from "d3-geo"

  import countryShapes from "./country-shapes.js"
  import scaleCanvas from "./scale-canvas.js"
  import { tweened } from "./tweened-staggered.js"

  // utility function for translating elements
  const move = (x, y) => `transform: translate(${x}px, ${y}px`

  export let data = []
  // accessor functions to quickly pivot between data structures
  export let nameAccessor = d => d[0]
  export let rAccessor = d => d[1]
  export let colorAccessor = d => d[2]

  let width = 1200
  $: isVertical = width < 450
  $: height = width * (isVertical ? 2 : 0.7)

  const sphere = { type: "Sphere" }
  let canvasElement
  let blankMap

  // create projections - vertical orientations have two globes
  $: projections = isVertical
    ? [
        geoOrthographic()
          .fitSize([width, width], sphere)
          .rotate([-60, -20]),
        geoOrthographic()
          .fitSize([width, width], sphere)
          .translate([width / 2, height * 0.7])
          .rotate([90, -20]),
      ]
    : [
        geoEqualEarth()
          .fitSize([width, height], sphere)
          .rotate([-6, 0]),
      ]

  // make me some scales!
  $: rScale = scaleSqrt()
    .domain([0, max(data, rAccessor)])
    .range([0, width * height * 0.000036])
    .clamp(true)

  $: colorScale = scaleLinear()
    .domain(extent(data, colorAccessor))
    .range(["#274B55", "#f8f8f8"])
    .interpolate(interpolateHcl)
    .clamp(true)

  // draw a blank world map
  const drawCanvas = () => {
    if (!canvasElement) return
    const ctx = canvasElement.getContext("2d")
    scaleCanvas(canvasElement, ctx, width, height)

    const drawMap = projection => {
      const path = geoPath(projection, ctx)
      const drawPath = shape => {
        ctx.beginPath()
        path(shape)
      }
      drawPath(sphere)

      const fill = color => {
        ctx.fillStyle = color
        ctx.fill()
      }
      const stroke = color => {
        ctx.strokeStyle = color
        ctx.stroke()
      }
      drawPath(sphere)
      fill("#fff")
      stroke("#bbb")
      drawPath(geoGraticule10())
      stroke("#eee")

      countryShapes.forEach(shape => {
        drawPath(shape)
        fill("#f8f8f8")
        stroke("#ccc")
      })

      drawPath(sphere)
      stroke("#ccc")
    }
    projections.forEach(drawMap)

    blankMap = ctx.getImageData(0, 0, width * 2, height * 2)
  }
  $: width, projections, drawCanvas()

  // tween bubble sizes & colors
  let bubbles = tweened(countryShapes.map(d => [0, "#fff"]), {
    duration: 1000,
  })
  $: {
    const newBubbles = data.map((d, i) => [
      rScale(rAccessor(d)),
      colorScale(colorAccessor(d)),
    ])
    bubbles.set(newBubbles)
  }

  // draw one bubble for each country
  const drawBubbles = () => {
    if (!canvasElement) return
    if (!blankMap) return
    const ctx = canvasElement.getContext("2d")

    ctx.putImageData(blankMap, 0, 0)

    ctx.globalCompositeOperation = "multiply"
    const paths = projections.map(geoPath)
    data.forEach((d, i) => {
      const name = nameAccessor(d)
      const countryShape = countryShapes.find(
        country => country["properties"]["geounit"] == nameAccessor(d),
      )
      if (!countryShape) return
      let centroid = paths[0].centroid(countryShape)
      if (!centroid) return
      if (
        paths[1] &&
        (Number.isNaN(centroid[0]) ||
          ["United States of America", "Canada"].includes(name))
      )
        centroid = paths[1].centroid(countryShape)
      const [r, color] = $bubbles[i]
      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(...centroid, r, 0, 2 * Math.PI)
      ctx.fill()
    })

    ctx.globalCompositeOperation = "normal"
  }

  $: data, projections, $bubbles, drawBubbles()
</script>

<figure class="canvas-wrapper" bind:clientWidth="{width}">
  <canvas
    style="{`width: ${width}px; height: ${height}px`}"
    bind:this="{canvasElement}"></canvas>
</figure>

<style>
  .canvas-wrapper {
    position: relative;
    width: 100%;
    margin: 0;
  }
</style>
