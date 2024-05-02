// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { SessionService, getOptions } from './session.class.js'

export const sessionPath = 'session'
export const sessionMethods = ['find']

export * from './session.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const session = (app) => {
  // Register our service on the Feathers application
  app.use(sessionPath, new SessionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sessionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sessionPath).hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
