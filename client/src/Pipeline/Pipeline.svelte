<script>
  import Stage, { Passed, Failed, InProgress } from '../Stage'
  import Heart from '../Heart'
  import Footprints from '../Footprints'
  import Fire from '../Fire'
  import fetchPipeline from './fetch-pipeline'

  export let id

  const pipeline = fetchPipeline(id)
</script>

{#await pipeline}
  <p>Waiting...</p>
{:then pipeline}
  <article class="pipeline">
    <h1 class="name">{pipeline.name}</h1>
    <div class="stages">
      {#each pipeline.stages as stage (stage.name)}
        <Stage name={stage.name} status={stage.status} />
      {/each}
    </div>
    <aside class="icon">
      {#if pipeline.status === Passed}
        <Heart />
      {:else if pipeline.status === InProgress}
        <Footprints />
      {:else if pipeline.status === Failed}
        <Fire />
      {:else}
        <p>Something <em>horrible</em> has happened.</p>
      {/if}
    </aside>
  </article>
{/await}

<style>
  .pipeline {
    display: grid;
    grid-template: auto 1fr / 1fr 5fr;
    grid-template-areas:
      ". name"
      "icon stages";
    gap: 1em;
    padding: 1em;
  }

  .name {
    grid-area: name;
    font-size: 2.5em;
    margin: 0 0 0.25em;
  }

  .stages {
    grid-area: stages;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
  }

  .icon {
    grid-area: icon;
  }
</style>