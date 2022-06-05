const User = require('../../models/User');
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('records').del();
    const users = await User.getAllUser();
    for (let i = 0; i < 100; i++) {
        // every user have 10 records
        for (let j = 0; j < 10; j++) {
            const user = users[i];
            const type = Math.random() > 0.5 ? 'income' : 'expense';
            const data = [
                {
                    user_id: user.id,
                    type: type,
                    note: faker.lorem.sentence(),
                    amount: Math.floor(Math.random() * 1000000) + 100000,
                    category: faker.commerce.department(),
                }
            ];
            await knex('records').insert(data);
        }
    }
};
