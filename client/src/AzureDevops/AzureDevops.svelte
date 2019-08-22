<script>
  import Pipeline from '../Pipeline'

  export let url
  export let collection
  export let project
  export let definitionId
</script>

<Pipeline id={definitionId} params={{ url, collection, project }} />
