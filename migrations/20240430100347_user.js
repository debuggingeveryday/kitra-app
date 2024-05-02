import { faker } from '@faker-js/faker'
import { hashPassword } from '../src/common/utils.js'

export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('age')
    table.string('email').unique()
    table.string('password')
  })

  await knex('users').insert([
    {
      name: 'admin',
      age: Math.floor(Math.random() * 100) + 1,
      email: 'admin@system.com',
      password: await hashPassword('1234')
    }
  ])
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
