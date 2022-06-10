const User = require('../../models/User');
const Saving = require('../../models/Saving');
const {faker} = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('saving_records').del();

    const users = await User.all();
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 5; j++) {
            const user = users[i];

            const savings = await Saving.getAllByUserId(user.id);

            const save = [];
            for (let k = 0; k < Math.floor(Math.random() * 10) + 1; k++) {
                save.push({
                    amount: Math.floor(Math.random() * 1000000) + 1000000,
                    date: faker.date.soon(),
                });
            }

            savings.forEach(async (saving) => {
                await knex('saving_records').insert([
                    {
                        user_id: user.id,
                        saving_plan_id: saving.id,
                        save: JSON.stringify(save),
                    }
                ]);
            });
        }
    }
};
