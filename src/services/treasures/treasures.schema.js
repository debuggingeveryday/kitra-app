// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax, queryProperty } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const treasuresSchema = {
  $id: 'Treasures',
  type: 'object',
  additionalProperties: false,
  required: ['latitude'],
  properties: {
    latitude: queryProperty({ type: 'string' })
  }
}
export const treasuresValidator = getValidator(treasuresSchema, dataValidator)
export const treasuresResolver = resolve({})
export const treasuresExternalResolver = resolve({})

// Schema for creating new data
export const treasuresDataSchema = {
  $id: 'TreasuresData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...treasuresSchema.properties
  }
}
export const treasuresDataValidator = getValidator(treasuresDataSchema, dataValidator)
export const treasuresDataResolver = resolve({})

// Schema for updating existing data
export const treasuresPatchSchema = {
  $id: 'TreasuresPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...treasuresSchema.properties
  }
}
export const treasuresPatchValidator = getValidator(treasuresPatchSchema, dataValidator)
export const treasuresPatchResolver = resolve({})

// Schema for allowed query properties
export const treasuresQuerySchema = {
  $id: 'TreasuresQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(treasuresSchema.properties),
  }
}

export const treasuresQueryValidator = getValidator(treasuresQuerySchema, queryValidator)

export const treasuresQueryResolver = resolve({
  latitude: async (value, treasures, context) => {
    const { query } = context.params;

    const mysqlClient = context.app.get('mysqlClient');

    console.log(mysqlClient.select('*').from('treasures'));
  }
})
