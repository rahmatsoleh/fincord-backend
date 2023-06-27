const { nanoid } = require('nanoid');
const { faker } = require('@faker-js/faker');
const User = require('../../models/User');

faker.setLocale('id_ID');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('saving_plans').del();

  const users = await User.all();
  const type = ['yearly', 'monthly', 'weekly', 'daily'];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 5; j++) {
      const user = users[i];

      await knex('saving_plans').insert([
        {
          id: nanoid(),
          user_id: users[i].id,
          name: faker.word.noun(),
          description: faker.lorem.paragraph(),
          goal_amount: Math.floor(Math.random() * 1000000) + 1000000,
          due_date: faker.date.future(),
          type: type[Math.floor(Math.random() * type.length)],
        },
      ]);
    }
  }
};
