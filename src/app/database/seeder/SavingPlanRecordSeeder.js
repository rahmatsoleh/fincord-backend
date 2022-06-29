const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
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
    for (let i = 0; i < 5; i++) {
      data.push({
        id: nanoid(),
        saving_plan_id: saving.id,
        save: Math.floor(Math.random() * 1000000) + 1000000,
        date: faker.date.future(),
      });
      setTimeout(() => {}, 100);
    }
  });
  console.log(data);
  await knex('saving_records').insert(data);
};
