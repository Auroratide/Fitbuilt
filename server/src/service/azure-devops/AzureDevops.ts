import { Config } from './Config'
import fetch from '../../fetch'

// temporary solution
// username:personalaccesstoken
const AZURE_DEVOPS_CRED = process.env.AZURE_DEVOPS_CRED || ''

export class AzureDevops {
  public mostRecentBuild(definitionId: number, config: Config): Promise<Build> {
    return fetch(`${this.baseUrl(config)}/build/builds?definitions=${definitionId}&$top=1&${this.versionParam}`, {
      headers: {
        Authorization: this.auth
      }
    }).then(res => res.json())
      .then((res: BuildsResponse) => res.value[0])
  }

  public timelineForBuild(buildId: number, config: Config): Promise<BuildTimelineResponse> {
    return fetch(`${this.baseUrl(config)}/build/builds/${buildId}/timeline?${this.versionParam}`, {
      headers: {
        Authorization: this.auth
      }
    }).then(res => res.json())
  }

  private baseUrl(config: Config): string {
    return `${config.url}/${config.collection}/${config.project}/_apis`
  }

  private get versionParam(): string {
    return 'api-version=5.1'
  }

  private get auth(): string {
    return `Basic ${Buffer.from(AZURE_DEVOPS_CRED).toString('base64')}`
  }
}

export interface BuildsResponse {
  value: Build[]
}

export interface Build {
  id: number
  status: BuildStatus
  result: BuildResult
  definition: DefinitionReference
}

export enum BuildStatus {
  All = 'all',
  Cancelling = 'cancelling',
  Completed = 'completed',
  InProgress = 'inProgress',
  None = 'none',
  NotStarted = 'notStarted',
  Postponed = 'postponed'
}

export enum BuildResult {
  Canceled = 'canceled',
  Failed = 'failed',
  None = 'none',
  PartiallySucceeded = 'partiallySucceeded',
  Succeeded = 'succeeded'
}

export interface DefinitionReference {
  name: string
}

export interface BuildTimelineResponse {
  records: TimelineRecord[]
}

export interface TimelineRecord {
  type: string
  name: string
  order: number
  state: TimelineRecordState
  result: TaskResult
}

export enum TimelineRecordState {
  Completed = 'completed',
  InProgress = 'inProgress',
  Pending = 'pending'
}

export enum TaskResult {
  Abandoned = 'abandoned',
  Canceled = 'canceled',
  Failed = 'failed',
  Skipped = 'skipped',
  Succeeded = 'succeeded',
  SucceededWithIssues = 'succeededWithIssues'
}