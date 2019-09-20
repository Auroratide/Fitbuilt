import { ServiceAdapter } from '../ServiceAdapter'
import { Config } from './Config'
import { Pipeline, Stage, Status } from '../../Pipeline'

export class Adapter implements ServiceAdapter<Config> {
  public constructor() {}

  public async currentPipeline(id: string, config: Config): Promise<Pipeline> {
    const name = 'Stub Pipeline'

    if(config.scenario === 'failed') return {
      name,
      status: Status.Failed,
      stages: [
        this.stage(1, Status.Passed),
        this.stage(2, Status.Failed),
        this.stage(3, Status.Unknown)
      ]
    }

    else if(config.scenario === 'in-progress') return {
      name,
      status: Status.InProgress,
      stages: [
        this.stage(1, Status.Passed),
        this.stage(2, Status.InProgress),
        this.stage(3, Status.Pending)
      ]
    }

    else if(config.scenario === 'unknown') return {
      name,
      status: Status.Unknown,
      stages: [
        this.stage(1, Status.Unknown),
        this.stage(2, Status.Unknown),
        this.stage(3, Status.Unknown)
      ]
    }

    else return {
      name,
      status: Status.Passed,
      stages: [
        this.stage(1, Status.Passed),
        this.stage(2, Status.Passed),
        this.stage(3, Status.Passed)
      ]
    }
  }

  private stage(n: number, status: Status): Stage {
    return {
      name: `Stage ${n}`,
      status
    }
  }
}