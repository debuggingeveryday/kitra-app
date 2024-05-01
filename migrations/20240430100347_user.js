import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('age')
    table.string('email').unique()
    table.string('password')
  })

  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  await knex('users').insert([
    { 
      id: 1,
      name: faker.person.fullName(),
      age: Math.floor(Math.random() * 100) + 1,
      email: 'admin@system.com',
      password: await hashPassword('1234')
    },
  ]);
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
