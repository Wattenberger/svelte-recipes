<script>
  import { format as d3Format, interpolate, timer as d3Timer } from "d3"

  export let number = null
  export let format = ",.2f"
  export let duration = 300

  let displayNumber = 0
  $: cachedNumber = 0
  $: formatFunction = d => {
    try {
      return typeof format == "string" ? d3Format(format)(d) : format(d)
    } catch (e) {
      console.log(e)
      return "-"
    }
  }

  const startInterpolate = () => {
    const interpolationFunction = interpolate(cachedNumber, number)

    const timer = d3Timer(timeElapsed => {
      const t = timeElapsed / duration

      displayNumber = interpolationFunction(t)

      if (t >= 1) {
        if (timer) timer.stop()
        displayNumber = number
        cachedNumber = number
      }
    })
  }

  $: number, startInterpolate()
</script>

<span class="c">
  {Number.isFinite(+displayNumber) ? formatFunction(displayNumber) : '-'}
</span>

<style>
  .c {
    font-feature-settings: "tnum", 1;
  }
</style>
