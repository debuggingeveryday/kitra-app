import { faker } from '@faker-js/faker'
import { hashPassword } from '../src/common/utils.js' // Importing hashPassword from utils module

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Exporting the seed function directly
  await knex('users').insert([
    {
      name: faker.person.fullName(), // Using fullName directly
      age: Math.floor(Math.random() * 100) + 1,
      email: faker.internet.email(),
      password: await hashPassword('1234') // Using hashPassword function
    }
  ])
}
