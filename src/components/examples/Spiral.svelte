<script>
  import { scaleLinear,scaleSqrt } from "d3-scale";
  import { extent, range } from "d3-array";
  import { format } from "d3-format";
  import { interpolateHclLong } from "d3-interpolate";
  import { timeDay,timeYear } from "d3-time";
  import { timeFormat } from "d3-time-format";
  import { fade } from "svelte/transition";

  export let data = [];
  export let metricAccessor = (d) => d['x'];
  export let timeAccessor = (d) => d['date'];

  const progressInYearAccessor = (d) => {
    const date = timeAccessor(d);
    console.log('date',date, timeDay.count(timeYear.floor(date), date));

    return timeDay.count(timeYear.floor(date), date);
  };
  const formatNumber = format(',.1s');
  const formatDate = timeFormat('%b %-d, %Y');

  let width = 100;
  $: height = width

  $: metricDomain = [0, 500];
  $: timeDomain = extent(data, timeAccessor);

  $: colorScale = scaleLinear()
    .domain([0, metricDomain[1] / 3, (metricDomain[1] / 3) * 2, metricDomain[1]])
    .range(['#f4f4f4', '#89BC97', '#5D2EDD', '#000'])
    .interpolate(interpolateHclLong);

  const maxLength = 8;
  $: scaleScale = scaleSqrt().domain(metricDomain).range([0, maxLength]);
  $: colorScaleTicks = colorScale.ticks(6).map((d) => {
    const scale = scaleScale(d);
    const tickHeight = (height / 100) * scale;

    return {
      tickHeight,
      value: d,
      percent: (d * 100) / metricDomain[1],
      color: colorScale(d)
    };
  });
  $: radiusScale = scaleLinear().domain(timeDomain).range([20, 40]);
  $: yearRadiusScale = scaleLinear()
    .domain(timeDomain)
    .range([height * 0.21, height * 0.41]);
  $: strokeWidthScale = scaleLinear().domain(timeDomain).range([0.3, 0.65]);
  $: angleScale = scaleLinear().domain([0, 365]).range([0, 360]);
  const getPositionFromDistanceAndAngle = (distance, angle) => {
    const x = distance * Math.cos((angle * Math.PI) / 180);
    const y = distance * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };
  const getTransformFromDistanceAndAngle = (distance, angle) => {
    const { x, y } = getPositionFromDistanceAndAngle(distance, angle);
    return `translate(${x}, ${y})`;
  };
  const getPathForValue = (value) => {
    const height = scaleScale(value);
    return ['M', 0, -height / 2, 'L', 0, height / 2].join(' ');
  };
  const monthNames = range(0,12).map(i => timeFormat('%b')(new Date(2000, i, 1)));
  $: months = monthNames.map((month, i) => {
    const angle = (360 / 12) * i - 360 / 4;
    const { x, y } = getPositionFromDistanceAndAngle(width * (i ? 0.38 + i * 0.009 : 0.49), angle);
    return {
      i,
      name: month,
      angle,
      x: x + width / 2,
      y: y - height / 2
    };
  });
  $: years = timeYear.range(timeYear.floor(timeDomain[0]), timeDomain[1])
      .map((year) => {
        const r = yearRadiusScale(year);
        const { x, y } = getPositionFromDistanceAndAngle(r, -360 / 4);
        return {
          name: year.getFullYear(),
          x: x + width / 2,
          y: y - height / 2
        };
      });
</script>

<div class="wrapper">
  <div bind:clientWidth={width}>
    <svg width="100%" viewBox="-50 -50 100 100">
        {#each data || [] as d,i (d.date)}
          <path
            class="transition"
            in:fade={{delay: i * 3}}
            d={getPathForValue(metricAccessor(d))}
            r={scaleScale(metricAccessor(d))}
            stroke={colorScale(metricAccessor(d))}
            stroke-width={strokeWidthScale(timeAccessor(d))}
            stroke-linecap="round"
            transform={getTransformFromDistanceAndAngle(
              radiusScale(timeAccessor(d)),
              angleScale(progressInYearAccessor(d)) - 360 / 4
            ) + `rotate(${angleScale(progressInYearAccessor(d))})`}
					>
					<title>{formatDate(timeAccessor(d))}: {metricAccessor(d)}</title>
					</path>
        {/each}
    </svg>

    <!-- these are overlaid in HTML to prevent from warping the text -->
    {#each months as { name, x, y }}
      <div
        class="label"
        style="transform: translate({x}px, {y}px)"
      >
        {name}
      </div>
    {/each}
    {#each years as { name, x, y }}
      <div
        class="label"
        style="transform: translate({x}px, {y}px)"
      >
        <div style="-webkit-text-stroke: 6px white">
          {name}
        </div>
        <div style="position: absolute">
          {name}
        </div>
      </div>
    {/each}
  </div>

  <div class="legend">
      <div class="legend__title">
        <slot name="legend-title" />
      </div>
      <div class="legend__ticks">
        {#each colorScaleTicks as { value, tickHeight, color } (value)}
          <div class="legend__tick">
            <div
              class="legend__bar-wrapper"
              style="height: {(height / 100) * maxLength}px"
            >
              <div
                class="legend__bar"
                style="height: {tickHeight}px; background-color: {color}"
              />
            </div>

            <div class="legend__value">
              {formatNumber(value)}{value === 500 ? '+' : ''}
            </div>
          </div>
        {/each}
      </div>
    </div>
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    max-width: 80vh;
    padding: 2%;
    margin-bottom: 1em;
  }
  .label {
    position: absolute;
    width: 0;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .legend__title {
    text-align: center;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1.2em;
    color: #999;
		max-width: 24em;
  }
  .legend__ticks {
    display: flex;
  }
  .legend__tick {
    display: flex;
    flex-direction: column;
    margin: 0 0.2em;
    transition: all 0.6s ease-out;
  }
  .legend__bar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .legend__bar {
    width: 0.6em;
    border-radius: 1em;
  }
  .legend__value {
    font-size: 0.8em;
    color: #999;
    text-align: center;
  }
  .transition {
    transition: all 0.6s ease-out;
  }
</style>