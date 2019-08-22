const toStageSchema = raw => ( {
  name: raw.name,
  status: raw.status
} )

const toPipelineSchema = raw => ( {
  name: raw.name,
  status: raw.status,
  stages: raw.stages.map(toStageSchema)
} )

const toQuery = params => {
  const entries = Object.entries(params)
  if(entries.length) {
    return '?' + entries.map(([key, value]) => `${key}=${value}`).join('&')
  } else {
    return ''
  }
}

export default (id, params) => fetch(`/api/services/azure-devops/pipelines/${id}${toQuery(params)}`)
  .then(res => res.json())
  .then(toPipelineSchema)
