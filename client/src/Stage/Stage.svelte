<script>
  import { Unknown } from './status'

  export let name = ''
  export let status = Unknown
</script>

<section class="stage">
  <h1>{name}</h1>
</section>

<style>
  .stage {
    border: 0.25em solid black;
  }
</style>