import { logError } from './hooks/log-error.js'

export const appHooks = {
  around: {
    all: [logError]
  },
  before: {},
  after: {}
}
