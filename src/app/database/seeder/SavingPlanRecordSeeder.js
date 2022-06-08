const User = require('../../app/models/User');
const faker = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('saving_records').del();

    const users = await User.getAllUser();
    const type = ['yearly', 'monthly', 'weekly', 'daily'];
    const status = ['active', 'inactive'];
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 5; j++) {
            const user = users[i];
            await knex('bill_records').insert([
                {
                    user_id: users[i].id,
                    name: faker.word.noun(),
                    description: faker.lorem.paragraph(),
                    goal_amount: Math.floor(Math.random() * 1000000) + 1000000,
                    type: type[Math.floor(Math.random() * type.length)],
                    status: status[Math.floor(Math.random() * status.length)],
                }
            ]);
        }
    }
};
