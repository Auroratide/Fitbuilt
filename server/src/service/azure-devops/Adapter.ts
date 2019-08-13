import { ServiceAdapter } from '../ServiceAdapter'
import { Config } from './Config'
import { AzureDevops, TimelineRecord } from './AzureDevops'
import { Pipeline, Stage, Status } from '../../Pipeline'

export class Adapter implements ServiceAdapter<Config> {
  private service: AzureDevops

  public constructor(service: AzureDevops) {
    this.service = service
  }

  public async currentPipeline(id: string, config: Config): Promise<Pipeline> {
    const build = await this.service.mostRecentBuild(parseInt(id), config)
    const timeline = await this.service.timelineForBuild(build.id, config)

    return {
      name: build.definition.name,
      status: Status.Passed,
      stages: timeline.records
        .filter(this.keepOnlyTasks)
        .filter(this.removeBuiltInAzureStages)
        .sort(this.byOrderNumber)
        .map(this.toStage)
    }
  }

  private keepOnlyTasks(record: TimelineRecord): boolean {
    return record.type === 'Task'
  }

  private removeBuiltInAzureStages(record: TimelineRecord): boolean {
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

  private byOrderNumber(left: TimelineRecord, right: TimelineRecord): number {
    return left.order - right.order
  }

  private toStage(record: TimelineRecord): Stage {
    return {
      name: record.name,
      status: Status.Passed
    }
  }
}