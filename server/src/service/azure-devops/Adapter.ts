import { ServiceAdapter } from '../ServiceAdapter'
import { Config } from './Config'
import { AzureDevops, TimelineRecord } from './AzureDevops'
import { Stage, Status } from '../../Pipeline'

export class Adapter implements ServiceAdapter<Config> {
  private service: AzureDevops

  public constructor(service: AzureDevops) {
    this.service = service
  }

  public currentStages(id: string, config: Config): Promise<Stage[]> {
    return this.service.mostRecentBuild(id, config)
      .then(res => this.service.timelineForBuild(res.value[0].id, config))
      .then(res => res.records.sort(this.byOrderNumber))
      .then(records => records.map(this.toStage))
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