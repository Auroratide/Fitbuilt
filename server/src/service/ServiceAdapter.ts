import { Pipeline } from '../Pipeline'

export interface ServiceAdapter<ConfigType> {
  currentPipeline(id: string, config: ConfigType): Promise<Pipeline>
}