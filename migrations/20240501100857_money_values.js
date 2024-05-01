
const treasureIds = [100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117]
const moneyDefaultValues = [];
import { faker } from '@faker-js/faker';

for (let treasureId of treasureIds) {
    moneyDefaultValues.push({
        'treasure_id': treasureId,
        'amount': faker.helpers.arrayElement([10, 20, 30])
    })
}

export async function up(knex) {
    await knex.schema.createTable('money_values', (table) => {
        table.increments('id')
        table.double('amount')
        table.integer('treasure_id').unsigned();
    })

    await knex.schema.alterTable('money_values', function (table) {
        table.foreign('treasure_id').references('id').inTable('treasures');
    });

    await knex('money_values').insert(moneyDefaultValues);
};

export async function down(knex) {
    await knex.schema.dropTable('money_values')
};
