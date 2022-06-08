const nanoid = require('nanoid');
const {faker} = require('@faker-js/faker');
const User = require('../../models/User');
faker.setLocale('id_ID');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('saving_plans').del();

    const users = await User.getAllUser();
    const type = ['yearly', 'monthly', 'weekly', 'daily'];
    const status = ['active', 'inactive'];
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 5; j++) {
            const user = users[i];
            const save = [];
            for (let k = 0; k < Math.floor(Math.random() * 10) + 1; k++) {
                save.push({
                    amount: Math.floor(Math.random() * 1000000) + 1000000,
                    date: faker.date.soon(),
                });
            }

            await knex('saving_plans').insert([
                {
                    user_id: users[i].id,
                    name: faker.word.noun(),
                    description: faker.lorem.paragraph(),
                    goal_amount: Math.floor(Math.random() * 1000000) + 1000000,
                    save: JSON.stringify(save),
                    due_date: faker.date.future(),
                    type: type[Math.floor(Math.random() * type.length)],
                    status: status[Math.floor(Math.random() * status.length)],
                }
            ]);
        }
    }
};
