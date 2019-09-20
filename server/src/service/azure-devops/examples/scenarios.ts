import {
  BuildStatus,
  BuildResult,
  TimelineRecordState,
  TaskResult
} from '../AzureDevops'
import fetch from '../../../fetch'
jest.mock('../../../fetch')

const BUILD_ID = 12000
const DEFINITION = { name: 'Pipeline Name' }

export const allBuildsPassed = () => {
  (fetch as any)
    .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds?definitions=123&$top=1&api-version=5.1')
    .then.respond(200, {
      value: [ {
        id: BUILD_ID,
        status: BuildStatus.Completed,
        result: BuildResult.Succeeded,
        definition: DEFINITION
      } ]
    });

  (fetch as any)
    .when.get(`https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds/${BUILD_ID}/timeline?api-version=5.1`)
    .then.respond(200, {
      records: [ {
        id: 'id1',
        parentId: null,
        type: 'Stage',
        name: 'Functional Tests',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 'id2',
        parentId: null,
        type: 'Stage',
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      } ]
    })
}

export const withExtraneousStages = () => {
  (fetch as any)
    .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds?definitions=123&$top=1&api-version=5.1')
    .then.respond(200, {
      value: [ {
        id: BUILD_ID,
        status: BuildStatus.Completed,
        result: BuildResult.Succeeded,
        definition: DEFINITION
      } ]
    });

  (fetch as any)
    .when.get(`https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds/${BUILD_ID}/timeline?api-version=5.1`)
    .then.respond(200, {
      records: [ {
        id: 'id1',
        parentId: null,
        type: 'Task',
        name: 'Not a stage',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 3
      }, {
        id: 'id2',
        parentId: null,
        type: 'Stage',
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 'id3',
        parentId: null,
        type: 'Stage',
        name: '__default',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      } ]
    })
}

export const buildIsInProgress = () => {
  (fetch as any)
    .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds?definitions=123&$top=1&api-version=5.1')
    .then.respond(200, {
      value: [ {
        id: BUILD_ID,
        status: BuildStatus.InProgress,
        result: BuildResult.None,
        definition: DEFINITION
      } ]
    });

  (fetch as any)
    .when.get(`https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds/${BUILD_ID}/timeline?api-version=5.1`)
    .then.respond(200, {
      records: [ {
        id: 'id1',
        parentId: null,
        type: 'Stage',
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 'id2',
        parentId: null,
        type: 'Stage',
        name: 'Functional Tests',
        state: TimelineRecordState.InProgress,
        order: 2
      }, {
        id: 'id3',
        parentId: null,
        type: 'Stage',
        name: 'Contract Tests',
        state: TimelineRecordState.Pending,
        order: 3
      } ]
    })
}

export const buildFailed = () => {
  (fetch as any)
    .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds?definitions=123&$top=1&api-version=5.1')
    .then.respond(200, {
      value: [ {
        id: BUILD_ID,
        status: BuildStatus.Completed,
        result: BuildResult.Failed,
        definition: DEFINITION
      } ]
    });

  (fetch as any)
    .when.get(`https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds/${BUILD_ID}/timeline?api-version=5.1`)
    .then.respond(200, {
      records: [ {
        id: 'id1',
        parentId: null,
        type: 'Stage',
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Failed,
        order: 1
      } ]
    })
}
