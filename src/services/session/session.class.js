// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SessionService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    const { id, name, email } = _params.user
    return {
      id,
      name,
      email
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
