<script>
  import Stage, { Passed, InProgress } from '../Stage'
</script>

<article class="pipeline">
  <h1>Aurora</h1>
  <div class="stages">
    <Stage name="Stage 1" status={Passed} />
    <Stage name="Stage 2" status={Passed} />
    <Stage name="Stage 3" status={Passed} />
    <Stage name="Stage 4" status={InProgress} />
  </div>
</article>

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