<script>
  import Stage from '../Stage'
  import fetchPipeline from './fetch-pipeline'

  export let id

  const pipeline = fetchPipeline(id)
</script>

{#await pipeline}
  <p>Waiting...</p>
{:then pipeline}
  <article class="pipeline">
    <h1>{pipeline.name}</h1>
    <div class="stages">
      {#each pipeline.stages as stage (stage.name)}
        <Stage name={stage.name} status={stage.status} />
      {/each}
    </div>
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