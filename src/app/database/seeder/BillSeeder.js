const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
const User = require('../../models/User');

faker.setLocale('id_ID');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('bills').del();

  const users = await User.all();
  const type = ['yearly', 'monthly', 'weekly', 'daily'];
  const status = ['active', 'inactive'];
  const data = [];
  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 20; j += 1) {
      const user = users[i];
      data.push({
        id: nanoid(),
        user_id: user.id,
        name: faker.word.noun(),
        // description: faker.lorem.paragraph(),
        // goal_amount: Math.floor(Math.random() * 1000000) + 1000000,
        // due_date: faker.date.future(),
        // type: type[Math.floor(Math.random() * type.length)],
        // status: status[Math.floor(Math.random() * status.length)],
        payment: faker.finance.amount(),
        date: faker.date.future(),
        reminder: faker.datatype.boolean(),
        status_paid: faker.datatype.boolean(),
      });
    }
  }

  await knex('bills').insert(data);
};
