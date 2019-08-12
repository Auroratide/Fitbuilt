import fetch from '../../../fetch'
jest.mock('../../../fetch')

export const allBuildsPassed = () => {
  (fetch as any)
    .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds?definitions=123&$top=1&api-version=5.1')
    .then.respond(200, {
      value: [ {
        id: 12000,
        status: 'completed',
        result: 'succeeded',
        definition: {
          name: 'Pipeline Name'
        }
      } ]
    });

  (fetch as any)
    .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds/12000/timeline?api-version=5.1')
    .then.respond(200, {
      records: [ {
        type: 'Task',
        name: 'Functional Tests',
        state: 'completed',
        result: 'succeeded',
        order: 2
      }, {
        type: 'Task',
        name: 'Build',
        state: 'completed',
        result: 'succeeded',
        order: 1
      } ]
    })
}