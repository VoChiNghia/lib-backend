interface Model {
  create(body: object): Promise<any>
}

interface Params {
  fields?: string[]
  object?: object
}

type KeyValuePair<T> = {
  [key: string]: T
}

export { Model, Params, KeyValuePair }
