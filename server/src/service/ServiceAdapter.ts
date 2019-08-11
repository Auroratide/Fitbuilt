import { Stage } from '../Pipeline'

export interface ServiceAdapter<ConfigType> {
  currentStages(id: string, config: ConfigType): Promise<Stage[]>
}