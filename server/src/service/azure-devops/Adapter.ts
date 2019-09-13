import { ServiceAdapter } from '../ServiceAdapter'
import { Config } from './Config'
import {
  AzureDevops,
  TimelineRecord,
  Build,
  BuildStatus,
  BuildResult,
  TaskResult,
  TimelineRecordState
} from './AzureDevops'
import { Pipeline, Stage, Status } from '../../Pipeline'

export class Adapter implements ServiceAdapter<Config> {
  private service: AzureDevops

  public constructor(service: AzureDevops) {
    this.service = service
  }

  public async currentPipeline(id: string, config: Config): Promise<Pipeline> {
    const build = await this.service.mostRecentBuild(parseInt(id), config)
    const timeline = await this.service.timelineForBuild(build.id, config)
    const records = this.orderByParentalHierarchy(timeline.records.sort(this.byOrderNumber));

    return {
      name: build.definition.name,
      status: this.statusOfBuild(build),
      stages: records
        .filter(this.forType('Task'))
        .filter(this.removeBuiltInAzureStages)
        .map(this.toStage)
    }
  }

  private orderByParentalHierarchy = (records: Array<TimelineRecord>, parentId: String = null): Array<TimelineRecord> =>
    records
      .filter(r => r.parentId === parentId)
      .reduce((aggregate, record) => aggregate
        .concat([record])
        .concat(this.orderByParentalHierarchy(records, record.id)), [])

  private statusOfBuild = (build: Build): Status => {
    if(build.result === BuildResult.Succeeded)
      return Status.Passed
    else if(build.status === BuildStatus.InProgress)
      return Status.InProgress
    else if(build.result === BuildResult.Failed)
      return Status.Failed
    else
      return Status.Unknown
  }

  private statusOfStage = (record: TimelineRecord): Status => {
    if(record.result === TaskResult.Succeeded)
      return Status.Passed
    else if(record.state === TimelineRecordState.InProgress)
      return Status.InProgress
    else if(record.state === TimelineRecordState.Pending)
      return Status.Pending
    else if(record.result === TaskResult.Failed)
      return Status.Failed
    else
      return Status.Unknown
  }

  private forType = (type: string) =>
    (record: TimelineRecord): boolean => record.type === type

  private removeBuiltInAzureStages = (record: TimelineRecord): boolean => {
    return ![
      'Checkpoint',
      'Initialize job',
      'Checkout',
      'Post-job: Checkout',
      'Finalize Job',
      'Report build status',
      '__default'
    ].includes(record.name)
  }

  private byOrderNumber = (left: TimelineRecord, right: TimelineRecord): number => {
    return left.order - right.order
  }

  private toStage = (record: TimelineRecord): Stage => {
    return {
      name: record.name,
      status: this.statusOfStage(record)
    }
  }
}