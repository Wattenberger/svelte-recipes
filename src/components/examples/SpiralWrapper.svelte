<script>
  import { csv } from "d3-fetch";
  import { timeParse } from "d3-time-format";
  import Spiral from "./Spiral.svelte";
  import { onMount } from "svelte";
  import countryNamesMap from "./country-names.json";

  const source =
    'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv';
  let allData = []
  let isLoading = true
  let countries = [];
  let country = 'USA';

  const getData = async () => {
    const res = await csv(source);
    allData = res
    isLoading = false
    countries = [...new Set(res.map((d) => d.iso_code))];
  };
  onMount(getData);
  $: filteredData = allData.filter((d) => d.iso_code === country);
  const parseDate = timeParse('%Y-%m-%d');
</script>

<div class="wrapper">
  {#if isLoading}
    <div class="loading">Loading...</div>

  {:else if filteredData.length}
    <select bind:value={country}>
      {#each countries as c}
        <option value={c}>{countryNamesMap[c] || c}</option>
      {/each}
    </select>

    <Spiral
      data={filteredData}
      metricAccessor={(d) => +d['new_cases_smoothed_per_million']}
      timeAccessor={(d) => parseDate(d['date'])}
    >
    <span slot="legend-title">
      New COVID-19 cases
      <br />per 1M people in
      <br />{countryNamesMap[country] || country}
      <br /><span style="opacity: 0.6">(smoothed across 7-days)</span>
    </span>
    </Spiral>

  {:else}
    <p>No data</p>
  {/if}

  <div class="info">
    <div>Data from Our World in Data</div>
    <a href="https://github.com/owid/covid-19-data">https://github.com/owid/covid-19-data</a>
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
  }
  select {
    padding: 0.3em 1em;
  }
  .loading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    color: #999;
    font-style: italic;
  }
  .info {
    margin-top: -3em;
    font-size: 0.8em;
    color: #999;
    line-height: 1.5em;
    font-style: italic;
    text-align: center;
  }
</style>