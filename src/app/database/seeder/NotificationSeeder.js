const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
const NotificationTemp = require('../../models/NotificationTemp');
const { all } = require('../../models/User');
const User = require('../../models/User');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notifications').del();

  const notification_temps = await NotificationTemp.all();
  const users = await User.all();

  const data = [];

  users.forEach((user) => {
    data.push({
      id: nanoid(),
      user_id: user.id,
      name: faker.word.verb(),
      bill: faker.word.noun(),
      tag: faker.random.numeric() % 10,
      dateline: faker.date.future(),
      description: faker.lorem.sentence(),
      // link: faker.lorem.slug(),
      is_reading: faker.datatype.boolean(),
    });
  });

  await knex('notifications').insert(data);
};
