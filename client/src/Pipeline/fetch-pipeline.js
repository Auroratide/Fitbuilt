const toStageSchema = raw => ( {
  name: raw.name,
  status: raw.status
} )

const toPipelineSchema = raw => ( {
  name: raw.name,
  status: raw.status,
  stages: raw.stages.map(toStageSchema)
} )

export default (n) => fetch(`/api/services/azure-devops/pipelines/${n}`)
  .then(res => res.json())
  .then(toPipelineSchema)
