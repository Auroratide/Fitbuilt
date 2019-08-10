<script>
  // import Stage, { Passed, InProgress } from '../Stage'
  import fetchPipeline from './fetch-pipeline'

  const pipeline = fetchPipeline(123)
</script>

{#await pipeline}
  <p>Waiting...</p>
{:then pipeline}
  <article class="pipeline">
    <h1>{pipeline.name}</h1>  
  </article>
{/await}

<style>
  .pipeline {
    text-align: center;
  }

  .stages {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
  }
</style>