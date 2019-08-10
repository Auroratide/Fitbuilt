<script>
  import { Unknown } from './status'

  export let name = ''
  export let status = Unknown
</script>

<section class={`stage ${status}`}>
  <h1>{name}</h1>
</section>

<style>
  .stage {
    border: 0.25em solid;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .passed {
    border-color: green;
  }

  .failed {
    border-color: red;
  }

  .in-progress {
    border-color: yellow;
  }

  .pending {
    border-color: grey;
  }
</style>