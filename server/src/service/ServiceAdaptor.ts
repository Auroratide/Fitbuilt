import { Stage } from '../Pipeline'

export interface ServiceAdaptor {
  currentStages(): Stage[]
}