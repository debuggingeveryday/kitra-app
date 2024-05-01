// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks, queryProperty } from '@feathersjs/schema'
import {
  treasuresDataValidator,
  treasuresPatchValidator,
  treasuresQueryValidator,
  treasuresResolver,
  treasuresExternalResolver,
  treasuresDataResolver,
  treasuresPatchResolver,
  treasuresQueryResolver
} from './treasures.schema.js'
import { TreasuresService, getOptions } from './treasures.class.js'

export const treasuresPath = 'treasures'
export const treasuresMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './treasures.class.js'
export * from './treasures.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const treasures = (app) => {
  // Register our service on the Feathers application
  app.use(treasuresPath, new TreasuresService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: treasuresMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(treasuresPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(treasuresExternalResolver),
        schemaHooks.resolveResult(treasuresResolver),
      ],
      find: []
    },
    before: {
      all: [
        schemaHooks.validateQuery(treasuresQueryValidator),
        schemaHooks.resolveQuery(treasuresQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(treasuresDataValidator),
        schemaHooks.resolveData(treasuresDataResolver)
      ],
      patch: [
        schemaHooks.validateData(treasuresPatchValidator),
        schemaHooks.resolveData(treasuresPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
