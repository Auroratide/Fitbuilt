<script>
  import Stage, { Passed } from '../Stage'
</script>

<article class="pipeline">
  <Stage name="Stage 1" status={Passed} />
  <Stage name="Stage 2" status={Passed} />
  <Stage name="Stage 3" status={Passed} />
</article>

<style>
  .pipeline {
    border: 0.25em solid red;
  }
</style>