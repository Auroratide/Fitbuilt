<script>
  import { Unknown } from './status'

  export let name = ''
  export let status = Unknown
</script>

<section class={`stage ${status}`}>
  <h1 class="name">{name}</h1>
</section>

<style>
  .stage {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1em;
    border-radius: 0.5em;
  }

  .name {
    font-size: 2em;
    margin: 0;
  }

  .passed {
    background: #00a200;
  }

  .failed {
    background: #d20000;
  }

  .in-progress {
    background: #00a2d2;
  }

  .pending {
    background: #a0a0a0;
  }
</style>