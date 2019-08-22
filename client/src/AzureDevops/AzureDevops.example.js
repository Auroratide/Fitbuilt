import AzureDevops from './AzureDevops.svelte'
import { render, waitForElement, cleanup } from '@testing-library/svelte'
import fetch from 'fetch-mock'

describe('AzureDevops', () => {
  beforeEach(() => {
    fetch.get('/api/services/azure-devops/pipelines/123?url=http://place.visualstudio.com&collection=DefaultCollection&project=MyProject', {
      status: 200,
      body: {
        name: 'Azure',
        status: '',
        stages: []
      }
    })
  })

  it('renders', async () => {
    /* <AzureDevops 
         url="http://place.visualstudio.com"
         collection="DefaultCollection"
         project="MyProject"
         definitionId="123" /> */
    const wrapper = render(AzureDevops, { props: {
      url: 'http://place.visualstudio.com',
      collection: 'DefaultCollection',
      project: 'MyProject',
      definitionId: '123'
    }})

    const title = await waitForElement(() => wrapper.getByText('Azure'))

    expect(title).toBeInTheDocument()
  })

  afterEach(() => {
    fetch.restore()
    cleanup()
  })
})