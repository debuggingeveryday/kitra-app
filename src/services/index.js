import { treasures } from './treasures/treasures.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(treasures)
  app.configure(user)

  // All services will be registered here
}
