<script>
  import Stage, { Passed, Failed, InProgress } from './Stage'
  import Heart from './Heart'
  import Footprints from './Footprints'
  import Fire from './Fire'
  import fetchPipeline from './fetch-pipeline'

  export let service
  export let id
  export let params = {}
  export let interval = 5000

  let pipeline = {}
  const refresh = () => fetchPipeline(service, id, params)
    .then(p => pipeline = p)
    .then(() => setTimeout(refresh, interval))

  const firstFetch = refresh()
</script>

{#await firstFetch}
  <p>Waiting...</p>
{:then}
  <article class={`pipeline ${pipeline.status}`}>
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
    margin: 0;
    padding: 0.25em;
    border-radius: 0.25em;
  }

  .failed .name {
    background: #d20000;
  }

  .stages {
    grid-area: stages;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
  }

  .icon {
    grid-area: icon;
    max-width: 12em;
    margin: 0 auto;
  }
</style>