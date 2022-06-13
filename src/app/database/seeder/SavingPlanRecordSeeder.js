const { faker } = require('@faker-js/faker');
const User = require('../../models/User');
const Saving = require('../../models/Saving');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('saving_records').del();

  const data = [];
  const savings = await Saving.allTest();
  console.log(savings);
  savings.forEach((saving) => {
    data.push({
      user_id: saving.user_id,
      saving_plan_id: saving.id,
      save: JSON.stringify([{
        amount: Math.floor(Math.random() * 1000000) + 1000000,
        date: faker.date.past(),
      },
      {
        amount: Math.floor(Math.random() * 1000000) + 1000000,
        date: faker.date.past(),
      }]),
    });
  });
  console.log(data);
  await knex('saving_records').insert(data);
};
