class Response {
  public status: number
  private body?: object

  public constructor(status: number, body?: object) {
    this.status = status
    this.body = body
  }

  public json(): object {
    return this.body
  }
}

class FetchStubs {
  private stubs: { [url: string]: Response } = {}

  public add(url: string, status: number, body?: object) {
    this.stubs[url] = this.buildResponse(status, body)
  }

  public get(url: string): Response {
    const response = this.stubs[url]
    if(!response) {
      return this.buildResponse(500, {
        error: `URL (${url}) is not known by fetch stubber`
      })
    } else {
      return response
    }
  }

  public reset() {
    this.stubs = {}
  }

  private buildResponse(status: number, body?: object): Response {
    return new Response(status, body)
  }
}

class ThenClause {
  private stubs: FetchStubs
  private url: string

  public constructor(fetch: FetchStubs, url: string) {
    this.stubs = fetch
    this.url = url
  }
  
  public respond(status: number, body?: object) {
    this.stubs.add(this.url, status, body)
  }
}

class WhenClause {
  private stubs: FetchStubs

  public constructor(stubs: FetchStubs) {
    this.stubs = stubs
  }

  public get(url: string): { then: ThenClause } {
    return {
      then: new ThenClause(this.stubs, url)
    }
  }
}

// type FetchMock = jest.Mock & {
//   when: WhenClause,
//   stubs: FetchStubs
// }

const fetch: any = jest.fn()
fetch.stubs = new FetchStubs()
fetch.when = new WhenClause(fetch.stubs)

fetch.mockImplementation(async (url: string) => {
  const response = fetch.stubs.get(url)
  if(response.status >= 400) {
    console.error(response) // eslint-disable-line no-console
    throw response
  } else {
    return response
  }
})

export default fetch
