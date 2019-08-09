export enum Status {
  Passed = 'passed',
  Failed = 'failed',
  InProgress = 'in-progress',
  Pending = 'pending',
  Unknown = 'unknown'
}

export interface Stage {
  name: string
  status: Status
}

export interface Pipeline {
  name: string
  status: Status
  stages: Stage[]
}