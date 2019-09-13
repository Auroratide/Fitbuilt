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
        type: 'Task',
        name: 'Functional Tests',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 'id2',
        parentId: null,
        type: 'Task',
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
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 3
      }, {
        id: 'id2',
        parentId: null,
        type: 'Job',
        name: 'Not a Task',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 'id3',
        parentId: null,
        type: 'Task',
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
        type: 'Task',
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 'id2',
        parentId: null,
        type: 'Task',
        name: 'Functional Tests',
        state: TimelineRecordState.InProgress,
        order: 2
      }, {
        id: 'id3',
        parentId: null,
        type: 'Task',
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
        type: 'Task',
        name: 'Build',
        state: TimelineRecordState.Completed,
        result: TaskResult.Failed,
        order: 1
      } ]
    })
}

export const buildWithStages = () => {
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
        id: 'j1-1',
        parentId: 's1',
        type: 'Job',
        name: 'Job 1-1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 't2-1-2',
        parentId: 'j2-1',
        type: 'Task',
        name: 'Task 2-1-2',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 't1-1-1',
        parentId: 'j1-1',
        type: 'Task',
        name: 'Task 1-1-1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 'j1-2',
        parentId: 's1',
        type: 'Job',
        name: 'Job 1-2',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 's1',
        parentId: null,
        type: 'Stage',
        name: 'Stage 1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 'j2-2',
        parentId: 's2',
        type: 'Job',
        name: 'Job 2-2',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 't1-2-1',
        parentId: 'j1-2',
        type: 'Task',
        name: 'Task 1-2-1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 's2',
        parentId: null,
        type: 'Stage',
        name: 'Stage 2',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 'j2-1',
        parentId: 's2',
        type: 'Job',
        name: 'Job 2-1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 't2-2-1',
        parentId: 'j2-2',
        type: 'Task',
        name: 'Task 2-2-1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      }, {
        id: 't1-1-2',
        parentId: 'j1-1',
        type: 'Task',
        name: 'Task 1-1-2',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 2
      }, {
        id: 't2-1-1',
        parentId: 'j2-1',
        type: 'Task',
        name: 'Task 2-1-1',
        state: TimelineRecordState.Completed,
        result: TaskResult.Succeeded,
        order: 1
      } ]
    })
}