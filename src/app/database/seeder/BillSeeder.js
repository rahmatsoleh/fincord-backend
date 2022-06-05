const {faker} = require('@faker-js/faker');
const User = require('../../models/User');
faker.setLocale('id_ID');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('bills').del();

    const users = await User.getAllUser();
    const type = ['yearly', 'monthly', 'weekly', 'daily'];
    const status = ['active', 'inactive'];
    for (let i = 0; i < 100; i++) {

        for (let j = 0; j < 20; j++) {
            const user = users[i];

            await knex('bills').insert([
                {
                    user_id: user.id,
                    name: faker.word.noun(),
                    description: faker.lorem.paragraph(),
                    goal_amount: Math.floor(Math.random() * 1000000) + 1000000,
                    due_date: faker.date.future(),
                    type: type[Math.floor(Math.random() * type.length)],
                    status: status[Math.floor(Math.random() * status.length)],
                }
            ]);
        }
    }
};
