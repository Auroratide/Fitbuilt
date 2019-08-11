import { Config } from './Config'
import fetch from '../../fetch'

export class AzureDevops {
  public mostRecentBuild(definitionId: string, config: Config): Promise<BuildsResponse> {
    return fetch(`${this.baseUrl(config)}/build/builds?definitions=${definitionId}&$top=1&${this.versionParam}`)
      .then(res => res.json())
  }

  public timelineForBuild(buildId: number, config: Config): Promise<BuildTimelineResponse> {
    return fetch(`${this.baseUrl(config)}/build/builds/${buildId}/timeline?${this.versionParam}`)
      .then(res => res.json())
  }

  private baseUrl(config: Config): string {
    return `${config.url}/${config.collection}/${config.project}/_apis`
  }

  private get versionParam(): string {
    return 'api-version=5.1'
  }
}

export interface BuildsResponse {
  value: Build[]
}

export interface Build {
  id: number
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